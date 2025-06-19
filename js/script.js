document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-left, .animate-right, .animate-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // remet invisible si tu sors du viewport
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const items = document.querySelectorAll(".service-item");
  const totalItems = items.length;

  let currentIndex = 0;

  // Largeur d'une carte
  let itemWidth = items[0].clientWidth;

  function updateCarousel() {
    const translateX = -currentIndex * itemWidth;
    track.style.transform = `translateX(${translateX}px)`;
    track.style.transition = "transform 0.5s ease-in-out";
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= totalItems) {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalItems - 1;
    }
    updateCarousel();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  // Défilement automatique toutes les 5 secondes
  let autoSlideInterval = setInterval(nextSlide, 5000);

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  // Ajuste la largeur à la redimension de la fenêtre
  window.addEventListener("resize", () => {
    itemWidth = items[0].clientWidth;
    updateCarousel();
  });

  // Initialisation
  updateCarousel();
});
