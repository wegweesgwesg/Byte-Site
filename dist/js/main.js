"use strict";

const slides = [
  {
    img: "images/slider1.jpg",
    title: "Настройка под вас",
    text: "Каждый ПК тестируется индивидуально — от BIOS до финального включения."
  },
  {
    img: "images/slider2.jpg",
    title: "Гарантия и поддержка",
    text: "Два года бесплатного обслуживания."
  }
];

const slider = document.getElementById("slider");
const inner = document.getElementById("sliderInner");
const dotsContainer = document.getElementById("sliderDots");

let current = 0;
let startX = 0;
let isDragging = false;
let autoTimer = null;


function initSlider() {
  slides.forEach((slide, i) => {

    const s = document.createElement("div");
    s.classList.add("main_slide");
    s.style.background = 
    `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), 
    url(${slide.img}) center/cover no-repeat`;
    s.innerHTML = `
      <div class="main_slider_header">${slide.title}</div>
      <div class="main_slider_text">${slide.text}</div>
    `;
    inner.appendChild(s);


    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });
  update();
  startAuto();
}


function update() {
  inner.style.transform = `translateX(-${current * 100}%)`;
  dotsContainer.querySelectorAll(".dot").forEach((dot, i) =>
    dot.classList.toggle("active", i === current)
  );
}


function goTo(i) {
  current = i;
  resetAuto();
  update();
}


slider.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.clientX;
  slider.style.cursor = "grabbing";
  resetAuto();
});
window.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const diff = e.clientX - startX;

  if (diff > 50 && current > 0) {
    goTo(current - 1);
    isDragging = false;
  } else if (diff < -50 && current < slides.length - 1) {
    goTo(current + 1);
    isDragging = false;
  }
});
window.addEventListener("mouseup", () => {
  isDragging = false;
  slider.style.cursor = "grab";
  startAuto();
});


function startAuto() {
  autoTimer = setInterval(() => {
    current = (current + 1) % slides.length;
    update();
  }, 15000);
}
function resetAuto() {
  clearInterval(autoTimer);
}

// Запускаем
initSlider();
