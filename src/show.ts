import * as Lib from './lib';

export class ShowSrv {
  cellSize: {
    width: number;
    height: number;
  };
  cellCoord: {x: number, y: number}[][];

  constructor (
    public coord: {x: number; y: number},
    public size: {width: number; height: number},
    public qt: {column: number; row: number}
  ) {
    this.init();
  }

  private init(): void {
    this.cellSize = {
      width: Lib.round(this.size.width / this.qt.column, 0),
      height: Lib.round(this.size.height / this.qt.row, 0)
    };
    this.cellCoord = [];
    for (let y = 0; y < this.qt.row; y++) {
      let tmpColumn: {x: number, y: number}[] = [];
      for (let x = 0; x < this.qt.column; x++) {
        let currentCellCoord = {
          x: x * this.cellSize.width,
          y: y * this.cellSize.height
        };
        tmpColumn.push(currentCellCoord);
      }
      this.cellCoord.push(tmpColumn);
    }
    console.log(this.cellCoord);
  }


}