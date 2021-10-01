export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper)
    this.slide = document.querySelector(slide)
    this.dist = { finalPosition: 0, firstPositionX: 0, movement:0 }
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.firstPositionX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    event.preventDefault()
    this.dist.firstPositionX = event.clientX; // ClientX objeto do event
    this.wrapper.addEventListener('mousemove',this.onMove)
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onLeave(event) {
    this.wrapper.removeEventListener('mousemove',this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  addEvents() {
    this.slide.addEventListener('mousedown', this.onStart);
    this.slide.addEventListener('mouseup', this.onLeave);
  }

  init() {
    console.log(this.dist)
    this.bindEvents()
    this.addEvents();
    return this;
  }
}