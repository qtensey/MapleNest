const buttons = document.querySelectorAll('.btn');
const items = document.querySelectorAll('.service-details__item');
const allImages = document.querySelectorAll('.service-details img');

function showSection(section) {
  // Изображения
  allImages.forEach(img => {
    if (img.id === `${section}-img`) {
      img.style.display = 'block';
      img.classList.add('fade-in');
    } else {
      img.classList.remove('fade-in');
      img.style.display = 'none';
    }
  });

  // Контент
  items.forEach(item => {
    if (item.dataset.section === section) {
      item.style.display = 'block';
      item.classList.add('fade-in');
    } else {
      item.classList.remove('fade-in');
      item.style.display = 'none';
    }
  });

  // Кнопки
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === section);
  });
}

// Запуск
if (buttons.length > 0) {
  showSection(buttons[0].dataset.section);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    showSection(button.dataset.section);
  });
});
