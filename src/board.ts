export class Board {
  private cardsMap: number[][];

  constructor (
    public qt: number
   ) {
    this.cardsMap = []; 
    this.init();
  }

  private init(): void {
    for (let x = 0; x < this.qt; x++) {
      let qtN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let tmpColumn = [];
      while (tmpColumn.length < 30) {
        const tmp = this.randomInt(1, 10);
        if (qtN[tmp - 1] < 3) {
          tmpColumn.push(tmp);
          qtN[tmp - 1] += 1;
        }
      }
      this.cardsMap.push(tmpColumn);
    }
  }

  private randomInt(min: number, max: number): number {
    let rnd = min + Math.random()* (max + 1 - min);
    rnd = Math.floor(rnd);
    return rnd;
  }

  public getCards(): number[][] {
    return this.cardsMap;
  }


  public showingData(row: number): number[][] {
    let result: number[][] = [];
    for (let i = 0; i < this.qt; i++) {
      let tmp = this.cardsMap[i].slice(0, row);
      result.push(tmp);
    }
    return result;
  }


}