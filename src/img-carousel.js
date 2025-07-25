// Event handling module.

export default class ImgCarousel {
  constructor(carouselContainer) {
    this.carouselContainer = carouselContainer;
    this.init();
    this.actionHandlers = {
      prev: this.handlePrev,
      next: this.handleNext,
    };
  }
  init = () => {
    document.addEventListener("click", this.handleClick);
  };
  handleClick = (e) => {
    const action = e.target.dataset.action;
    // Execute the associated function, passing the e onto the next function.
    if (action) this.actionHandlers[action](e);
    // If the clicked element has no data-action, then ignore the click.
    else return;
  };
  handlePrev = (e) => {
    console.log("User Clicked Previous button");
  };
  handleNext = (e) => {
    console.log("User Clicked Next button");
  };
}
