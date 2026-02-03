// about-specializations-anim.js
// Animates the specialization content/logos in sequence after their titles

document.addEventListener('DOMContentLoaded', function() {
  // Sequence order: title (odd), content/logo (even)
  const sequence = [
    'spec-title-1', 'spec-content-2',
    'spec-title-3', 'spec-content-4',
    'spec-title-5', 'spec-content-6',
    'spec-title-7', 'spec-content-8',
    'spec-title-9', 'spec-content-10',
    'spec-title-11', 'spec-content-12',
    'spec-title-13', 'spec-content-14'
  ];

  // Only fade in content/logos, titles use existing animation
  sequence.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id.startsWith('spec-content')) {
      el.style.opacity = 0;
      el.style.transition = 'opacity 0.8s';
    }
  });

  // Animate in sequence
  let delay = 800; // ms
  sequence.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id.startsWith('spec-content')) {
      setTimeout(() => {
        el.style.opacity = 1;
      }, delay * (i + 1));
    }
  });
});
