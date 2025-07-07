// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de parallax suave no hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Animação de entrada dos elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.benefit-item, .about-text, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Efeito hover nos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efeito de clique
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
    
    // Contador animado (se necessário no futuro)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Efeito de typing para o título (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Lazy loading para o vídeo do YouTube
    const videoWrapper = document.querySelector('.video-wrapper');
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && !iframe.src.includes('autoplay')) {
                    // Adiciona parâmetros para melhor performance
                    const currentSrc = iframe.src;
                    iframe.src = currentSrc + '?rel=0&modestbranding=1&showinfo=0';
                }
                videoObserver.unobserve(entry.target);
            }
        });
    });
    
    if (videoWrapper) {
        videoObserver.observe(videoWrapper);
    }
    
    // Efeito de scroll no header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Preloader simples (opcional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Tracking de eventos (para analytics futuras)
    function trackEvent(eventName, elementType, elementText) {
        // Aqui pode ser integrado Google Analytics, Facebook Pixel, etc.
        console.log(`Event: ${eventName}, Element: ${elementType}, Text: ${elementText}`);
    }
    
    // Track clicks nos CTAs
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('CTA_Click', 'button', this.textContent.trim());
        });
    });
    
    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            
            // Track milestones
            if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
                trackEvent('Scroll_Depth', 'scroll', '25%');
            } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
                trackEvent('Scroll_Depth', 'scroll', '50%');
            } else if (maxScrollDepth >= 75 && maxScrollDepth < 100) {
                trackEvent('Scroll_Depth', 'scroll', '75%');
            } else if (maxScrollDepth >= 100) {
                trackEvent('Scroll_Depth', 'scroll', '100%');
            }
        }
    });
    
    // Otimização de performance - debounce para eventos de scroll
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplicar debounce aos eventos de scroll
    const debouncedScrollHandler = debounce(function() {
        // Handlers de scroll otimizados aqui
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Verificação de suporte a recursos modernos
    if ('IntersectionObserver' in window) {
        console.log('IntersectionObserver suportado');
    } else {
        console.log('IntersectionObserver não suportado - usando fallback');
        // Implementar fallback se necessário
    }
    
    // Melhorias de acessibilidade
    document.addEventListener('keydown', function(e) {
        // Navegação por teclado melhorada
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    console.log('Branderino Landing Page carregada com sucesso!');
});

