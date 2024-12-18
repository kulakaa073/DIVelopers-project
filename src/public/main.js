const responseItems = document.querySelectorAll('.response-item');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const maxItemsToShow = 2; // Кількість карток для планшетів (768-1280px)
const maxItemsForLargeScreen = 3; // Кількість карток для великих екранів (1280px і більше)

// Функція визначення пристрою
function isMobile() {
  const width = window.innerWidth;
  return width < 768; // Менше 768 пікселів — мобільний пристрій
}

function isTabletOrDesktop() {
  const width = window.innerWidth;
  return width >= 768 && width < 1280; // Від 768 до 1280 пікселів — планшет або середній екран
}

function isLargeScreen() {
  const width = window.innerWidth;
  return width >= 1280; // 1280 пікселів і більше — великий екран
}

// Функція відображення слайду
function showSlide(index) {
  const items = Array.from(responseItems);

  // Визначення кількості карток для показу
  const itemsToShow = isMobile()
    ? 1 // Для мобільних — 1 картка
    : isLargeScreen()
    ? maxItemsForLargeScreen // Для великих екранів — 3 картки
    : maxItemsToShow; // Для планшетів і середніх екранів — 2 картки

  // Визначення максимального індексу
  const maxIndex = items.length - itemsToShow;
  currentSlide = Math.min(index, maxIndex);

  // Відображення відповідних карток
  items.forEach((item, i) => {
    item.style.display =
      i >= currentSlide && i < currentSlide + itemsToShow ? 'block' : 'none';
  });

  // Оновлення активного стану крапок
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// Початковий показ слайду
showSlide(currentSlide);

// Обробник кліків на крапках
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

// Обробник зміни розміру вікна
window.addEventListener('resize', () => {
  showSlide(currentSlide);
});
