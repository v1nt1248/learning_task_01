import * as Lib from './lib';
import { Button } from './button';
import { Board } from './board';
// import { ShowSrv } from './show';

(function() {

  const main = document.querySelector('.place');
  const refreshBtn = document.querySelector('#refresh');
  const but = new Button('button');
  const board = new Board(5, 4, main);

  refreshBtn.addEventListener('click', () => {
    board.refresh();
  });

  but.clickHandler = () => {
    board.run(2);
  }


  
})();