import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, doc, updateDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})

export class GameComponent implements OnInit {

  displayStyle = "none";
  
  game!: Game;
  noCardLeft: boolean = false;
  gameId!: string;
  game$!: Observable<any>;
 
  icons = ['src/assets/img/tiger.png', 'src/assests/img/monkey.png'];


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {  }


  ngOnInit(): void {
    this.newGame();
    this.loadGame();
  }

  newGame() {
    this.game = new Game();
    this.loadGame();
  }

  

  // takeCard() {
  //   if(this.game.players.length > 0) {
  //     if (!this.pickCardAnimation) {
  //       this.currentCard = this.game.stack.pop();
  //       this.pickCardAnimation = true;
        
  //     }
  //     this.game.currentPlayer++;
  //     this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  //     setTimeout(() => {
  //       this.game.playedCards.push(this.currentCard);
  //       console.log(this.game.playedCards);
  //       this.pickCardAnimation = false;
  //     }, 1000);
  //   } else {
  //     this.displayStyle = "block";
     
  //   }

  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((newPlayer: any) => {
      if (newPlayer && newPlayer.name.length > 0) {
        this.game.players.push(newPlayer.name);
        this.game.imageResults.push(newPlayer.imageResult);
        console.log(newPlayer.imageResult)
        this.saveGame();
      }
    });
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
        // this.game.visibleStack = game['visibleStack'];
        // this.game.stackCount = game['stackCount'];
        // this.game.cardTurn = game['cardTurn'];
      })
    });
  }

  saveGame() {
    const docRef: any = doc(this.firestore, 'games', this.gameId);
    updateDoc(docRef, this.game.toJson());
  }


  takeCard() {
    if(this.game.players.length > 0) {
    if (!this.game.pickCardAnimation && this.game.players.length > 0) {
      this.game.currentCard = this.game.stack.pop();
      this.saveGame();
      this.playAnimation();
      this.turnPlayedCard();
    }
    } else {
    this.displayStyle = "block";
     }
  }



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


  turnPlayedCard() {
    setTimeout(() => {
      this.game.cardTurn++
      this.game.cardTurn = this.game.cardTurn % 3;
      this.saveGame();
    }, 1000);
    
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogAddPlayerComponent
  //   , {   data: {name: this.playerData.name, icon: this.playerData.icon}}
  //   );

  //   dialogRef.afterClosed().subscribe(data => {
  //     if (data  > 0) {
  //       this.game.players.push(data.name);
  //       this.game.playersIcon.push(data.icon);
  //       this.saveGame();
  //     }
  //   });
  // }

}
