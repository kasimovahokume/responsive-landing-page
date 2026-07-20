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

// ============ 4. CONTACT FORM VALIDATION ============
const contactForm = document.querySelector('.contact__form');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Form submit olanda
contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Səhifə reload olmasın!
    
    // Bütün error mesajlarını təmizlə
    clearErrors();
    
    let isValid = true;
    
    // 1. Ad-Soyad yoxlaması
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Ad və Soyad boş ola bilməz!');
        isValid = false;
    } else if (nameInput.value.trim().length < 3) {
        showError(nameInput, 'Ad ən azı 3 simvol olmalıdır!');
        isValid = false;
    }
    
    // 2. Email yoxlaması
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email boş ola bilməz!');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Düzgün email formatı daxil edin! (ornek@mail.com)');
        isValid = false;
    }
    
    // 3. Mesaj yoxlaması
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Mesaj boş ola bilməz!');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Mesaj ən azı 10 simvol olmalıdır!');
        isValid = false;
    }
    
    // Hər şey düzgündürsə - uğurlu mesaj göstər
    if (isValid) {
        showSuccess();
        contactForm.reset(); // Formu təmizlə
    }
});

// Email formatını yoxlayan funksiya (Regex)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Error göstər
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    input.style.borderColor = '#dc2626';
    input.style.background = '#fef2f2';
}

// Error təmizlə
function clearErrors() {
    const errors = document.querySelectorAll('.contact__error');
    const inputs = document.querySelectorAll('.contact__field input, .contact__field textarea');
    
    errors.forEach(error => error.textContent = '');
    inputs.forEach(input => {
        input.style.borderColor = '#e2e8f0';
        input.style.background = '#f8fafc';
    });
}

// Uğurlu göndərmə mesajı
function showSuccess() {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = '✅ Mesajınız uğurla göndərildi!';
    successMsg.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.4s ease;
    `;
    document.body.appendChild(successMsg);
    
    // 3 saniyə sonra sil
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

// Real-time yoxlama - istifadəçi yazdıqca error təmizlənsin
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', function() {
        this.style.borderColor = '#2563eb';
        this.style.background = 'white';
        this.nextElementSibling.textContent = '';
    });
});