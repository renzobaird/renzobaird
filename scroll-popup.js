// Hide the scroll popup when the user scrolls
window.addEventListener('scroll', function() {
  const popup = document.getElementById('scroll-popup');
  if (popup && !popup.classList.contains('hide')) {
    popup.classList.add('hide');
  }
});
