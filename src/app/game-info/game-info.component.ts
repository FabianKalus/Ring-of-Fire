import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent implements OnInit, OnChanges {
@Input() cardAction = [
  { title: 'Rule', description: 'Invent a rule. Everyone needs to drink when he / she breaks the rule.' },
  { title: 'Two for you', description: 'Choose someone who drinks two sips.' },
  { title: 'Three for me', description: 'You drink three sips.' },
  { title: 'Four on the floor', description: 'Put your hands on the desk. The last player drinks!' },
  { title: 'Five bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one.' },
  { title: 'Six for chicks', description: 'All girls drink.' },
  { title: 'Seven to heaven', description: 'Put your hands up. The last player drinks!' },
  { title: 'Eight have a date', description: 'Choose someone and take a sip with him / her' },
  { title: 'Nine make a rhyme', description: 'Start a rhyme. The last who can´t continue drinks.' },
  { title: 'Ten what you never do again', description: 'Relate something you did. If anyone did this too, the one drinks.' },
  { title: 'Drinkmate', description: 'Choose someone. Until the next drinkmate card you both share every sip.' },
  { title: 'Questionmaster', description: 'If anyone answers a question from the questionmaster, he / she drinks.' },
  { title: 'King´s cup', description: 'Fill an empty glas with a drink from the table. The last king drinks the glas.' },
];


title: string = '';
description = '';
@Input() public card: string | any = '';


  constructor() { }

  ngOnInit(): void {
 
  }

  ngOnChanges(): void {
    if(this.card) {
    let cardNumber = +this.card.split('_')[1];
    this.title = this.cardAction[cardNumber - 1].title;
    this.description = this.cardAction[cardNumber - 1].description;
    }
  }

}
