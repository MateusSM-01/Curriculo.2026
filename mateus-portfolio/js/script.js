// ===========================
// NAVEGAÇÃO E MENU MOBILE
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ===========================
// ANIMAÇÃO DE SCROLL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.ladder-step, .education-card, .cert-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// ANIMAÇÃO DE SKILL BARS
// ===========================

const skillBars = document.querySelectorAll('.skill-progress');
const skillSection = document.querySelector('.skills');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-out';
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (skillSection) {
    skillObserver.observe(skillSection);
}

// ===========================
// CONTADOR DE ESTATÍSTICAS
// ===========================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statBoxes = document.querySelectorAll('.stat-box h3');
const aboutSection = document.querySelector('.about');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statBoxes.forEach(box => {
                const text = box.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(box, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ===========================
// FORMULÁRIO DE CONTATO
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Mensagem Enviada! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #00d084, #00d084)';
            
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// ===========================
// EFEITO PARALLAX
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animated-bg');
    
    parallaxElements.forEach(el => {
        el.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.5}px))`;
    });
});

// ===========================
// ANIMAÇÃO DE CARDS FLUTUANTES
// ===========================

const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// SMOOTH SCROLL PARA LINKS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// ATIVA LINK ATIVO NA NAV
// ===========================

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// ===========================
// EFEITO HOVER NOS BOTÕES
// ===========================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===========================
// ANIMAÇÃO DE LOADING INICIAL
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===========================
// DARK MODE TOGGLE (OPCIONAL)
// ===========================

// Você pode adicionar um toggle de tema aqui se desejar

// ===========================
// VALIDAÇÃO DE FORMULÁRIO
// ===========================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ===========================
// INICIALIZAÇÃO
// ===========================

console.log('🚀 Portfólio de Mateus Souza Meira carregado com sucesso!');
console.log('📧 Contato: (15) 98810-8794');
console.log('📍 Localização: Itapetininga, SP');
