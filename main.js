// Main JavaScript file for portfolio functionality
// Handles animations, interactions, and dynamic content

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initAnimations();
    initSkillsChart();
    initProjectFiltering();
    initContactForm();
    initParticleSystem();
    initScrollAnimations();
    initMobileMenu();
    initProjectModals();
    initResumeDownload();
});

// Animation Initialization
function initAnimations() {
    // Hero text animations
    if (document.getElementById('hero-name')) {
        anime({
            targets: '#hero-name',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            delay: 500,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#hero-title',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#hero-desc',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: 1100,
            easing: 'easeOutExpo'
        });
    }

    // Page title animations
    if (document.getElementById('about-title')) {
        anime({
            targets: '#about-title',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#about-subtitle',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: 300,
            easing: 'easeOutExpo'
        });
    }

    if (document.getElementById('projects-title')) {
        anime({
            targets: '#projects-title',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#projects-subtitle',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: 300,
            easing: 'easeOutExpo'
        });
    }

    if (document.getElementById('contact-title')) {
        anime({
            targets: '#contact-title',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#contact-subtitle',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: 300,
            easing: 'easeOutExpo'
        });
    }
}

// Skills Radar Chart
function initSkillsChart() {
    const chartElement = document.getElementById('skills-chart');
    if (!chartElement) return;

    const chart = echarts.init(chartElement);
    
    const skillsData = [
        { name: 'Java', value: 90 },
        { name: 'Web Dev', value: 85 },
        { name: 'Python', value: 85 },
        { name: 'MongoDB', value: 80 },
        { name: 'Docker', value: 75 },
        { name: 'Selenium', value: 70 }
    ];

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return `${params.name}: ${params.value}% proficiency`;
            }
        },
        radar: {
            indicator: skillsData.map(item => ({
                name: item.name,
                max: 100
            })),
            center: ['50%', '50%'],
            radius: '70%',
            axisName: {
                color: '#2C3E50',
                fontSize: 14,
                fontWeight: 'bold'
            },
            splitLine: {
                lineStyle: {
                    color: '#E5E7EB'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#E5E7EB'
                }
            },
            splitArea: {
                show: false
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: skillsData.map(item => item.value),
                name: 'Technical Skills',
                areaStyle: {
                    color: 'rgba(13, 79, 76, 0.2)'
                },
                lineStyle: {
                    color: '#0D4F4C',
                    width: 3
                },
                itemStyle: {
                    color: '#0D4F4C',
                    borderColor: '#F7B731',
                    borderWidth: 2
                }
            }]
        }]
    };

    chart.setOption(option);

    // Animate chart on load
    setTimeout(() => {
        chart.resize();
    }, 100);

    // Handle window resize
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Project Filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutExpo'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        translateY: [0, -30],
                        duration: 300,
                        easing: 'easeInExpo',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Contact Form Validation
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.querySelector('.submit-text');
    const loadingText = document.querySelector('.loading-text');

    if (!form) return;

    // Form validation
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const errorElement = field.parentNode.querySelector('.error-message');
        
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please enter your email';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email';
                }
                break;
            case 'text':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please enter your name';
                }
                break;
            case 'select-one':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                }
                break;
            case 'textarea':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please enter your message';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                }
                break;
            case 'checkbox':
                if (!field.checked) {
                    isValid = false;
                    errorMessage = 'Please accept the privacy policy';
                }
                break;
        }

        if (isValid) {
            field.classList.remove('border-red-500');
            field.classList.add('border-green-500');
            errorElement.classList.add('hidden');
        } else {
            field.classList.remove('border-green-500');
            field.classList.add('border-red-500');
            errorElement.textContent = errorMessage;
            errorElement.classList.remove('hidden');
        }

        return isValid;
    }

    function clearError(e) {
        const field = e.target;
        const errorElement = field.parentNode.querySelector('.error-message');
        
        field.classList.remove('border-red-500', 'border-green-500');
        errorElement.classList.add('hidden');
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Show loading state
            submitBtn.disabled = true;
            submitText.classList.add('hidden');
            loadingText.classList.remove('hidden');

            // Simulate form submission
            setTimeout(() => {
                // Hide form and show success message
                form.style.display = 'none';
                successMessage.classList.add('show');

                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    successMessage.classList.remove('show');
                    submitBtn.disabled = false;
                    submitText.classList.remove('hidden');
                    loadingText.classList.add('hidden');
                    
                    // Clear all field states
                    inputs.forEach(input => {
                        input.classList.remove('border-red-500', 'border-green-500');
                    });
                }, 5000);
            }, 2000);
        }
    });

    // Animate form fields on load
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        anime({
            targets: group,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: index * 100,
            easing: 'easeOutExpo'
        });
    });
}

// Particle System for Hero Section
function initParticleSystem() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;

    // Create p5.js sketch for particles
    const sketch = (p) => {
        let particles = [];
        let mouse = { x: 0, y: 0 };

        p.setup = () => {
            const canvas = p.createCanvas(particleContainer.offsetWidth, particleContainer.offsetHeight);
            canvas.parent('particles');
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(p));
            }
        };

        p.draw = () => {
            p.clear();
            
            // Update and display particles
            particles.forEach(particle => {
                particle.update(mouse);
                particle.display();
            });
            
            // Connect nearby particles
            connectParticles(p, particles);
        };

        p.windowResized = () => {
            p.resizeCanvas(particleContainer.offsetWidth, particleContainer.offsetHeight);
        };

        p.mouseMoved = () => {
            mouse.x = p.mouseX;
            mouse.y = p.mouseY;
        };
    };

    new p5(sketch);
}

// Particle class
class Particle {
    constructor(p) {
        this.p = p;
        this.x = p.random(p.width);
        this.y = p.random(p.height);
        this.vx = p.random(-1, 1);
        this.vy = p.random(-1, 1);
        this.size = p.random(2, 4);
        this.opacity = p.random(0.3, 0.8);
    }

    update(mouse) {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            this.x -= dx * force * 0.01;
            this.y -= dy * force * 0.01;
        }

        // Wrap around edges
        if (this.x < 0) this.x = this.p.width;
        if (this.x > this.p.width) this.x = 0;
        if (this.y < 0) this.y = this.p.height;
        if (this.y > this.p.height) this.y = 0;
    }

    display() {
        this.p.fill(255, 255, 255, this.opacity * 255);
        this.p.noStroke();
        this.p.ellipse(this.x, this.y, this.size);
    }
}

// Connect particles with lines
function connectParticles(p, particles) {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const opacity = (100 - distance) / 100 * 0.2;
                p.stroke(255, 255, 255, opacity * 255);
                p.strokeWeight(1);
                p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
        }
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('skill-item')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 600,
                        easing: 'easeOutExpo'
                    });
                }
                
                if (element.classList.contains('project-card')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
                
                if (element.classList.contains('timeline-item')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        delay: 200,
                        easing: 'easeOutExpo'
                    });
                }
                
                if (element.classList.contains('timeline-node')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 600,
                        easing: 'easeOutBack'
                    });
                }
                
                if (element.classList.contains('contact-card')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutExpo'
                    });
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = document.querySelectorAll(
        '.skill-item, .project-card, .timeline-item, .timeline-node, .contact-card'
    );
    
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                anime({
                    targets: bar,
                    width: width + '%',
                    duration: 1500,
                    delay: 200,
                    easing: 'easeOutExpo'
                });
                
                skillBarObserver.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillBarObserver.observe(bar);
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (!mobileMenuBtn) return;

    mobileMenuBtn.addEventListener('click', () => {
        // Simple mobile menu toggle (you can expand this)
        alert('Mobile menu - Coming soon!');
    });
}

// Project Modals
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    const viewProjectButtons = document.querySelectorAll('.view-project');

    if (!modal) return;

    const projectData = {
        'bridhunas': {
            title: 'Bridhunas Ladies Corner',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/0D4F4C/FFFFFF?text=Bridhunas+Ladies+Corner" alt="Project Image" class="w-full h-64 object-cover rounded-lg">
                    
                    <div>
                        <h3 class="font-display text-2xl font-bold text-neutral mb-4">Project Overview</h3>
                        <p class="text-gray-700 leading-relaxed mb-6">
                            Bridhunas Ladies Corner is a comprehensive e-commerce platform designed specifically for ladies fashion. 
                            This project showcases my ability to build scalable web applications with modern technologies.
                        </p>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Technical Implementation</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• Built with Java for robust backend functionality</li>
                            <li>• JDBC for efficient database operations</li>
                            <li>• MySQL database for data persistence</li>
                            <li>• Deployed on Netlify for optimal performance</li>
                            <li>• Responsive design for all devices</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Key Features</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• User registration and authentication system</li>
                            <li>• Product catalog with search and filtering</li>
                            <li>• Shopping cart functionality</li>
                            <li>• Order management and tracking</li>
                            <li>• Admin dashboard for inventory management</li>
                        </ul>
                    </div>
                    
                    <div class="flex space-x-4 pt-4">
                        <a href="#" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                            View Live Demo
                        </a>
                        <a href="#" class="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                            View Code
                        </a>
                    </div>
                </div>
            `
        },
        'elearning': {
            title: 'E-Learning System',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=E-Learning+System" alt="Project Image" class="w-full h-64 object-cover rounded-lg">
                    
                    <div>
                        <h3 class="font-display text-2xl font-bold text-neutral mb-4">Project Overview</h3>
                        <p class="text-gray-700 leading-relaxed mb-6">
                            A comprehensive e-learning platform that provides students with an interactive platform for 
                            accessing courses, managing accounts, and engaging with digital learning materials.
                        </p>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Technical Implementation</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• Java for core application logic</li>
                            <li>• Selenium for automated testing</li>
                            <li>• Spring Boot framework for backend</li>
                            <li>• JPA for database operations</li>
                            <li>• Modular and scalable architecture</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Key Features</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• Course creation and management system</li>
                            <li>• Student enrollment and progress tracking</li>
                            <li>• Interactive quizzes and assignments</li>
                            <li>• Discussion forums for peer interaction</li>
                            <li>• Analytics and reporting dashboard</li>
                        </ul>
                    </div>
                    
                    <div class="flex space-x-4 pt-4">
                        <a href="#" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                            View Demo
                        </a>
                        <a href="#" class="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                            View Code
                        </a>
                    </div>
                </div>
            `
        },
        'question-generator': {
            title: 'Question Paper Generator System',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/F7B731/FFFFFF?text=Question+Generator" alt="Project Image" class="w-full h-64 object-cover rounded-lg">
                    
                    <div>
                        <h3 class="font-display text-2xl font-bold text-neutral mb-4">Project Overview</h3>
                        <p class="text-gray-700 leading-relaxed mb-6">
                            An automated desktop application designed to streamline the creation of exam question papers 
                            with intelligent question selection based on predefined criteria.
                        </p>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Technical Implementation</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• Java Swing for desktop GUI</li>
                            <li>• MySQL database for question storage</li>
                            <li>• iText library for PDF generation</li>
                            <li>• Intelligent question selection algorithms</li>
                            <li>• Difficulty level balancing system</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Key Features</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• Automated question paper generation</li>
                            <li>• Topic-wise question distribution</li>
                            <li>• Difficulty level management</li>
                            <li>• PDF output with professional formatting</li>
                            <li>• Question bank management system</li>
                        </ul>
                    </div>
                    
                    <div class="flex space-x-4 pt-4">
                        <a href="#" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                            View Demo
                        </a>
                        <a href="#" class="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                            View Code
                        </a>
                    </div>
                </div>
            `
        },
        'safe-drive': {
            title: 'Safe Drive 360',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/0D4F4C/FFFFFF?text=Safe+Drive+360" alt="Project Image" class="w-full h-64 object-cover rounded-lg">
                    
                    <div>
                        <h3 class="font-display text-2xl font-bold text-neutral mb-4">Project Overview</h3>
                        <p class="text-gray-700 leading-relaxed mb-6">
                            A cloud-based video analytics startup focused on road safety, delivering scalable storage 
                            and compute prototypes for real-world use. Winner of Aidea Innovation Event 2025.
                        </p>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Technical Implementation</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• Python for video analytics</li>
                            <li>• OpenCV for computer vision</li>
                            <li>• AWS cloud infrastructure</li>
                            <li>• TensorFlow for ML models</li>
                            <li>• Real-time data processing</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Key Features</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• Driver behavior analysis</li>
                            <li>• Real-time alert systems</li>
                            <li>• Cloud-based video storage</li>
                            <li>• Scalable compute infrastructure</li>
                            <li>• Data visualization dashboard</li>
                        </ul>
                    </div>
                    
                    <div class="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                        <div class="flex items-center">
                            <span class="text-2xl mr-3">🏆</span>
                            <div>
                                <p class="font-semibold text-neutral">Achievement</p>
                                <p class="text-gray-600">Winner - Aidea Innovation Event, RP Sarathy College (2025)</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex space-x-4 pt-4">
                        <a href="#" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                            Learn More
                        </a>
                    </div>
                </div>
            `
        },
        'data-dashboard': {
            title: 'Data Analysis Dashboard',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=Data+Dashboard" alt="Project Image" class="w-full h-64 object-cover rounded-lg">
                    
                    <div>
                        <h3 class="font-display text-2xl font-bold text-neutral mb-4">Project Overview</h3>
                        <p class="text-gray-700 leading-relaxed mb-6">
                            Interactive dashboard for data analysis and visualization, built during my 
                            data science internship with real-world datasets and automated reporting.
                        </p>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Technical Implementation</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• Python for data processing</li>
                            <li>• Pandas for data manipulation</li>
                            <li>• Matplotlib for visualization</li>
                            <li>• Streamlit for web interface</li>
                            <li>• Automated data pipelines</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Key Features</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• Interactive data visualization</li>
                            <li>• Automated data cleaning</li>
                            <li>• Statistical analysis tools</li>
                            <li>• Export capabilities (CSV, PDF)</li>
                            <li>• Real-time data updates</li>
                        </ul>
                    </div>
                    
                    <div class="flex space-x-4 pt-4">
                        <a href="#" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                            View Demo
                        </a>
                        <a href="#" class="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                            View Code
                        </a>
                    </div>
                </div>
            `
        },
        'portfolio': {
            title: 'Portfolio Website',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/2C3E50/FFFFFF?text=Portfolio+Website" alt="Project Image" class="w-full h-64 object-cover rounded-lg">
                    
                    <div>
                        <h3 class="font-display text-2xl font-bold text-neutral mb-4">Project Overview</h3>
                        <p class="text-gray-700 leading-relaxed mb-6">
                            Personal portfolio website showcasing my skills, projects, and experience. 
                            Built with modern web technologies, responsive design, and interactive elements.
                        </p>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Technical Implementation</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• HTML5 semantic structure</li>
                            <li>• CSS3 with Tailwind framework</li>
                            <li>• JavaScript for interactivity</li>
                            <li>• ECharts.js for data visualization</li>
                            <li>• Anime.js for smooth animations</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-neutral mb-3">Key Features</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li>• Fully responsive design</li>
                            <li>• Interactive project showcase</li>
                            <li>• Skills radar chart visualization</li>
                            <li>• Contact form with validation</li>
                            <li>• Smooth scroll animations</li>
                        </ul>
                    </div>
                    
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div class="flex items-center">
                            <span class="text-2xl mr-3">🎉</span>
                            <div>
                                <p class="font-semibold text-neutral">You're Here!</p>
                                <p class="text-gray-600">You're currently viewing this project right now!</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex space-x-4 pt-4">
                        <span class="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
                            You're Here! 🎉
                        </span>
                    </div>
                </div>
            `
        }
    };

    // Event listeners
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalTitle.textContent = project.title;
                modalContent.innerHTML = project.content;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Resume Download Functionality
function initResumeDownload() {
    const downloadBtn = document.getElementById('download-resume');
    const viewBtn = document.getElementById('view-resume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = 'resume.pdf';
            link.download = 'Gajini_Prasanth_Resume.pdf';
            link.target = '_blank';
            
            // Add click animation
            anime({
                targets: downloadBtn,
                scale: [1, 0.95, 1],
                duration: 200,
                easing: 'easeInOutQuad'
            });
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success message
            showDownloadMessage('Resume download started!');
        });
    }
    
    if (viewBtn) {
        viewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Open resume in new tab
            window.open('resume.pdf', '_blank');
            
            // Add click animation
            anime({
                targets: viewBtn,
                scale: [1, 0.95, 1],
                duration: 200,
                easing: 'easeInOutQuad'
            });
        });
    }
}

// Show download message
function showDownloadMessage(message) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = 'fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
    // Animate in
    anime({
        targets: messageEl,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutExpo'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: messageEl,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInExpo',
            complete: () => {
                document.body.removeChild(messageEl);
            }
        });
    }, 3000);
}

// Utility functions
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

// Smooth scrolling for anchor links
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

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize components that need resize handling
    const chartElement = document.getElementById('skills-chart');
    if (chartElement && window.echarts) {
        const chart = echarts.getInstanceByDom(chartElement);
        if (chart) {
            chart.resize();
        }
    }
}, 250));