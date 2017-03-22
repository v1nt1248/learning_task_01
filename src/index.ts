import * as Lib from './lib';
import { Button } from './button';
import { Board } from './board';
import { Sound } from './sound';

(function() {
  const processSound = new Sound('media/Reel_Spin.mp3');
  const stopSound = new Sound('media/Landing_1.mp3');

  const main = document.querySelector('.place');
  const refreshBtn = document.querySelector('#refresh');
  const but = new Button('button');
  const board = new Board(5, 4, main);

  refreshBtn.addEventListener('click', () => {
    board.refresh();
  });

  but.clickHandler = () => {
    but.setDisable();
    refreshBtn.setAttribute('disabled', 'disabled');
    (refreshBtn as HTMLButtonElement).style.cursor = 'not-allowed';
    processSound.play();

    const count = Lib.randomInt(5, 20);
    console.info(`Кол-во символов прокрутки: ${count}`);

    board.run(count)
      .then(res => {
        processSound.stop();
        setTimeout(() => {
          stopSound.play();
          but.removeDisable();
          refreshBtn.removeAttribute('disabled');
          (refreshBtn as HTMLButtonElement).style.cursor = 'pointer';
        }, 50);
      });
  };
  
})();