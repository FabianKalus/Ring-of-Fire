import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';

import { Title } from '@angular/platform-browser';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Game]
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: any = '';
  game: Game;
  gameinfo;
  displayStyle = "none";
  


  constructor(game: Game, public dialog: MatDialog, gameinfo: GameInfoComponent) {
    this.game = game;
    this.gameinfo = gameinfo;
  }

  ngOnInit(): void {
    console.log(this.currentCard)

  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(this.game.players.length > 0) {
      if (!this.pickCardAnimation) {
        this.currentCard = this.game.stack.pop();
        this.pickCardAnimation = true;
        
      }
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    } else {
      this.displayStyle = "block";
     
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result.length > 0) {
        this.game.players.push(result);
      }
    });
  }

  
  closePopup() {
    this.displayStyle = "none";
  }

}
