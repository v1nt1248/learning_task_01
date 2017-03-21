import { Button } from './button';
import { Board } from './board';
import { ShowSrv } from './show';

(function() {
  const cardsPath = './media/';

  const main = document.querySelector('.place');
  const mainCoord = {
    x: main.clientLeft,
    y: main.clientTop,
    width: main.clientWidth,
    height: main.clientHeight
  };

  // const app = new PIXI.Application(1050, 560, {backgroundColor: 0xFFECB3});
  // main.appendChild(app.view);
  
  const but = new Button('button');
  const board = new Board(5);
  console.log(JSON.stringify(board.getCards()));
  console.log(JSON.stringify(board.showingData(4), null, 2));

  // but.clickHandler = () => {
  //   console.log('click');
  // }

  const show = new ShowSrv(
    main,
    {x: mainCoord.x, y: mainCoord.y},
    {width: mainCoord.width, height: mainCoord.height},
    {column: 5, row: 4}
  );

  show.showData(board.showingData(4));

  

  
})();