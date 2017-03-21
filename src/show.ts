import * as Lib from './lib';

export class ShowSrv {
  cellSize: {
    width: number;
    height: number;
  };
  cellCoord: {x: number, y: number}[][];

  constructor (
    public parentElem: Element,
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
    for (let x = 0; x < this.qt.column; x++) {
      let tmpColumn: {x: number, y: number}[] = [];
      for (let y = 0; y < this.qt.row; y++) {
        let currentCellCoord = {
          x: x * this.cellSize.width,
          y: this.size.height - (y + 1) * this.cellSize.height
        };
        tmpColumn.push(currentCellCoord);
      }
      this.cellCoord.push(tmpColumn);
    }
    // console.log(this.cellCoord);
  }

  public showData(data: number[][]): void | boolean {
    if (data.length !== this.qt.column) {
      console.error(`Количество строк в передаваемых для отображения данных (${data.length}), превышает количество строк при инициализации класса Show (${this.qt.row})`);
      return false;
    }

    if (data[0].length !== this.qt.row) {
      console.error(`Количество столбцов в передаваемых для отображения данных (${data[0].length}), превышает количество столбцов при инициализации класса Show (${this.qt.column})`);
      return false;
    }

    this.cleanElement(this.parentElem);
    for (let x = 0; x < this.qt.column; x++) {
      for (let y = 0; y < this.qt.row; y++) {
        let cellElem = document.createElement('div');
        cellElem.style.position = 'absolute';
        cellElem.style.width = `${this.cellSize.width}px`;
        cellElem.style.height = `${this.cellSize.height}px`;
        // cellElem.style.border = '1px solid rgba(0, 0, 0, 0.12)';
        cellElem.style.top = `${this.cellCoord[x][y].y}px`;
        cellElem.style.left = `${this.cellCoord[x][y].x}px`;
        let path = `media/${(data[x][y] < 10) ? '0' + data[x][y] : data[x][y]}.png`;
        cellElem.style.backgroundPosition = '50% 50%';
        cellElem.style.backgroundRepeat = 'no-repeat';
        cellElem.style.backgroundSize = 'contain';
        cellElem.style.backgroundImage = `url(${path})`;
        this.parentElem.appendChild(cellElem);
      }
    }
  }

  /**
   * очистка "родителя" от все дочерних элементов
   * @param elem {Element}
   */
  private cleanElement(elem: Element): void {
    while (elem.childNodes[0]) {
      elem.removeChild(elem.childNodes[0]);
    }
  }


}