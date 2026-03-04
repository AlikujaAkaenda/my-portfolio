// ===== MAIN JAVASCRIPT =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeThemeToggle();
    initializeFormHandling();
    loadProjects();
    loadSkills();
    loadTestimonials();
    initializeFireEffect();
    initializeFooterDropdown();
    updateCopyrightYear();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    const backToTop = createBackToTopButton();

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.classList.add('back-to-top');
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(button);
    return button;
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeToggle, savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeToggle, newTheme);
    });

    document.body.appendChild(themeToggle);
}

function updateThemeIcon(button, theme) {
    button.innerHTML = theme === 'light' 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
}

// ===== FIRE PARTICLES EFFECT =====
function initializeFireEffect() {
    const footerInfo = document.querySelectorAll('.footer-info');
    
    footerInfo.forEach(info => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'fire-particles';
        info.style.position = 'relative';
        info.appendChild(particlesContainer);
        
        setInterval(() => {
            createFireParticle(particlesContainer);
        }, 200);
    });
}

function createFireParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'fire-particle';
    
    const left = Math.random() * 100;
    particle.style.left = left + '%';
    particle.style.bottom = '0';
    
    const duration = Math.random() * 1.5 + 1;
    particle.style.animationDuration = duration + 's';
    
    const delay = Math.random() * 0.5;
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// ===== FOOTER DROPDOWN =====
function initializeFooterDropdown() {
    const footerLinks = document.querySelectorAll('.footer-links');
    
    footerLinks.forEach(section => {
        const heading = section.querySelector('h4');
        if (heading) {
            heading.addEventListener('click', () => {
                section.classList.toggle('active');
            });
        }
    });
}

// ===== AUTO-UPDATE COPYRIGHT YEAR =====
function updateCopyrightYear() {
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        const text = element.textContent;
        // Replace any 4-digit year with current year
        element.textContent = text.replace(/\d{4}/, currentYear);
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => observer.observe(element));
}

// ===== FORM HANDLING =====
function initializeFormHandling() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Contact form (if on contact page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

async function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Show loading state
    const button = e.target.querySelector('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;

    try {
        // Simulate API call (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showNotification('Thanks for subscribing!', 'success');
        e.target.reset();
    } catch (error) {
        showNotification('Something went wrong. Please try again.', 'error');
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validate form
    if (!validateContactForm(data)) {
        return;
    }

    // Show loading state
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;

    try {
        // Send to Formspree or your backend
        // Replace 'your-form-id' with your actual Formspree form ID
        const response = await fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showNotification('Message sent successfully!', 'success');
            e.target.reset();
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        showNotification('Failed to send message. Please email directly.', 'error');
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

function validateContactForm(data) {
    if (!data.name || data.name.length < 2) {
        showNotification('Please enter your name', 'error');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email', 'error');
        return false;
    }
    
    if (!data.message || data.message.length < 10) {
        showNotification('Message must be at least 10 characters', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== PROJECTS LOADING =====
async function loadProjects() {
    const projectsGrid = document.getElementById('featured-projects');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '<div class="spinner"></div>';

    try {
        const projects = await db.getFeaturedProjects();
        
        // Create carousel structure
        projectsGrid.innerHTML = `
            <div class="projects-carousel">
                <div class="carousel-container" id="carousel-container"></div>
                <div class="carousel-controls">
                    <button class="carousel-btn" id="carousel-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="carousel-btn" id="carousel-next"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="carousel-dots" id="carousel-dots"></div>
            </div>
        `;
        
        const container = document.getElementById('carousel-container');
        projects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.appendChild(createProjectCard(project));
            container.appendChild(item);
        });
        
        initializeCarousel(projects.length);
    } catch (error) {
        console.error('Failed to load projects:', error);
        projectsGrid.innerHTML = '<p class="error">Failed to load projects.</p>';
    }
}

// ===== CAROUSEL FUNCTIONALITY =====
function initializeCarousel(totalItems) {
    let currentIndex = 0;
    const container = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    
    // Create dots
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    function updateCarousel() {
        const itemWidth = container.querySelector('.carousel-item').offsetWidth;
        const gap = 32; // 2rem
        container.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;
        
        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalItems - 1;
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalItems - 1));
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Auto-play
    let autoplayInterval = setInterval(() => {
        if (currentIndex < totalItems - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }, 5000);
    
    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    container.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            if (currentIndex < totalItems - 1) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0);
            }
        }, 5000);
    });
    
    updateCarousel();
}

// ===== SKILLS LOADING =====
async function loadSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    try {
        const skills = await db.getSkills();
        skillsGrid.innerHTML = '';
        
        Object.keys(skills).forEach(category => {
            const categoryDiv = createSkillCategory(category, skills[category]);
            skillsGrid.appendChild(categoryDiv);
        });
    } catch (error) {
        console.error('Failed to load skills:', error);
    }
}

function createSkillCategory(category, items) {
    const div = document.createElement('div');
    div.className = 'skill-category';
    
    const icons = {
        frontend: 'fa-laptop-code',
        backend: 'fa-server',
        tools: 'fa-tools'
    };
    
    div.innerHTML = `
        <h3><i class="fas ${icons[category]}"></i> ${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
        <div class="skill-items">
            ${items.map(skill => `
                <div class="skill-item">
                    <span>${skill.name}</span>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    return div;
}

// ===== TESTIMONIALS LOADING =====
async function loadTestimonials() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    try {
        const testimonials = await db.getTestimonials();
        
        // Create carousel structure
        slider.innerHTML = `
            <div class="testimonials-carousel">
                <div class="testimonials-container" id="testimonials-container"></div>
                <div class="testimonials-controls">
                    <button class="carousel-btn" id="testimonials-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="carousel-btn" id="testimonials-next"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="testimonials-dots" id="testimonials-dots"></div>
            </div>
        `;
        
        const container = document.getElementById('testimonials-container');
        testimonials.forEach(testimonial => {
            const item = document.createElement('div');
            item.className = 'testimonial-item';
            item.appendChild(createTestimonialCard(testimonial));
            container.appendChild(item);
        });
        
        initializeTestimonialsCarousel(testimonials.length);
    } catch (error) {
        console.error('Failed to load testimonials:', error);
    }
}

function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    const stars = '<i class="fas fa-star"></i>'.repeat(testimonial.rating || 5);
    
    card.innerHTML = `
        <div class="testimonial-content">
            <i class="fas fa-quote-left"></i>
            <p>${testimonial.text}</p>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.name}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=2563eb&color=fff'">
                <div>
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.position}</p>
                    <div class="testimonial-rating">${stars}</div>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// ===== TESTIMONIALS CAROUSEL =====
function initializeTestimonialsCarousel(totalItems) {
    let currentIndex = 0;
    const container = document.getElementById('testimonials-container');
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');
    const dotsContainer = document.getElementById('testimonials-dots');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    // Create dots
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    function updateCarousel() {
        const itemWidth = container.querySelector('.testimonial-item').offsetWidth;
        const gap = 32;
        container.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;
        
        document.querySelectorAll('#testimonials-dots .carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalItems - 1;
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalItems - 1));
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Auto-play
    let autoplayInterval = setInterval(() => {
        if (currentIndex < totalItems - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }, 6000);
    
    container.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    container.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            if (currentIndex < totalItems - 1) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0);
            }
        }, 6000);
    });
    
    updateCarousel();
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x450/2563eb/ffffff?text=${encodeURIComponent(project.title)}'">
            <div class="project-overlay">
                <a href="${project.liveUrl}" target="_blank" class="project-link" title="View Live Demo">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="${project.githubUrl}" target="_blank" class="project-link" title="View Code">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    return card;
}
