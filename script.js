// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  
  const icon = document.querySelector('.dark-mode-toggle i');
  if (document.body.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  const icon = document.querySelector('.dark-mode-toggle i');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

// Mobile Menu Toggle
function toggleMenu() {
  document.querySelector('.nav-menu').classList.toggle('active');
  const icon = document.querySelector('.nav-toggle i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu li a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  });
});

// Form Submission
function sendMessage(event) {
  event.preventDefault();
  
  // Get form data
  const formData = {
    name: document.querySelector('#contactForm input[type="text"]').value,
    email: document.querySelector('#contactForm input[type="email"]').value,
    message: document.querySelector('#contactForm textarea').value
  };
  
  // Here you would typically send the data to a server
  console.log('Form submitted:', formData);
  
  // Show success message
  alert('Thank you for your message! I will get back to you soon.');
  event.target.reset();
}

// Initialize page transition
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-transition');
  
  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
  
  // Animation on scroll for elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });
});
