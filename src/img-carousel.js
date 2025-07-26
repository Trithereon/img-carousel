// Event handling module.

import UI from "./ui";

export default class ImgCarousel {
  constructor(carouselContainer) {
    this.carouselContainer = carouselContainer;
    this.actionHandlers = {
      prev: this.handlePrev,
      next: this.handleNext,
      navDot: this.handleNavDot,
    };
    this.slideArr = this.carouselContainer.querySelectorAll(".slide");
    this.init();
  }
  init = () => {
    document.addEventListener("click", this.handleClick);
    UI.populateDots(this.carouselContainer, this.slideArr);
    UI.identifySlides(this.slideArr);
    UI.displaySlide(this.carouselContainer, this.slideArr, 0);
    setTimeout(this.handleNext, 5000);
  };
  handleClick = (e) => {
    const action = e.target.dataset.action;
    if (action)
      this.actionHandlers[action](e); // Execute the associated function, passing the e onto the next function.
    else return; // If the clicked element has no data-action, then ignore the click.
  };
  handlePrev = () => {
    const currentIndex = parseInt(
      this.carouselContainer.querySelector(".visible").dataset.index,
    );
    if (currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      UI.displaySlide(this.carouselContainer, this.slideArr, nextIndex);
    } else {
      const nextIndex = this.slideArr.length - 1;
      UI.displaySlide(this.carouselContainer, this.slideArr, nextIndex);
    }
  };
  handleNext = () => {
    const currentIndex = parseInt(
      this.carouselContainer.querySelector(".visible").dataset.index,
    );
    if (currentIndex < this.slideArr.length - 1) {
      const nextIndex = currentIndex + 1;
      UI.displaySlide(this.carouselContainer, this.slideArr, nextIndex);
    } else {
      UI.displaySlide(this.carouselContainer, this.slideArr, 0);
    }
    setTimeout(this.handleNext, 5000);
  };
  handleNavDot = (e) => {
    const index = e.target.dataset.index;
    UI.displaySlide(this.carouselContainer, this.slideArr, index);
  };
}
