import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Game]
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currendCard: any = '';
  game: Game;

  constructor(game: Game) { 
    this.game = game;
  }

  ngOnInit(): void {
    console.log(this.game)

  }

  newGame() {
  this.game = new Game();
  }

  takeCard() {
    if(!this.pickCardAnimation) {
    this.currendCard = this.game.stack.pop();
    console.log(this.currendCard)
    this.pickCardAnimation = true;
    
  }
  setTimeout(() => {
    this.game.playedCards.push(this.currendCard);
    this.pickCardAnimation = false;
  }, 1000 );
}

}
