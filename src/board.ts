import * as Lib from './lib';
import { ShowSrv } from './show';

export class Board {
  private cardsMap: number[][];
  private placeCoord: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  private show: ShowSrv;


  constructor (
    public column: number,
    public row: number,
    public place: Element
   ) {
    this.init();
    this.placeCoord = {
      x: this.place.clientLeft,
      y: this.place.clientTop,
      width: this.place.clientWidth,
      height: this.place.clientHeight
    };
    this.show = new ShowSrv(
      this.place,
      {x: this.placeCoord.x, y: this.placeCoord.y},
      {width: this.placeCoord.width, height: this.placeCoord.height},
      {column: this.column, row: this.row}
    );
    this.animate();
  }

  private init(): void {
    this.cardsMap = [];
    for (let x = 0; x < this.column; x++) {
      let qtN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let tmpColumn = [];
      while (tmpColumn.length < 30) {
        const tmp = Lib.randomInt(1, 10);
        if (qtN[tmp - 1] < 3) {
          tmpColumn.push(tmp);
          qtN[tmp - 1] += 1;
        }
      }
      this.cardsMap.push(tmpColumn);
    }
    // console.log(this.cardsMap);
  }


  private showingData(): number[][] {
    let result: number[][] = [];
    for (let i = 0; i < this.column; i++) {
      let tmp = this.cardsMap[i].slice(0, this.row);
      result.push(tmp);
    }
    return result;
  }


  private tick(column: number): void {
    if (column <= this.column) {
      let first = this.cardsMap[column - 1].shift();
      this.cardsMap[column - 1].push(first);
    }
  }

  private animate(): void {
    this.show.showData(this.showingData());
  }

  public refresh(): void {
    this.init();
    this.animate();
  }

  public run(qt: number): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {

      let count = 0;

      let timer = setInterval(() => {
        let from = Math.floor(count / qt) + 1;
        for (let i = from; i <= this.column; i++) {
          this.tick(i);
        }
        this.animate();
  
        count += 1;
        if (count >= (qt * this.column)) {
          clearInterval(timer);
          resolve(true);
        }
      }, 40);

    });

    return promise.then(res => {
      return true;
    })


    // let count = 0;

    // let timer = setInterval(() => {
    //   let from = Math.floor(count / qt) + 1;
    //   for (let i = from; i <= this.column; i++) {
    //     this.tick(i);
    //   }
    //   this.animate();

    //   count += 1;
    //   if (count >= (qt * this.column)) {
    //     clearInterval(timer);
    //     return;
    //   }
    // }, 60);



  }
    
  


}