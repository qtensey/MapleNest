window.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-theme');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-theme');
      const isDark = document.documentElement.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
});
