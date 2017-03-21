export class Sound {

  constructor (
    public file: string
  ) {
    this.init();
  }
  
  private init(): void {
    soundjs.Sound.registerSound({src: this.file}, 'sound', {}, true);
  }

  public play(): void {
    soundjs.Sound.play('sound');
  }

  public stop(): void {
    soundjs.Sound.stop();
  }

}