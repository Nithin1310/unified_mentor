
// ==============================================
// FitZone Gym Management System JavaScript
// Pure JavaScript with modern ES6+ features
// ==============================================

// Global Variables and Constants
const APP_CONFIG = {
    // Admin credentials for demo login
    adminCredentials: {
        email: 'nithin@fit.com',
        password: 'nithin760'
    },
    
    // Member credentials for demo login
    memberCredentials: [
        { email: 'kishore@fit.com', password: 'kishore8500', name: 'Pentala Kishore' },
        { email: 'aaman@fit.com', password: 'aaman0007', name: 'Aaman Kumar' },
        { email: 'karthik@fit.com', password: 'chintu420', name: 'Lomte Karthik' }
    ],
    
    // Sample data for members management
    membersData: [
        { id: 1, name: 'Pentala Kishore', email: 'kishore@fit.com', plan: 'Premium', status: 'Active' },
        { id: 2, name: 'Aaman Kumar', email: 'aaman@fit.com', plan: 'Basic', status: 'Active' },
        { id: 3, name: 'Lomte Karthik', email: 'karthik@fit.com', plan: 'VIP', status: 'Active' }
    ],
    
    // Sample staff data
    staffData: [
        { id: 1, name: 'Pentala Kishore', role: 'Personal Trainer', email: 'mike@fitzone.com', shift: 'Morning' },
        { id: 2, name: 'Aaman Kumar', role: 'Yoga Instructor', email: 'sarah@fitzone.com', shift: 'Evening' },
        { id: 3, name: 'Lomte Karthik', role: 'HIIT Trainer', email: 'david@fitzone.com', shift: 'Afternoon' }
    ]
};

// ==============================================
// Utility Functions
// ==============================================

/**
 * Show an element with animation
 * @param {HTMLElement} element - Element to show
 */
function showElement(element) {
    if (element) {
        element.style.display = 'block';
        element.classList.add('show');
    }
}

/**
 * Hide an element with animation
 * @param {HTMLElement} element - Element to hide
 */
function hideElement(element) {
    if (element) {
        element.classList.remove('show');
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);
    }
}

/**
 * Show error message with animation
 * @param {string} elementId - ID of error element
 * @param {string} message - Error message to display
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 5000);
    }
}

/**
 * Clear error message
 * @param {string} elementId - ID of error element
 */
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

/**
 * Show loading state on button
 * @param {HTMLElement} button - Button element
 * @param {boolean} loading - Loading state
 */
function setButtonLoading(button, loading) {
    if (!button) return;
    
    const loader = button.querySelector('.btn-loader');
    const span = button.querySelector('span');
    
    if (loading) {
        button.disabled = true;
        if (loader) loader.style.display = 'inline-block';
        if (span) span.style.opacity = '0.7';
    } else {
        button.disabled = false;
        if (loader) loader.style.display = 'none';
        if (span) span.style.opacity = '1';
    }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Valid email or not
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Add smooth scroll behavior to anchor links
 */
function initSmoothScroll() {
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

// ==============================================
// Admin Login Functionality
// ==============================================

/**
 * Initialize admin login page
 */
function initAdminLogin() {
    const loginForm = document.getElementById('adminLoginForm');
    if (!loginForm) return;
    
    console.log('Initializing admin login...');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleAdminLogin();
    });
    
    // Add input focus animations
    const inputs = loginForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            clearError('adminError');
        });
    });
}

/**
 * Handle admin login form submission
 */
function handleAdminLogin() {
    console.log('Handling admin login...');
    
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    const loginBtn = document.querySelector('.login-btn');
    
    // Clear previous errors
    clearError('adminError');
    
    // Validate inputs
    if (!email || !password) {
        showError('adminError', 'Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('adminError', 'Please enter a valid email address');
        return;
    }
    
    // Show loading state
    setButtonLoading(loginBtn, true);
    
    // Simulate network delay
    setTimeout(() => {
        // Check credentials
        if (email === APP_CONFIG.adminCredentials.email && 
            password === APP_CONFIG.adminCredentials.password) {
            
            console.log('Admin login successful');
            
            // Store login state
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminEmail', email);
            
            // Redirect to admin dashboard
            window.location.href = 'dashboard-admin.html';
        } else {
            showError('adminError', 'Invalid email or password');
            setButtonLoading(loginBtn, false);
        }
    }, 1000);
}

// ==============================================
// Member Login Functionality
// ==============================================

/**
 * Initialize member login page
 */
function initMemberLogin() {
    const loginForm = document.getElementById('memberLoginForm');
    if (!loginForm) return;
    
    console.log('Initializing member login...');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleMemberLogin();
    });
    
    // Add input focus animations
    const inputs = loginForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            clearError('memberError');
        });
    });
}

/**
 * Handle member login form submission
 */
function handleMemberLogin() {
    console.log('Handling member login...');
    
    const email = document.getElementById('memberEmail').value.trim();
    const password = document.getElementById('memberPassword').value.trim();
    const loginBtn = document.querySelector('.login-btn');
    
    // Clear previous errors
    clearError('memberError');
    
    // Validate inputs
    if (!email || !password) {
        showError('memberError', 'Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('memberError', 'Please enter a valid email address');
        return;
    }
    
    // Show loading state
    setButtonLoading(loginBtn, true);
    
    // Simulate network delay
    setTimeout(() => {
        // Check credentials against member list
        const member = APP_CONFIG.memberCredentials.find(m => 
            m.email === email && m.password === password
        );
        
        if (member) {
            console.log('Member login successful for:', member.name);
            
            // Store login state
            localStorage.setItem('memberLoggedIn', 'true');
            localStorage.setItem('memberEmail', email);
            localStorage.setItem('memberName', member.name);
            
            // Redirect to member dashboard
            window.location.href = 'dashboard-member.html';
        } else {
            showError('memberError', 'Invalid email or password');
            setButtonLoading(loginBtn, false);
        }
    }, 1000);
}

// ==============================================
// Admin Dashboard Functionality
// ==============================================

/**
 * Initialize admin dashboard
 */
function initAdminDashboard() {
    console.log('Initializing admin dashboard...');
    
    // Check if admin is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login-admin.html';
        return;
    }
    
    initSidebarNavigation();
    initMembersManagement();
    initStaffManagement();
    populateInitialData();
}

/**
 * Initialize sidebar navigation
 */
function initSidebarNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.dataset.section;
            console.log('Switching to section:', targetSection);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
}

/**
 * Initialize members management functionality
 */
function initMembersManagement() {
    // Add member form handler
    const addMemberForm = document.getElementById('addMemberForm');
    if (addMemberForm) {
        addMemberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddMember();
        });
    }
}

/**
 * Initialize staff management functionality
 */
function initStaffManagement() {
    // Staff management will be similar to members management
    console.log('Staff management initialized');
}

/**
 * Handle adding new member
 */
function handleAddMember() {
    const name = document.getElementById('memberName').value.trim();
    const email = document.getElementById('memberEmailAdd').value.trim();
    const plan = document.getElementById('memberPlan').value;
    
    // Validate inputs
    if (!name || !email || !plan) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Check if email already exists
    const existingMember = APP_CONFIG.membersData.find(m => m.email === email);
    if (existingMember) {
        alert('A member with this email already exists');
        return;
    }
    
    // Add new member
    const newMember = {
        id: APP_CONFIG.membersData.length + 1,
        name: name,
        email: email,
        plan: plan,
        status: 'Active'
    };
    
    APP_CONFIG.membersData.push(newMember);
    
    // Update table
    updateMembersTable();
    
    // Close modal and clear form
    closeModal('addMemberModal');
    document.getElementById('addMemberForm').reset();
    
    console.log('New member added:', newMember);
    alert('Member added successfully!');
}

/**
 * Update members table with current data
 */
function updateMembersTable() {
    const tableBody = document.getElementById('membersTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    APP_CONFIG.membersData.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.plan}</td>
            <td><span class="status ${member.status.toLowerCase()}">${member.status}</span></td>
            <td>
                <button class="action-btn edit" onclick="editMember(${member.id})">Edit</button>
                <button class="action-btn delete" onclick="deleteMember(${member.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Populate initial data in dashboard
 */
function populateInitialData() {
    updateMembersTable();
    // Add more data population as needed
}

/**
 * Edit member (placeholder function)
 * @param {number} memberId - ID of member to edit
 */
function editMember(memberId) {
    const member = APP_CONFIG.membersData.find(m => m.id === memberId);
    if (member) {
        alert(`Edit functionality for ${member.name} would be implemented here`);
        console.log('Edit member:', member);
    }
}

/**
 * Delete member
 * @param {number} memberId - ID of member to delete
 */
function deleteMember(memberId) {
    const member = APP_CONFIG.membersData.find(m => m.id === memberId);
    if (member && confirm(`Are you sure you want to delete ${member.name}?`)) {
        APP_CONFIG.membersData = APP_CONFIG.membersData.filter(m => m.id !== memberId);
        updateMembersTable();
        console.log('Member deleted:', member);
    }
}

// ==============================================
// Member Dashboard Functionality
// ==============================================

/**
 * Initialize member dashboard
 */
function initMemberDashboard() {
    console.log('Initializing member dashboard...');
    
    // Check if member is logged in
    if (!localStorage.getItem('memberLoggedIn')) {
        window.location.href = 'login-member.html';
        return;
    }
    
    // Personalize welcome message
    const memberName = localStorage.getItem('memberName') || 'Member';
    const welcomeElement = document.querySelector('.welcome-section h1');
    if (welcomeElement) {
        welcomeElement.textContent = `Welcome back, ${memberName}!`;
    }
    
    // Initialize check-in functionality
    initCheckIn();
}

/**
 * Initialize check-in functionality
 */
function initCheckIn() {
    const checkInBtn = document.querySelector('.check-in-btn');
    if (checkInBtn) {
        checkInBtn.addEventListener('click', function() {
            handleCheckIn();
        });
    }
}

/**
 * Handle member check-in
 */
function handleCheckIn() {
    const checkInBtn = document.querySelector('.check-in-btn');
    const memberName = localStorage.getItem('memberName') || 'Member';
    
    // Show loading state
    checkInBtn.textContent = 'Checking In...';
    checkInBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate check-in success
        checkInBtn.textContent = 'Checked In ✓';
        checkInBtn.style.background = 'rgba(46, 204, 113, 0.2)';
        checkInBtn.style.color = '#2ecc71';
        checkInBtn.style.borderColor = '#2ecc71';
        
        console.log(`${memberName} checked in at ${new Date().toLocaleTimeString()}`);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            checkInBtn.textContent = 'Check In';
            checkInBtn.disabled = false;
            checkInBtn.style.background = '';
            checkInBtn.style.color = '';
            checkInBtn.style.borderColor = '';
        }, 3000);
    }, 1000);
}

// ==============================================
// Visitor Page Functionality
// ==============================================

/**
 * Initialize visitor page
 */
function initVisitorPage() {
    console.log('Initializing visitor page...');
    
    initSmoothScroll();
    initContactForm();
    initMobileMenu();
    initPlanSelection();
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactForm();
    });
}

/**
 * Handle contact form submission
 */
function handleContactForm() {
    const formData = {
        name: document.getElementById('contactName').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        phone: document.getElementById('contactPhone').value.trim(),
        interest: document.getElementById('contactInterest').value,
        message: document.getElementById('contactMessage').value.trim()
    };
    
    // Validate required fields
    for (const [key, value] of Object.entries(formData)) {
        if (!value) {
            alert(`Please fill in the ${key} field`);
            return;
        }
    }
    
    if (!isValidEmail(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.contact-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('contactForm').reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        console.log('Contact form submitted:', formData);
    }, 1500);
}

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
        });
    }
}

/**
 * Initialize plan selection
 */
function initPlanSelection() {
    const planButtons = document.querySelectorAll('.plan-button');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planCard = this.closest('.plan-card');
            const planName = planCard.querySelector('h3').textContent;
            const planPrice = planCard.querySelector('.amount').textContent;
            
            alert(`You selected the ${planName} plan for $${planPrice}/month. Redirecting to registration...`);
            console.log(`Plan selected: ${planName} - $${planPrice}/month`);
            
            // In a real application, this would redirect to a registration page
            // window.location.href = 'register.html?plan=' + planName;
        });
    });
}

// ==============================================
// Modal Functionality
// ==============================================

/**
 * Show modal
 * @param {string} modalId - ID of modal to show
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        console.log('Modal shown:', modalId);
    }
}

/**
 * Close modal
 * @param {string} modalId - ID of modal to close
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        console.log('Modal closed:', modalId);
    }
}

/**
 * Show add member modal
 */
function showAddMemberModal() {
    showModal('addMemberModal');
}

/**
 * Show add staff modal
 */
function showAddStaffModal() {
    alert('Add Staff functionality would be implemented here');
    console.log('Add staff modal requested');
}

// ==============================================
// Animation and Visual Effects
// ==============================================

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.service-card, .plan-card, .trainer-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Initialize card hover effects
 */
function initCardEffects() {
    // Add subtle tilt effect to cards on hover
    const cards = document.querySelectorAll('.portal-card, .service-card, .plan-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
}

// ==============================================
// Page-Specific Initialization
// ==============================================

/**
 * Initialize the application based on current page
 */
function initApp() {
    console.log('FitZone Gym Management System - Initializing...');
    
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('Current page:', currentPage);
    
    // Initialize based on current page
    switch (currentPage) {
        case 'index.html':
        case '':
            console.log('Initializing landing page...');
            initCardEffects();
            break;
            
        case 'login-admin.html':
            initAdminLogin();
            break;
            
        case 'login-member.html':
            initMemberLogin();
            break;
            
        case 'dashboard-admin.html':
            initAdminDashboard();
            break;
            
        case 'dashboard-member.html':
            initMemberDashboard();
            break;
            
        case 'visitor.html':
            initVisitorPage();
            initScrollAnimations();
            initCardEffects();
            break;
            
        default:
            console.log('Unknown page, initializing common functionality...');
            initCardEffects();
    }
    
    // Initialize common functionality
    initModalCloseHandlers();
    
    console.log('FitZone initialization complete!');
}

/**
 * Initialize modal close handlers
 */
function initModalCloseHandlers() {
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            const modalId = e.target.id;
            closeModal(modalId);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
}

// ==============================================
// Event Listeners and Initialization
// ==============================================

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('Page is now visible');
    } else {
        console.log('Page is now hidden');
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Responsive adjustments can be added here
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
});

// ==============================================
// Export functions for global access
// ==============================================

// Make key functions available globally for onclick handlers
window.showAddMemberModal = showAddMemberModal;
window.showAddStaffModal = showAddStaffModal;
window.closeModal = closeModal;
window.editMember = editMember;
window.deleteMember = deleteMember;

console.log('FitZone Gym Management System JavaScript loaded successfully!');
