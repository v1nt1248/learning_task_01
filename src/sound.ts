export class Sound {
  private context: AudioContext;
  private buffer: AudioBuffer;
  private source: AudioBufferSourceNode;
  private destination: AudioDestinationNode;

  constructor (
    public pathFile: string
  ) {
    this.init();
  }
  
  private init(): void {
    this.context = new AudioContext();
    this.loadSoundFile();
  }

  private loadSoundFile(): void {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.pathFile, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = (ev) => {
      let res = xhr.response;
      this.context.decodeAudioData(res, (decodedArrayBuffer) => {
        this.buffer = decodedArrayBuffer;
      }, (err) => { console.error(err); });
    }
    xhr.send();
  }

  public play(): void {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.destination = this.context.destination;
    this.source.connect(this.destination);
    this.source.start(0);
  }

  public stop(): void {
    this.source.stop(0);
  }

}