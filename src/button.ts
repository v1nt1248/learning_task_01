export class Button {
  private mode: {[name: string]: string};
  private elem: HTMLButtonElement;
  private clickHandlerFunc: EventListener;
  private isDisable: boolean;

  constructor (
    public id: string
  ) {
    this.mode = {
      normal: './media/btn_spin_normal.png',
      hover: './media/btn_spin_hover.png',
      disable: './media/btn_spin_disable.png',
      press: './media/btn_spin_pressed.png'
    };
    this.elem = <HTMLButtonElement>document.querySelector(`#${id}`);
    this.isDisable = false;
    this.init();
    
    this.elem.addEventListener('mouseover', this.hoverHandler.bind(this));
    this.elem.addEventListener('mouseout', this.noHoverHandler.bind(this));
    this.elem.addEventListener('click', this.changePressedFace.bind(this));
  } 

  public setDisable(): void {
    this.isDisable = true;
    this.elem.style.backgroundImage = `url(${this.mode.disable})`;
  }

  public removeDisable(): void {
    this.isDisable = false;
    this.elem.style.backgroundImage = `url(${this.mode.normal})`;
  }

  public set clickHandler(listener: EventListener) {
    if (!!this.clickHandlerFunc) {
      this.elem.removeEventListener('click', this.clickHandlerFunc);
    } 
    this.clickHandlerFunc = listener;
    this.elem.addEventListener('click', this.clickHandlerFunc);
  }

  private init(): void {
    this.elem.style.width = '80px';
    this.elem.style.height = '80px';
    this.elem.style.border = 'none';
    this.elem.style.borderRadius = '50%';
    this.elem.style.outlineWidth = '0';
    this.elem.style.cursor = 'pointer';
    this.elem.style.backgroundPosition = '50% 50%';
    this.elem.style.backgroundRepeat = 'no-repeat';
    this.elem.style.backgroundImage = `url(${this.mode.normal})`;
  }

  private changePressedFace(event: MouseEvent): void {
    this.elem.style.backgroundImage = `url(${this.mode.press})`;
  }

  private hoverHandler(event: MouseEvent): void {
    if (!this.isDisable) {
      this.elem.style.backgroundImage = `url(${this.mode.hover})`;
    }
  }

  private noHoverHandler(event: MouseEvent): void {
    this.elem.style.backgroundImage = this.isDisable ? `url(${this.mode.disable})` : `url(${this.mode.normal})`;
  }

}