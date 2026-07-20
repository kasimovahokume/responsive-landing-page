const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
});


overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navbar.classList.remove('active');
    overlay.classList.remove('active');
});


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
        overlay.classList.remove('active');
    });
});



const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80; 
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = '#fffffffa';
        header.style.boxShadow = '0#fffffffa, 0.1)';
    } else {
        header.style.background = '#fffffff2';
        header.style.boxShadow = '0 2px 20px rgba(15, 23, 42, 0.06)';
    }
});