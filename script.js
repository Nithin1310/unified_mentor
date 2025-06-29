
// Global variables
let currentUser = null;
let appointments = [];
let appointmentRequests = [];

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function formatTime(time) {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Authentication Functions
function handleStudentLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simple validation (in real app, this would be server-side)
    if (email && password) {
        // Simulate login
        currentUser = {
            id: generateId(),
            type: 'student',
            email: email,
            name: 'John Doe',
            rollNumber: 'CS2024001',
            department: 'Computer Science'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'student-dashboard.html';
        }, 1500);
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function handleTeacherLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simple validation
    if (email && password) {
        currentUser = {
            id: generateId(),
            type: 'teacher',
            email: email,
            name: 'Dr. Sarah Johnson',
            employeeId: 'EMP001',
            designation: 'Associate Professor',
            department: 'Mathematics'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'teacher-dashboard.html';
        }, 1500);
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function handleStudentRegistration(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Simulate registration
    showNotification('Registration successful! Please login.', 'success');
    
    setTimeout(() => {
        window.location.href = 'student-login.html';
    }, 1500);
}

function handleTeacherRegistration(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Simulate registration
    showNotification('Registration successful! Please login.', 'success');
    
    setTimeout(() => {
        window.location.href = 'teacher-login.html';
    }, 1500);
}

// Dashboard Navigation
function initializeDashboard() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.getAttribute('data-section') + '-section';
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// Student Dashboard Functions
function handleBookAppointment(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const appointment = {
        id: generateId(),
        studentId: currentUser.id,
        studentName: currentUser.name,
        teacherId: formData.get('teacher'),
        subject: formData.get('subject'),
        date: formData.get('date'),
        time: formData.get('time'),
        topic: formData.get('topic'),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Get existing appointments from localStorage
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    showNotification('Appointment request submitted successfully!', 'success');
    event.target.reset();
    
    // Refresh appointments table if we're on that section
    loadStudentAppointments();
}

function loadStudentAppointments() {
    const tableBody = document.getElementById('appointmentTableBody');
    if (!tableBody) return;
    
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = appointments.filter(apt => apt.studentId === currentUser.id);
    
    tableBody.innerHTML = '';
    
    userAppointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${appointment.id.substr(0, 3)}</td>
            <td>${getTeacherName(appointment.teacherId)}</td>
            <td>${appointment.subject}</td>
            <td>${formatDate(appointment.date)}</td>
            <td>${formatTime(appointment.time)}</td>
            <td>${appointment.topic || 'N/A'}</td>
            <td><span class="status-badge status-${appointment.status}">${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span></td>
            <td>
                ${appointment.status === 'pending' ? 
                    `<button class="action-btn btn-reject" onclick="cancelAppointment('${appointment.id}')">Cancel</button>` : 
                    '-'
                }
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments = appointments.filter(apt => apt.id !== appointmentId);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        showNotification('Appointment cancelled successfully!', 'success');
        loadStudentAppointments();
    }
}

function getTeacherName(teacherId) {
    const teachers = {
        'dr-sarah-johnson': 'Dr. Sarah Johnson',
        'prof-michael-chen': 'Prof. Michael Chen',
        'dr-emily-davis': 'Dr. Emily Davis',
        'dr-robert-wilson': 'Dr. Robert Wilson',
        'prof-lisa-anderson': 'Prof. Lisa Anderson'
    };
    return teachers[teacherId] || 'Unknown Teacher';
}

// Teacher Dashboard Functions
function loadAppointmentRequests() {
    const tableBody = document.getElementById('requestTableBody');
    if (!tableBody) return;
    
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const pendingRequests = appointments.filter(apt => apt.status === 'pending');
    
    // Clear existing rows except the sample data
    // In a real app, we'd replace this with actual data
}

function approveRequest(requestId) {
    if (confirm('Approve this appointment request?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const appointmentIndex = appointments.findIndex(apt => apt.id === requestId);
        
        if (appointmentIndex !== -1) {
            appointments[appointmentIndex].status = 'approved';
            localStorage.setItem('appointments', JSON.stringify(appointments));
            showNotification('Appointment approved successfully!', 'success');
            
            // In a real app, you'd refresh the table here
            updateRequestRow(requestId, 'approved');
        }
    }
}

function rejectRequest(requestId) {
    if (confirm('Reject this appointment request?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const appointmentIndex = appointments.findIndex(apt => apt.id === requestId);
        
        if (appointmentIndex !== -1) {
            appointments[appointmentIndex].status = 'rejected';
            localStorage.setItem('appointments', JSON.stringify(appointments));
            showNotification('Appointment rejected.', 'info');
            
            // In a real app, you'd refresh the table here
            updateRequestRow(requestId, 'rejected');
        }
    }
}

function updateRequestRow(requestId, status) {
    const row = document.querySelector(`tr:has(td:first-child:contains("#${requestId}"))`);
    if (row) {
        const statusCell = row.querySelector('.status-badge');
        const actionsCell = row.querySelector('td:last-child');
        
        if (statusCell) {
            statusCell.className = `status-badge status-${status}`;
            statusCell.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        }
        
        if (actionsCell) {
            actionsCell.innerHTML = status === 'approved' ? 'Approved' : 'Rejected';
        }
    }
}

// Calendar Functions
let currentDate = new Date();

function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month header
    const monthHeader = document.getElementById('currentMonth');
    if (monthHeader) {
        monthHeader.textContent = new Date(year, month).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    }
    
    // Clear previous calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day';
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = '600';
        dayHeader.style.backgroundColor = '#f8f9fa';
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Check if this day has appointments (sample data)
        if ([15, 16, 18, 22, 25].includes(day)) {
            dayElement.classList.add('has-appointment');
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
}

// Profile Tab Functions
function initializeProfileTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Search Functions
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const table = e.target.closest('.content-section').querySelector('.table tbody');
            
            if (table) {
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            }
        });
    });
}

// Form Handlers
function handleProfileUpdate(event) {
    event.preventDefault();
    showNotification('Profile updated successfully!', 'success');
}

function handlePasswordChange(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmNewPassword');
    
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    showNotification('Password changed successfully!', 'success');
    event.target.reset();
}

function handleAvailabilityUpdate(event) {
    event.preventDefault();
    showNotification('Availability settings updated!', 'success');
}

// Mobile Navigation
function initializeMobileNav() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        display: none;
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 1001;
        background: #4CAF50;
        color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 8px;
        font-size: 1.2rem;
        cursor: pointer;
    `;
    
    document.body.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    });
    
    // Show/hide menu toggle based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in (for dashboard pages)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    // Page-specific initializations
    const currentPage = window.location.pathname.split('/').pop();
    
    // Form handlers
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', handleStudentLogin);
    }
    
    const teacherLoginForm = document.getElementById('teacherLoginForm');
    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', handleTeacherLogin);
    }
    
    const studentRegisterForm = document.getElementById('studentRegisterForm');
    if (studentRegisterForm) {
        studentRegisterForm.addEventListener('submit', handleStudentRegistration);
    }
    
    const teacherRegisterForm = document.getElementById('teacherRegisterForm');
    if (teacherRegisterForm) {
        teacherRegisterForm.addEventListener('submit', handleTeacherRegistration);
    }
    
    const bookAppointmentForm = document.getElementById('bookAppointmentForm');
    if (bookAppointmentForm) {
        bookAppointmentForm.addEventListener('submit', handleBookAppointment);
    }
    
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
    
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);
    }
    
    const availabilityForm = document.getElementById('availabilityForm');
    if (availabilityForm) {
        availabilityForm.addEventListener('submit', handleAvailabilityUpdate);
    }
    
    // Dashboard-specific initializations
    if (currentPage.includes('dashboard')) {
        initializeDashboard();
        initializeProfileTabs();
        initializeSearch();
        initializeMobileNav();
        
        if (currentPage.includes('student')) {
            loadStudentAppointments();
        }
        
        if (currentPage.includes('teacher')) {
            generateCalendar();
            loadAppointmentRequests();
        }
        
        // Set minimum date for appointment booking
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
    }
    
    // Animation triggers for landing page
    if (currentPage === 'index.html' || currentPage === '') {
        // Add scroll-triggered animations here if needed
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
        
        // Observe elements that should animate on scroll
        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });
    }
});

// Utility function for smooth scrolling
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Handle browser back/forward buttons for dashboard navigation
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.section) {
        const navLink = document.querySelector(`[data-section="${event.state.section}"]`);
        if (navLink) {
            navLink.click();
        }
    }
});

// Add loading states to buttons
function addLoadingState(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<span class="loading"></span> Loading...';
    button.disabled = true;
    
    return function removeLoadingState() {
        button.innerHTML = originalContent;
        button.disabled = false;
    };
}

// Error handling for forms
function showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error
    const error = document.createElement('div');
    error.className = 'field-error';
    error.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.25rem;';
    error.textContent = message;
    field.parentNode.appendChild(error);
    
    // Add error styling to field
    field.style.borderColor = '#e74c3c';
    
    // Remove error on input
    field.addEventListener('input', function removeError() {
        field.style.borderColor = '';
        if (error.parentNode) {
            error.remove();
        }
        field.removeEventListener('input', removeError);
    });
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Local storage helpers
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function loadFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
}

// Date and time utilities
function isValidDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
}

function formatDateTime(date, time) {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString();
}

// Export functions for global access (in a real app, you'd use modules)
window.AppointmentSystem = {
    showNotification,
    cancelAppointment,
    approveRequest,
    rejectRequest,
    previousMonth,
    nextMonth,
    generateCalendar
};

// Additional Teacher Dashboard Functions
function switchSection(myschedule) {
    const navLinks = document.querySelectorAll('.nav-link[myschedule-sectionr]');
    const sections = document.querySelectorAll('.myschedule');
    
    // Remove active class from all links and sections
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    
    // Add active class to target link and section
    const targetLink = document.querySelector(`[data-section="${sectionName}"]`);
    const targetSection = document.getElementById(`${myschedule}-section`);
    
    if (targetLink) targetLink.classList.add('active');
    if (targetSection) targetSection.classList.add('active');
}

// Enhanced approval/rejection functions with better UI feedback
function approveRequest(requestId) {
    if (confirm('Approve this appointment request?')) {
        const requestCard = document.querySelector(`[onclick="approveRequest('${requestId}')"]`).closest('.request-card');
        
        // Add loading state
        const approveBtn = requestCard.querySelector('.btn-approve');
        const originalText = approveBtn.innerHTML;
        approveBtn.innerHTML = '<span class="loading"></span> Approving...';
        approveBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            requestCard.style.transform = 'scale(0.95)';
            requestCard.style.opacity = '0.7';
            requestCard.style.borderColor = '#4CAF50';
            
            // Replace action buttons with approved status
            const actionsDiv = requestCard.querySelector('.request-actions');
            actionsDiv.innerHTML = '<div class="status-badge status-approved">✓ Approved</div>';
            
            showNotification('Appointment approved successfully!', 'success');
            
            // Update localStorage
            let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            const appointmentIndex = appointments.findIndex(apt => apt.id === requestId);
            if (appointmentIndex !== -1) {
                appointments[appointmentIndex].status = 'approved';
                localStorage.setItem('appointments', JSON.stringify(appointments));
            }
        }, 1500);
    }
}

function rejectRequest(requestId) {
    if (confirm('Reject this appointment request? This action cannot be undone.')) {
        const requestCard = document.querySelector(`[onclick="rejectRequest('${requestId}')"]`).closest('.request-card');
        
        // Add loading state
        const rejectBtn = requestCard.querySelector('.btn-reject');
        const originalText = rejectBtn.innerHTML;
        rejectBtn.innerHTML = '<span class="loading"></span> Rejecting...';
        rejectBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            requestCard.style.transform = 'scale(0.95)';
            requestCard.style.opacity = '0.7';
            requestCard.style.borderColor = '#dc3545';
            
            // Replace action buttons with rejected status
            const actionsDiv = requestCard.querySelector('.request-actions');
            actionsDiv.innerHTML = '<div class="status-badge status-rejected">✗ Rejected</div>';
            
            showNotification('Appointment request rejected.', 'info');
            
            // Update localStorage
            let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            const appointmentIndex = appointments.findIndex(apt => apt.id === requestId);
            if (appointmentIndex !== -1) {
                appointments[appointmentIndex].status = 'rejected';
                localStorage.setItem('appointments', JSON.stringify(appointments));
            }
        }, 1500);
    }
}

// Enhanced search functionality for requests
function initializeRequestSearch() {
    const searchInput = document.getElementById('requestSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const requestCards = document.querySelectorAll('.request-card');
            
            requestCards.forEach(card => {
                const studentName = card.querySelector('h3').textContent.toLowerCase();
                const subject = card.textContent.toLowerCase();
                
                if (studentName.includes(searchTerm) || subject.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Progress bar animation
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = width;
        }, 500);
    });
}

// Initialize enhanced teacher dashboard
function initializeTeacherDashboard() {
    initializeDashboard();
    initializeProfileTabs();
    initializeSearch();
    initializeRequestSearch();
    generateCalendar();
    animateProgressBars();
    
    // Auto-refresh appointment data every 30 seconds
    setInterval(() => {
        loadAppointmentRequests();
    }, 30000);
    
    // Add smooth scrolling to view buttons
    const viewButtons = document.querySelectorAll('.view-all-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                const activeSection = document.querySelector('.content-section.active');
                if (activeSection) {
                    activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    });
}

// Update the main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... keep existing code (previous initialization) the same ...
    
    // Teacher dashboard specific initialization
    if (currentPage.includes('teacher-dashboard')) {
        initializeTeacherDashboard();
    }
    
    // ... keep existing code (rest of initialization) the same ...
});

// ... keep existing code (rest of the functions) the same ...
