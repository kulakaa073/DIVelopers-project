const responseItems = document.querySelectorAll('.response-item');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const maxItemsToShow = 2; // Максимальна кількість відгуків для планшетів
const maxItemsForLargeScreen = 3; // Максимальна кількість відгуків для великих екранів (1280px і більше)

// Function to check if the device is a tablet
function isTablet() {
  const width = window.innerWidth;
  return width >= 768 && width <= 1280;
}

// Function to check if the device is a mobile
function isMobile() {
  const width = window.innerWidth;
  return width < 768; // Менше 768 пікселів — мобільний пристрій
}

// Function to check if the device is a large screen (1280px and above)
function isLargeScreen() {
  const width = window.innerWidth;
  return width >= 1280; // Більше або рівно 1280 пікселів — великий екран
}

// Function to show the specified slide
function showSlide(index) {
  const items = Array.from(responseItems);

  // Визначаємо максимальний індекс залежно від пристрою
  const maxIndex = isTablet()
    ? items.length - maxItemsToShow
    : isLargeScreen()
    ? items.length - maxItemsForLargeScreen
    : items.length - 1;

  // Обмежуємо індекс
  currentSlide = Math.min(index, maxIndex);

  // Визначаємо кількість елементів для показу залежно від пристрою
  const itemsToShow = isTablet()
    ? items.slice(currentSlide, currentSlide + maxItemsToShow) // Для планшетів відображається maxItemsToShow
    : isMobile()
    ? [items[currentSlide]] // На мобільному пристрої показується лише одна картка
    : isLargeScreen()
    ? items.slice(currentSlide, currentSlide + maxItemsForLargeScreen) // Для великих екранів відображається три картки
    : [items[currentSlide]];

  // Оновлюємо відображення карток
  items.forEach(item => {
    item.style.display = itemsToShow.includes(item) ? 'block' : 'none';
  });

  // Оновлюємо стан крапок
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// Initial display of the first slide
showSlide(currentSlide);

// Event listener for dot clicks
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

// Handle window resize
window.addEventListener('resize', () => {
  showSlide(currentSlide);
});
