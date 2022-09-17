import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent{
  constructor(private router: Router, private firestore: Firestore,) {
   }
  
  newGame() {
    let game = new Game();
    const coll = collection(this.firestore, 'games');
    addDoc(coll, game.toJson()).then(gameInfo => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });    
  }
}
