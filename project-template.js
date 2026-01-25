/**
 * Project Template JavaScript
 * Handles accordion interactions and slide navigation
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== ACCORDION FUNCTIONALITY ====================
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Get the target section ID from data attribute
      const targetId = this.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Smooth scroll to the contribution detail section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==================== SLIDE NAVIGATION ====================
  const slideContainers = document.querySelectorAll('.contribution-slides-container');
  
  slideContainers.forEach(container => {
    const slides = container.querySelectorAll('.contribution-slide');
    const nextBtns = container.querySelectorAll('.slide-next-btn');
    const totalSlides = slides.length;
    
    nextBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent any parent click handlers
        
        // Find the current active slide in this container
        const currentSlide = container.querySelector('.contribution-slide.active');
        const currentIndex = parseInt(currentSlide.getAttribute('data-slide'));
        
        // Calculate next index (loop back to 1 if at end)
        const nextIndex = currentIndex >= totalSlides ? 1 : currentIndex + 1;
        
        // Hide current slide
        currentSlide.classList.remove('active');
        
        // Show next slide
        const nextSlide = container.querySelector(`.contribution-slide[data-slide="${nextIndex}"]`);
        if (nextSlide) {
          nextSlide.classList.add('active');
        }
      });
    });
  });

  // ==================== KEYBOARD NAVIGATION ====================
  document.addEventListener('keydown', function(e) {
    // Check if user is focused on a contribution section
    const sections = document.querySelectorAll('.contribution-detail-section');
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
      
      if (isInView) {
        const container = section.querySelector('.contribution-slides-container');
        const slides = container.querySelectorAll('.contribution-slide');
        const totalSlides = slides.length;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          // Go to next slide
          const currentSlide = container.querySelector('.contribution-slide.active');
          const currentIndex = parseInt(currentSlide.getAttribute('data-slide'));
          const nextIndex = currentIndex >= totalSlides ? 1 : currentIndex + 1;
          
          currentSlide.classList.remove('active');
          container.querySelector(`.contribution-slide[data-slide="${nextIndex}"]`).classList.add('active');
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          // Go to previous slide
          const currentSlide = container.querySelector('.contribution-slide.active');
          const currentIndex = parseInt(currentSlide.getAttribute('data-slide'));
          const prevIndex = currentIndex <= 1 ? totalSlides : currentIndex - 1;
          
          currentSlide.classList.remove('active');
          container.querySelector(`.contribution-slide[data-slide="${prevIndex}"]`).classList.add('active');
        }
      }
    });
  });

  // ==================== SMOOTH SCROLL OFFSET FOR FIXED HEADER ====================
  // Add offset for any anchor links to account for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
  // Optional: Add fade-in animations as sections come into view
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all contribution detail sections
  document.querySelectorAll('.contribution-detail-section').forEach(section => {
    observer.observe(section);
  });
});

/**
 * Optional: Function to initialize a specific number of slides per contribution
 * Call this if you need to dynamically set up slides
 */
function initializeSlides(containerId, slideCount) {
  const container = document.querySelector(`#${containerId} .contribution-slides-container`);
  if (!container) return;
  
  const slides = container.querySelectorAll('.contribution-slide');
  slides.forEach((slide, index) => {
    const counter = slide.querySelector('.slide-counter');
    if (counter) {
      counter.textContent = `${index + 1}/${slideCount}`;
    }
  });
}
