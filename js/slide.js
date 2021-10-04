export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper)
    this.slide = document.querySelector(slide)
    this.dist = { finalPosition: 0, firstPositionX: 0, movement:0 }
  }

  // Efeito de mudança suave

  // Slide config
  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidePosition(element) {
    const margin = (this.wrapper.offsetWidth - element.offsetWidth) / 2;
    return -(element.offsetLeft - margin); // precisa ser negativo
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    }
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }

  init() {
    this.bindEvents();
    this.addEvents();
    this.slidesConfig();
    return this;
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  addEvents() {
    this.slide.addEventListener('mousedown', this.onStart);
    this.slide.addEventListener('touchstart', this.onStart);
    this.slide.addEventListener('mouseup', this.onLeave);
    this.slide.addEventListener('touchend', this.onLeave);
  }

  onStart(event) {
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault()
      this.dist.firstPositionX = event.clientX; // ClientX pega a posição X
      movetype = 'mousemove'
    } else {
      this.dist.firstPositionX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }
    this.wrapper.addEventListener(movetype,this.onMove)
  }

  onLeave(event) {
    const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype,this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX // se for mousemove, evento de mouse, se não, evento de touch
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  updatePosition(pointerPosition) {
    this.dist.movement = (this.dist.firstPositionX - pointerPosition) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  moveSlide(finalPosition) {
    this.dist.movePosition = finalPosition;
    this.slide.style.transform = `translate3d(${finalPosition}px, 0, 0)`;
  }

}