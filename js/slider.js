// slider.js - Velora Luxury Hotel Slider Script
document.addEventListener("DOMContentLoaded", function() {
  const carouselEl = document.querySelector(".carousel");
  if (carouselEl && typeof bootstrap !== "undefined" && bootstrap.Carousel) {
    new bootstrap.Carousel(carouselEl, { interval: 5000, touch: true });
  }
});
