import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, doc, updateDoc, docData, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})

export class GameComponent implements OnInit {

  displayStyle = "none";  
  game: Game;
  noCardLeft: boolean = false;
  gameId: string;
  game$: Observable<any>;
  gameOver = false;



  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog, 
    private router: Router,) {  }


  ngOnInit(): void {
    this.newGame();
    this.loadGame();
  }

  newGame() {
    this.game = new Game();
    this.loadGame();
  }

  // adding new Player
  openDialog(): void {
    if(this.game.players.length > 7) {
     alert('You can´t add another player. The maximum is 8 players!');
     close(); 
    }
    else{const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((newPlayer: any) => {
      if (newPlayer && newPlayer.name.length > 0) {
        this.game.players.push(newPlayer.name);
        this.game.imageResults.push(newPlayer.imageResult);
        this.saveGame();
      }
    });
    }
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  loadGame() {
    this.route.params.subscribe(async param => {
      this.gameId = param['id'];
      const docRef = doc(this.firestore, 'games', this.gameId);
      this.game$ = docData(docRef);
      this.game$.subscribe(game => {
        this.game.players = game['players'];
        this.game.imageResults = game['imageResults'];
        this.game.stack = game['stack'];
        this.game.playedCards = game['playedCards'];
        this.game.currentPlayer = game['currentPlayer'];
        this.game.pickCardAnimation = game['pickCardAnimation'];
        this.game.currentCard = game['currentCard'];
      })
    });
  }

  saveGame() {
    const docRef: any = doc(this.firestore, 'games', this.gameId);
    updateDoc(docRef, this.game.toJson());
  }

  // take card from the stack
  takeCard() {
    if(this.game.stack.length == 0) {
      this.gameOver = true;
    } else if(this.game.players.length > 0) {
    if (!this.game.pickCardAnimation && this.game.players.length > 0) {
      this.game.currentCard = this.game.stack.pop();
      this.saveGame();
      this.playAnimation();
    }
    } else {
    this.displayStyle = "block";
     }
  }

  // card draw animation
  playAnimation() {
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      let currentCard: string = this.game.currentCard ?? '';
      this.game.playedCards.push(currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1000);
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if(change){
        if(change == 'DELETE') {
          this.game.imageResults.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
          this.saveGame();
        } else {
      this.game.imageResults[playerId] = 'assets/img/' + change;
      this.saveGame();}}
    });
  }
 
  newGameAfterOver() {
    let game = new Game();
    const coll = collection(this.firestore, 'games');
    addDoc(coll, game.toJson()).then(gameInfo => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });    
    this.gameOver = false;
  }
}
