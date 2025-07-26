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
    this.timeoutId = null; // To track the timeout
    this.init();
  }
  init = () => {
    document.addEventListener("click", this.handleClick);
    UI.populateDots(this.carouselContainer, this.slideArr);
    UI.identifySlides(this.slideArr);
    UI.displaySlide(this.carouselContainer, this.slideArr, 0);
    this.startAutoPlay();
  };
  handleClick = (e) => {
    const action = e.target.dataset.action;
    if (action) {
      this.stopAutoPlay();
      this.actionHandlers[action](e);
    } // Execute the associated function, passing the e onto the next function.
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
  };
  handleNavDot = (e) => {
    const index = e.target.dataset.index;
    UI.displaySlide(this.carouselContainer, this.slideArr, index);
  };
  startAutoPlay = () => {
    this.stopAutoPlay();
    this.timeoutId = setTimeout(() => {
      this.handleNext();
      this.startAutoPlay();
    }, 5000);
  };
  stopAutoPlay = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  };
}
