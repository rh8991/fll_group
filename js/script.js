// Load saved content from localStorage
window.addEventListener('load', () => {
    loadSavedContent();
});

// Admin Panel Toggle
function toggleAdmin() {
    const panel = document.getElementById('adminPanel');
    panel.classList.toggle('active');
    
    // Load current content into form fields
    if (panel.classList.contains('active')) {
        loadContentToForm();
    }
}

// Load saved content
function loadSavedContent() {
    const about = localStorage.getItem('aboutText');
    const problem = localStorage.getItem('problemText');
    const solution = localStorage.getItem('solutionText');
    const implementation = localStorage.getItem('implementationText');
    const companyLink = localStorage.getItem('companyLink');
    
    if (about) {
        document.getElementById('aboutContent').innerHTML = `<p>${about.replace(/\n/g, '</p><p>')}</p>`;
    }
    if (problem) {
        document.getElementById('problemContent').innerHTML = `<p>${problem.replace(/\n/g, '</p><p>')}</p>`;
    }
    if (solution) {
        document.getElementById('solutionContent').innerHTML = `<p>${solution.replace(/\n/g, '</p><p>')}</p>`;
    }
    if (implementation) {
        document.getElementById('implementationContent').innerHTML = `<p>${implementation.replace(/\n/g, '</p><p>')}</p>`;
    }
    if (companyLink) {
        document.getElementById('companyLink').href = companyLink;
    }

    // Load team members
    for (let i = 1; i <= 10; i++) {
        const member = localStorage.getItem(`member${i}`);
        if (member) {
            const [name, role] = member.split(':');
            updateTeamMember(i, name, role);
        }
    }
}

// Load content to form
function loadContentToForm() {
    const about = localStorage.getItem('aboutText') || '';
    const problem = localStorage.getItem('problemText') || '';
    const solution = localStorage.getItem('solutionText') || '';
    const implementation = localStorage.getItem('implementationText') || '';
    const companyLink = localStorage.getItem('companyLink') || '';
    
    document.getElementById('aboutText').value = about;
    document.getElementById('problemText').value = problem;
    document.getElementById('solutionText').value = solution;
    document.getElementById('implementationText').value = implementation;
    document.getElementById('companyLinkInput').value = companyLink;

    for (let i = 1; i <= 10; i++) {
        const member = localStorage.getItem(`member${i}`) || '';
        document.getElementById(`member${i}`).value = member;
    }
}

// Save content
function saveContent(type) {
    if (type === 'about') {
        const text = document.getElementById('aboutText').value;
        localStorage.setItem('aboutText', text);
        document.getElementById('aboutContent').innerHTML = `<p>${text.replace(/\n/g, '</p><p>')}</p>`;
        alert('✅ תיאור הקבוצה נשמר בהצלחה!');
    } else if (type === 'problem') {
        const text = document.getElementById('problemText').value;
        localStorage.setItem('problemText', text);
        document.getElementById('problemContent').innerHTML = `<p>${text.replace(/\n/g, '</p><p>')}</p>`;
        alert('✅ תיאור הבעיה נשמר בהצלחה!');
    } else if (type === 'solution') {
        const text = document.getElementById('solutionText').value;
        localStorage.setItem('solutionText', text);
        document.getElementById('solutionContent').innerHTML = `<p>${text.replace(/\n/g, '</p><p>')}</p>`;
        alert('✅ תיאור הפתרון נשמר בהצלחה!');
    } else if (type === 'implementation') {
        const text = document.getElementById('implementationText').value;
        localStorage.setItem('implementationText', text);
        document.getElementById('implementationContent').innerHTML = `<p>${text.replace(/\n/g, '</p><p>')}</p>`;
        alert('✅ תיאור היישום נשמר בהצלחה!');
    } else if (type === 'companyLink') {
        const link = document.getElementById('companyLinkInput').value;
        if (link && !link.startsWith('http')) {
            alert('❌ כתובת האתר חייבת להתחיל ב-http:// או https://');
            return;
        }
        localStorage.setItem('companyLink', link);
        document.getElementById('companyLink').href = link;
        alert('✅ קישור לאתר החברה נשמר בהצלחה!');
    } else if (type === 'team') {
        for (let i = 1; i <= 10; i++) {
            const value = document.getElementById(`member${i}`).value;
            if (value) {
                localStorage.setItem(`member${i}`, value);
                const [name, role] = value.split(':');
                updateTeamMember(i, name, role);
            }
        }
        alert('✅ פרטי הצוות נשמרו בהצלחה!');
    }
}

// Update team member display
function updateTeamMember(index, name, role) {
    const teamGrid = document.getElementById('teamGrid');
    const member = teamGrid.children[index - 1];
    if (member && name && role) {
        member.querySelector('.member-name').textContent = name.trim();
        member.querySelector('.member-role').textContent = role.trim();
    }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function goToSlide(n) {
    showSlide(n);
}

// Auto-play carousel
let autoplayInterval = setInterval(() => {
    changeSlide(1);
}, 4000);

const carousel = document.querySelector('.carousel-container');
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        changeSlide(1);
    }, 4000);
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(-1);
    }
});
