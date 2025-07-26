// UI module for DOM manipulation

export default class UI {
  static populateDots(carouselContainer, slideArray) {
    slideArray.forEach((slide, index) => {
      const dot = document.createElement("button");
      const dotContainer =
        carouselContainer.querySelector(".nav-dot-container");
      dot.className = "nav-dot";
      dot.dataset.action = "navDot";
      dot.dataset.index = index;
      dotContainer.appendChild(dot);
    });
  }

  static identifySlides(slideArray) {
    slideArray.forEach((slide, index) => {
      slide.dataset.index = index;
    });
  }

  static displaySlide(carouselContainer, slideArray, index) {
    // Hide currently displayed slide.
    slideArray.forEach((slide) => {
      if (slide.classList.contains("visible"))
        slide.classList.remove("visible");
    });
    // Display selected slide.
    slideArray[index].classList.add("visible");
    // Darken corresponding nav dot.
    UI._darkenDot(carouselContainer, index);
  }

  static _darkenDot(carouselContainer, index) {
    const dot = carouselContainer.querySelector(
      `[data-action="navDot"][data-index="${index}"`,
    );
    const dotsArr = carouselContainer.querySelectorAll(".nav-dot");
    dotsArr.forEach((dot) => {
      if (dot.classList.contains("selected")) dot.classList.remove("selected");
    });
    dot.classList.add("selected");
  }
}
