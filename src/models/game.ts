export class Game {
    public players: string[] = [];
    public imageResults: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation: boolean = false;
    public currentCard: string | undefined = '';
    public randomCardTurn: number[] = [];
 
constructor() {
    for(let i = 1; i < 14; i++) {
        this.stack.push('ace_' + i);
        this.stack.push('clubs_' + i);
        this.stack.push('diamonds_' + i);
        this.stack.push('hearts_' + i);
    }
    this.shuffle(this.stack)

    for(let r = 0; r < 52; r++){
        this.randomCardTurn.push( Math.floor(Math.random() * 360));
    }
}

public toJson() {
    return {
      players: this.players,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,

      imageResults: this.imageResults,
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard,
    };
  }

shuffle(array: string[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

}