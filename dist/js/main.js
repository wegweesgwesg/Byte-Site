"use strict";

const slides = [
  {
    img: "images/slider1.jpg",
    title: "Собираем компы",
    text: "О да мы собираем компы твоей мечты, ты таких во сне даже не увидишь никогда..."
  },
  {
    img: "images/slider1.jpg",
    title: "Настройка под вас",
    text: "Каждый ПК тестируется индивидуально — от BIOS до финального включения."
  },
  {
    img: "images/slider1.jpg",
    title: "Гарантия и поддержка",
    text: "Два года бесплатного обслуживания и офис в вашем городе."
  }
];

const slider = document.getElementById("slider");
const inner = document.getElementById("sliderInner");
const dotsContainer = document.getElementById("sliderDots");

let current = 0;
let startX = 0;
let isDragging = false;
let autoTimer = null;

// 1. Генерируем слайды и точки
function initSlider() {
  slides.forEach((slide, i) => {
    // слайд
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

    // точка
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });
  update();
  startAuto();
}

// 2. Переключение
function update() {
  inner.style.transform = `translateX(-${current * 100}%)`;
  dotsContainer.querySelectorAll(".dot").forEach((dot, i) =>
    dot.classList.toggle("active", i === current)
  );
}

// 3. Перейти на слайд i
function goTo(i) {
  current = i;
  resetAuto();
  update();
}

// 4. Перетаскивание
slider.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.clientX;
  slider.style.cursor = "grabbing";
  resetAuto();
});
window.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  // если перетащили вправо/влево на 50px
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

// 5. Автопрокрутка
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
