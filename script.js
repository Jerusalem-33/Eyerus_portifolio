
//  Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));

  const icon = document.querySelector('.dark-mode-toggle i');
  if (document.body.classList.contains('dark')) {
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
}

// Apply saved dark mode preference
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    const icon = document.querySelector('.dark-mode-toggle i');
    icon?.classList.replace('fa-moon', 'fa-sun');
  }


  //  Mobile Menu Toggle
  document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) toggleMenu();
    });
  });


  //Page Transition & Scroll Animation
  document.body.classList.add('page-transition');

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === currentPage);
  });

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

//   Canvas Image (Optional, if you're still using canvas)
  const canvas = document.getElementById("imageCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "pros.jpg";
    img.onload = () => {
      ctx.drawImage(img, 5, 5, 190, 290);
    };
  }

  
  //SVG Image + Click to Add Circle

  const svg = document.getElementById("imageSvg");
  if (svg) {
    const svgImg = document.createElementNS("http://www.w3.org/2000/svg", "image");
    svgImg.setAttributeNS(null, "href", "pro.jpeg");
    svgImg.setAttributeNS(null, "x", "0");
    svgImg.setAttributeNS(null, "y", "0");
    svgImg.setAttributeNS(null, "width", "200");
    svgImg.setAttributeNS(null, "height", "300");
    svg.appendChild(svgImg);

    svg.addEventListener("click", function(event) {
      const pt = svg.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", svgP.x);
      circle.setAttribute("cy", svgP.y);
      circle.setAttribute("r", "10");
      circle.setAttribute("fill", "rgba(255, 0, 0, 0.6)");
      circle.setAttribute("stroke", "black");
      circle.setAttribute("stroke-width", "1");
      svg.appendChild(circle);
    });
  }
});


// Toggle Mobile Menu
function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const icon = document.querySelector('.nav-toggle i');
  navMenu?.classList.toggle('active');
  icon?.classList.toggle('fa-bars');
  icon?.classList.toggle('fa-times');
}


 //Form Submission

function sendMessage(event) {
  event.preventDefault();
  const formData = {
    name: document.querySelector('#contactForm input[type="text"]').value,
    email: document.querySelector('#contactForm input[type="email"]').value,
    message: document.querySelector('#contactForm textarea').value
  };
  console.log('Form submitted:', formData);
  alert('Thank you for your message! I will get back to you soon.');
  event.target.reset();
}


// Password Strength Checker

function checkStrength(password) {
  const strengthText = document.getElementById('strengthText');
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[\W]/.test(password)) strength++;

  if (password.length < 8) {
    strengthText.textContent = "❌ Password must be at least 8 characters.";
    strengthText.className = "strength weak";
  } else if (strength <= 2) {
    strengthText.textContent = "🔴 Weak Password";
    strengthText.className = "strength weak";
  } else if (strength <= 4) {
    strengthText.textContent = "🟠 Medium Strength Password";
    strengthText.className = "strength medium";
  } else {
    strengthText.textContent = "🟢 Strong Password";
    strengthText.className = "strength strong";
  }
}

