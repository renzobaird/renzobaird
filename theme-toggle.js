// Theme Toggle Functionality
(function() {
  // Get saved theme from localStorage or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply saved theme immediately to prevent flash
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }
  });
})();
