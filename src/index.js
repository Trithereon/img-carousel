import "./styles.css";
import ImgCarousel from "./img-carousel";

document.querySelectorAll(".img-carousel").forEach((carouselContainer) => {
  new ImgCarousel(carouselContainer);
});
