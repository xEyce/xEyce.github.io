// MENU ICON
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
}

// TYPING EFFECT
const roles = ["Computer Engineer", "Web Developer"];
    const typingSpan = document.querySelector(".typing");

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        const currentText = currentRole.substring(0, charIndex);
        typingSpan.textContent = currentText + (isDeleting || charIndex < currentRole.length ? '|' : '');

        if (!isDeleting && charIndex < currentRole.length) {
            charIndex++;
            setTimeout(type, 150);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 100);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                roleIndex = (roleIndex + 1) % roles.length;
            }
            setTimeout(type, 1000);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(type, 1000);
    });

//TOGGLE EXPERIENCE OR EDUCATION
const experienceBtn = document.getElementById('experience-btn');
const educationBtn = document.getElementById('education-btn');
const experienceContainer = document.getElementById('experiences-container');
const educationContainer = document.getElementById('education-container');
const wrapper = document.getElementById('toggle-wrapper');

let currentSection = null;


experienceBtn.addEventListener("mouseenter", () => {
  currentSection = "experience";
  experienceContainer.classList.add("visible");
  educationContainer.classList.remove("visible");
});

educationBtn.addEventListener("mouseenter", () => {
  currentSection = "education";
  educationContainer.classList.add("visible");
  experienceContainer.classList.remove("visible");
});


wrapper.addEventListener("mouseleave", () => {
  experienceContainer.classList.remove("visible");
  educationContainer.classList.remove("visible");
  currentSection = null;
});

// CIRCLE
function animateCircles() {
    const circles = document.querySelectorAll('.circle');

    circles.forEach(elem => {
        
        if (elem.classList.contains("animated")) return;

        const dots = elem.getAttribute("data-dots");
        const marked = elem.getAttribute("data-percent");
        const percent = Math.floor(dots * marked / 100);
        let points = "";
        const rotate = 360 / dots;

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }

        elem.insertAdjacentHTML('beforeend', points);
        const pointsMarked = elem.querySelectorAll('.points');
        for (let i = 0; i < percent; i++) {
            pointsMarked[i].classList.add('marked');
        }

        const bars = document.querySelectorAll('.skill-bar .bar span');
        bars.forEach(bar => {
            const skill = bar.classList[0]; 
            let animationName = '';
            let duration = '2s';

            switch (skill) {
                case 'html':
                    animationName = 'html';
                    duration = '1.5s';
                    break;
                case 'css':
                    animationName = 'css';
                    duration = '2s';
                    break;
                case 'javascript':
                    animationName = 'javascript';
                    duration = '2.5s';
                    break;
                case 'reactjs':
                    animationName = 'reactjs';
                    duration = '3s';
                    break;
                case 'python':
                    animationName = 'python';
                    duration = '3.5s';
                    break;
                case 'django':
                    animationName = 'django';
                    duration = '4.5s';
                    break;
                case 'sql':
                    animationName = 'sql';
                    duration = '5s';
                    break;
                case 'git':
                    animationName = 'git';
                    duration = '5s';
                    break;
            }

            bar.style.animation = `${animationName} ${duration} forwards`;
        });

        elem.classList.add("animated"); 
    });
}

const skillsSection = document.querySelector('#skills-section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCircles(); 
        } else {
            resetAnimations(); 
        }
    });
}, {
    threshold: 0.3
});


observer.observe(skillsSection);

function resetAnimations() {
    const bars = document.querySelectorAll('.skill-bar .bar span');
    bars.forEach(bar => {
        bar.style.animation = 'none';
        bar.style.width = '0%';
        void bar.offsetWidth; 
    });

    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        const points = circle.querySelectorAll('.points');
        points.forEach(point => point.remove()); 
        circle.classList.remove('animated');
    });
}

// CONTACT FORM
function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  status.textContent = "Sending...";

  setTimeout(() => {
    status.textContent = "Thank you! Your message has been sent.";
    form.reset();
  }, 1500);

  return false;
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const status = document.getElementById('formStatus');
    status.textContent = "Sending...";

    emailjs.sendForm('service_bubux66', 'template_z6ittpq', this)
      .then(() => {
        status.textContent = "Message sent successfully!";
        
      }, (error) => {
        console.error('FAILED...', error);
        status.textContent = "Failed to send message. Try again later.";
      });
      this.reset();
  });

