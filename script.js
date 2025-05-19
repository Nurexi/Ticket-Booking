document.addEventListener('DOMContentLoaded', function() {
    // Auth Toggle
    const loginTab = document.querySelector('.auth-tab[data-tab="login"]');
    const registerTab = document.querySelector('.auth-tab[data-tab="register"]');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });
    
    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });
    
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        registerTab.click();
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        loginTab.click();
    });
    
    // Password Toggle
    function setupPasswordToggle(inputId, toggleId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(toggleId);
        
        if (passwordInput && toggleIcon) {
            toggleIcon.addEventListener('click', function() {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    toggleIcon.classList.remove('fa-eye');
                    toggleIcon.classList.add('fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    toggleIcon.classList.remove('fa-eye-slash');
                    toggleIcon.classList.add('fa-eye');
                }
            });
        }
    }
    
    setupPasswordToggle('login-password', 'toggle-login-password');
    setupPasswordToggle('register-password', 'toggle-register-password');
    setupPasswordToggle('register-confirm-password', 'toggle-register-confirm-password');
    
    // Form Submission
    const loginFormEl = document.getElementById('login-form');
    const registerFormEl = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    
    if (loginFormEl) {
        loginFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Show loading spinner
            const loginBtnText = document.getElementById('login-btn-text');
            const loginSpinner = document.getElementById('login-spinner');
            loginBtnText.style.display = 'none';
            loginSpinner.style.display = 'inline-block';
            
            // Simulate API call
            setTimeout(function() {
                // Hide loading spinner
                loginBtnText.style.display = 'inline-block';
                loginSpinner.style.display = 'none';
                
                // For demo purposes, any non-empty password will work
                if (email && password) {
                    // Store user data in localStorage
                    const user = {
                        email: email,
                        name: email.split('@')[0],
                        role: 'Administrator',
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=2563eb&color=fff`
                    };
                    
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    if (rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                        localStorage.setItem('userEmail', email);
                    } else {
                        localStorage.removeItem('rememberMe');
                        localStorage.removeItem('userEmail');
                    }
                    
                    // Show success message
                    showToast("Login successful! Redirecting...", "success");
                    
                    // Switch to app view
                    document.getElementById('auth-container').style.display = 'none';
                    document.getElementById('app-container').style.display = 'flex';
                    
                    // Initialize app with user data
                    initApp(user);
                } else {
                    showToast("Please enter both email and password", "error");
                }
            }, 1500);
        });
    }
    
    if (registerFormEl) {
        registerFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('register-first-name').value;
            const lastName = document.getElementById('register-last-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const agreeTerms = document.getElementById('agree-terms').checked;
            
            // Show loading spinner
            const registerBtnText = document.getElementById('register-btn-text');
            const registerSpinner = document.getElementById('register-spinner');
            registerBtnText.style.display = 'none';
            registerSpinner.style.display = 'inline-block';
            
            // Simulate API call
            setTimeout(function() {
                // Hide loading spinner
                registerBtnText.style.display = 'inline-block';
                registerSpinner.style.display = 'none';
                
                // Validate form
                if (!firstName || !lastName || !email || !password || !confirmPassword) {
                    showToast("Please fill in all fields", "error");
                    return;
                }
                
                if (password !== confirmPassword) {
                    showToast("Passwords do not match", "error");
                    return;
                }
                
                if (!agreeTerms) {
                    showToast("You must agree to the terms and conditions", "error");
                    return;
                }
                
                // For demo purposes, just show success and switch to login
                showToast("Registration successful! Please login.", "success");
                
                // Switch to login form
                loginTab.click();
                
                // Pre-fill email
                document.getElementById('login-email').value = email;
            }, 1500);
        });
    }
    
    // Forgot Password
    const forgotPasswordLink = document.getElementById('forgot-password');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    
    if (forgotPasswordLink && forgotPasswordModal) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(forgotPasswordModal);
        });
    }
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('reset-email').value;
            
            // Simulate API call
            setTimeout(function() {
                closeModal(forgotPasswordModal);
                showToast("Password reset link sent to your email", "success");
            }, 1000);
        });
    }
    
    // Modal Functions
    function openModal(modal) {
        document.getElementById('modal-overlay').style.display = 'block';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        document.getElementById('modal-overlay').style.display = 'none';
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close modal when clicking overlay or close button
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            closeModal();
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    }
    
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Toast Notification
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Initialize app if user is already logged in
    function checkLoggedIn() {
        const currentUser = localStorage.getItem('currentUser');
        const rememberMe = localStorage.getItem('rememberMe');
        
        if (currentUser && rememberMe) {
            const user = JSON.parse(currentUser);
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('app-container').style.display = 'flex';
            initApp(user);
            
            // Pre-fill email in login form if remember me was checked
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                document.getElementById('login-email').value = userEmail;
                document.getElementById('remember-me').checked = true;
            }
        }
    }
    
    // Initialize the application
    function initApp(user) {
        // Set user info in sidebar
        document.getElementById('username-display').textContent = user.name;
        document.getElementById('user-role').textContent = user.role;
        document.getElementById('user-avatar').src = user.avatar;
        
        // Set welcome name
        document.getElementById('welcome-name').textContent = user.name;
        
        // Set current date
        const currentDate = new Date();
        document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Set up logout
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            document.getElementById('app-container').style.display = 'none';
            document.getElementById('auth-container').style.display = 'flex';
            
            showToast("Logged out successfully", "success");
        });
        
        // Mobile menu toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('active');
        });
        
        // Navigation
        const navItems = document.querySelectorAll('.sidebar-nav li');
        const contentSections = document.querySelectorAll('.content-section');
        
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                navItems.forEach(navItem => navItem.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Hide all content sections
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Show the selected section
                const sectionId = this.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
                
                // Update page title
                document.getElementById('page-title').textContent = this.textContent.trim();
                
                // Close sidebar on mobile
                document.getElementById('sidebar').classList.remove('active');
                
                // Show section-specific toast
                showToast(`${this.textContent.trim()} section loaded`, "info");
            });
        });
        
        // Dark mode toggle
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved user preference or use system preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                showToast("Dark mode enabled", "info");
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                showToast("Light mode enabled", "info");
            }
        });
        
        // Language selector
        document.getElementById('language-select').addEventListener('change', function() {
            // In a real app, this would change the language of the interface
            showToast(`Language changed to ${this.value.toUpperCase()}`, "info");
        });
        
        // Notifications
        document.getElementById('notifications-btn').addEventListener('click', function() {
            openModal(document.getElementById('notifications-modal'));
        });
        
        document.getElementById('mark-all-read').addEventListener('click', function() {
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => item.classList.remove('unread'));
            document.getElementById('notification-count').textContent = '0';
            closeModal(document.getElementById('notifications-modal'));
            
            showToast("All notifications marked as read", "success");
        });
        
        // Initialize charts
        initCharts();
        
        // Initialize sample data
        initSampleData();
        
        // Set up dashboard interactions
        setupDashboardInteractions();
        
        // Set up flights section
        setupFlightsSection();
        
        // Set up bookings section
        setupBookingsSection();
        
        // Set up passengers section
        setupPassengersSection();
        
        // Set up schedule section
        setupScheduleSection();
        
        // Set up reports section
        setupReportsSection();
        
        // Global search
        document.getElementById('global-search').addEventListener('input', function() {
            if (this.value.length > 2) {
                showToast(`Searching for: ${this.value}`, "info");
            }
        });
        
        // Make all sections respond to clicks
        makeAllSectionsInteractive();
    }
    
    function initCharts() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded');
            return;
        }
        
        // Set Chart.js defaults
        Chart.defaults.color = '#6b7280';
        Chart.defaults.font.family = "'Poppins', sans-serif";
        
        // Bookings Chart
        const bookingsCtx = document.getElementById('bookingsChart')?.getContext('2d');
        if (bookingsCtx) {
            const bookingsChart = new Chart(bookingsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Bookings',
                        data: [120, 190, 170, 220, 250, 300],
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderColor: 'rgba(37, 99, 235, 1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
            
            // Chart period buttons
            const periodBtns = document.querySelectorAll('.period-btn');
            periodBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    periodBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    const period = this.getAttribute('data-period');
                    let data = [];
                    let labels = [];
                    
                    switch(period) {
                        case 'week':
                            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                            data = [42, 38, 55, 48, 65, 80, 95];
                            break;
                        case 'month':
                            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                            data = [180, 220, 260, 310];
                            break;
                        case 'year':
                            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            data = [120, 190, 170, 220, 250, 300, 280, 320, 290, 350, 380, 420];
                            break;
                    }
                    
                    bookingsChart.data.labels = labels;
                    bookingsChart.data.datasets[0].data = data;
                    bookingsChart.update();
                    
                    showToast(`Showing ${period} data`, "info");
                });
            });
        }
        
        // Occupancy Chart
        const occupancyCtx = document.getElementById('occupancyChart')?.getContext('2d');
        if (occupancyCtx) {
            const occupancyChart = new Chart(occupancyCtx, {
                type: 'bar',
                data: {
                    labels: ['JFK-LAX', 'LHR-CDG', 'DXB-SIN', 'HND-ICN', 'SYD-MEL'],
                    datasets: [{
                        label: 'Occupancy Rate',
                        data: [85, 72, 90, 68, 78],
                        backgroundColor: 'rgba(37, 99, 235, 0.7)',
                        borderColor: 'rgba(37, 99, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
        
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart')?.getContext('2d');
        if (revenueCtx) {
            const revenueChart = new Chart(revenueCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Business', 'Economy', 'First'],
                    datasets: [{
                        data: [35, 50, 15],
                        backgroundColor: [
                            'rgba(37, 99, 235, 0.7)',
                            'rgba(16, 185, 129, 0.7)',
                            'rgba(245, 158, 11, 0.7)'
                        ],
                        borderColor: [
                            'rgba(37, 99, 235, 1)',
                            'rgba(16, 185, 129, 1)',
                            'rgba(245, 158, 11, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    }
                }
            });
        }
        
        // Demographics Chart
        const demographicsCtx = document.getElementById('demographicsChart')?.getContext('2d');
        if (demographicsCtx) {
            const demographicsChart = new Chart(demographicsCtx, {
                type: 'pie',
                data: {
                    labels: ['Male', 'Female', 'Other'],
                    datasets: [{
                        data: [55, 42, 3],
                        backgroundColor: [
                            'rgba(37, 99, 235, 0.7)',
                            'rgba(236, 72, 153, 0.7)',
                            'rgba(107, 114, 128, 0.7)'
                        ],
                        borderColor: [
                            'rgba(37, 99, 235, 1)',
                            'rgba(236, 72, 153, 1)',
                            'rgba(107, 114, 128, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    }
                }
            });
        }
        
        // Booking Trends Chart
        const bookingTrendsCtx = document.getElementById('bookingTrendsChart')?.getContext('2d');
        if (bookingTrendsCtx) {
            const bookingTrendsChart = new Chart(bookingTrendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'This Year',
                        data: [120, 190, 170, 220, 250, 300],
                        borderColor: 'rgba(37, 99, 235, 1)',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }, {
                        label: 'Last Year',
                        data: [100, 170, 150, 190, 220, 270],
                        borderColor: 'rgba(107, 114, 128, 1)',
                        backgroundColor: 'rgba(107, 114, 128, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        
        // Revenue By Class Chart
        const revenueByClassCtx = document.getElementById('revenueByClassChart')?.getContext('2d');
        if (revenueByClassCtx) {
            const revenueByClassChart = new Chart(revenueByClassCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Economy',
                        data: [65000, 75000, 82000, 87000, 92000, 98000],
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Business',
                        data: [45000, 52000, 55000, 60000, 67000, 72000],
                        backgroundColor: 'rgba(37, 99, 235, 0.7)',
                        borderColor: 'rgba(37, 99, 235, 1)',
                        borderWidth: 1
                    }, {
                        label: 'First',
                        data: [25000, 28000, 30000, 32000, 35000, 38000],
                        backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        borderColor: 'rgba(245, 158, 11, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                        x: {
                            stacked: true
                        }
                    }
                }
            });
        }
    }
    
    function initSampleData() {
        // Set stats numbers
        document.getElementById('total-flights').textContent = '142';
        document.getElementById('today-bookings').textContent = '28';
        document.getElementById('total-passengers').textContent = '1,842';
        document.getElementById('delayed-flights').textContent = '3';
        
        // Recent bookings table
        const recentBookings = [
            { id: 'BK-1001', passenger: 'John Smith', flight: 'SW123 (JFK-LAX)', departure: '2023-05-15 08:00', seat: '12A', status: 'Confirmed', actions: true },
            { id: 'BK-1002', passenger: 'Emma Johnson', flight: 'SW456 (LHR-CDG)', departure: '2023-05-15 10:30', seat: '8B', status: 'Confirmed', actions: true },
            { id: 'BK-1003', passenger: 'Michael Brown', flight: 'SW789 (DXB-SIN)', departure: '2023-05-16 14:15', seat: '3C', status: 'Pending', actions: true },
            { id: 'BK-1004', passenger: 'Sarah Wilson', flight: 'SW234 (HND-ICN)', departure: '2023-05-16', seat: '7D', status: 'Confirmed', actions: true }
        ];
        
        const tableBody = document.getElementById('recent-bookings-table');
        if (tableBody) {
            tableBody.innerHTML = '';
            
            recentBookings.forEach(booking => {
                const row = document.createElement('tr');
                row.className = 'clickable-row';
                row.setAttribute('data-booking', booking.id);
                
                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.passenger}</td>
                    <td>${booking.flight}</td>
                    <td>${booking.departure}</td>
                    <td>${booking.seat}</td>
                    <td><span class="status status-${booking.status.toLowerCase()}">${booking.status}</span></td>
                    <td>
                        <div class="action-icon-group">
                            <span class="action-icon view" data-tooltip="View" onclick="viewBooking('${booking.id}')">
                                <i class="fas fa-eye"></i>
                            </span>
                            <span class="action-icon edit" data-tooltip="Edit" onclick="editBooking('${booking.id}')">
                                <i class="fas fa-edit"></i>
                            </span>
                            <span class="action-icon delete" data-tooltip="Delete" onclick="deleteBooking('${booking.id}')">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </div>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
            
            // Add click event to booking rows
            const bookingRows = document.querySelectorAll('.clickable-row[data-booking]');
            bookingRows.forEach(row => {
                row.addEventListener('click', function(e) {
                    if (!e.target.closest('.action-icon')) {
                        const bookingId = this.getAttribute('data-booking');
                        viewBooking(bookingId);
                    }
                });
            });
        }
        
        // Upcoming flights list
        const upcomingFlights = [
            { id: 'SW123', route: 'JFK → LAX', departure: '08:00 AM', arrival: '11:30 AM', status: 'On Time' },
            { id: 'SW456', route: 'LHR → CDG', departure: '10:30 AM', arrival: '12:00 PM', status: 'Boarding' },
            { id: 'SW789', route: 'DXB → SIN', departure: '02:15 PM', arrival: '08:45 PM', status: 'Delayed' }
        ];
        
        const flightsList = document.getElementById('flights-list');
        if (flightsList) {
            flightsList.innerHTML = '';
            
            upcomingFlights.forEach(flight => {
                const item = document.createElement('div');
                item.className = 'flight-item';
                item.setAttribute('data-flight', flight.id);
                
                let statusClass = 'status-confirmed';
                if (flight.status === 'Delayed') statusClass = 'status-pending';
                if (flight.status === 'Cancelled') statusClass = 'status-cancelled';
                
                item.innerHTML = `
                    <div class="flight-icon">
                        <i class="fas fa-plane"></i>
                    </div>
                    <div class="flight-info">
                        <div class="flight-route">${flight.route} (${flight.id})</div>
                        <div class="flight-time">Departure: ${flight.departure} | Arrival: ${flight.arrival}</div>
                    </div>
                    <div class="flight-status ${statusClass}">${flight.status}</div>
                `;
                
                flightsList.appendChild(item);
            });
            
            // Add click event to flight items
            const flightItems = document.querySelectorAll('.flight-item');
            flightItems.forEach(item => {
                item.addEventListener('click', function() {
                    const flightId = this.getAttribute('data-flight');
                    viewFlight(flightId);
                });
            });
        }
        
        // Notifications list
        const notifications = [
            { type: 'info', message: 'New flight SW123 added to schedule', time: '5 mins ago' },
            { type: 'warning', message: 'Flight SW456 delayed due to weather', time: '12 mins ago' },
            { type: 'success', message: 'Booking BK-1001 confirmed', time: '30 mins ago' },
            { type: 'error', message: 'System maintenance scheduled for tomorrow', time: '1 hour ago' }
        ];
        
        const notificationsList = document.getElementById('notifications-list');
        if (notificationsList) {
            notificationsList.innerHTML = '';
            
            let unreadCount = 0;
            notifications.forEach(notification => {
                const item = document.createElement('li');
                item.className = 'notification-item unread';
                item.innerHTML = `
                    <div class="notification-icon"><i class="fa fa-circle text-${notification.type}"></i></div>
                    <div class="notification-content">
                        <p>${notification.message}</p>
                        <small>${notification.time}</small>
                    </div>
                `;
                notificationsList.appendChild(item);
                unreadCount++;
                
                // Add click event to mark notification as read
                item.addEventListener('click', function() {
                    if (this.classList.contains('unread')) {
                        this.classList.remove('unread');
                        document.getElementById('notification-count').textContent = 
                            parseInt(document.getElementById('notification-count').textContent) - 1;
                        showToast("Notification marked as read", "success");
                    }
                });
            });
            
            document.getElementById('notification-count').textContent = unreadCount;
        }
        
        // Flights table
        const flights = [
            { id: 'SW123', route: 'JFK → LAX', departure: '2023-05-15 08:00', arrival: '2023-05-15 11:30', aircraft: 'Boeing 737-800', seats: '189/189', status: 'Scheduled' },
            { id: 'SW456', route: 'LHR → CDG', departure: '2023-05-15 10:30', arrival: '2023-05-15 12:00', aircraft: 'Airbus A320', seats: '142/150', status: 'Boarding' },
            { id: 'SW789', route: 'DXB → SIN', departure: '2023-05-16 14:15', arrival: '2023-05-16 20:45', aircraft: 'Boeing 787-9', seats: '256/290', status: 'Delayed' },
            { id: 'SW234', route: 'HND → ICN', departure: '2023-05-16 09:00', arrival: '2023-05-16 11:30', aircraft: 'Airbus A350', seats: '280/300', status: 'Scheduled' }
        ];
        
        const flightsTable = document.getElementById('flights-table');
        if (flightsTable) {
            flightsTable.innerHTML = '';
            
            flights.forEach(flight => {
                const row = document.createElement('tr');
                row.className = 'clickable-row';
                row.setAttribute('data-flight', flight.id);
                
                let statusClass = 'status-confirmed';
                if (flight.status === 'Delayed') statusClass = 'status-pending';
                if (flight.status === 'Cancelled') statusClass = 'status-cancelled';
                if (flight.status === 'Boarding') statusClass = 'status-active';
                
                row.innerHTML = `
                    <td>${flight.id}</td>
                    <td>${flight.route}</td>
                    <td>${flight.departure}</td>
                    <td>${flight.arrival}</td>
                    <td>${flight.aircraft}</td>
                    <td>${flight.seats}</td>
                    <td><span class="status ${statusClass}">${flight.status}</span></td>
                    <td>
                        <div class="action-icon-group">
                            <span class="action-icon view" data-tooltip="View" onclick="viewFlight('${flight.id}')">
                                <i class="fas fa-eye"></i>
                            </span>
                            <span class="action-icon edit" data-tooltip="Edit" onclick="editFlight('${flight.id}')">
                                <i class="fas fa-edit"></i>
                            </span>
                            <span class="action-icon delete" data-tooltip="Delete" onclick="deleteFlight('${flight.id}')">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </div>
                    </td>
                `;
                
                flightsTable.appendChild(row);
            });
            
            // Add click events to flight rows
            const flightRows = document.querySelectorAll('.clickable-row[data-flight]');
            flightRows.forEach(row => {
                row.addEventListener('click', function(e) {
                    if (!e.target.closest('.action-icon')) {
                        const flightId = this.getAttribute('data-flight');
                        viewFlight(flightId);
                    }
                });
            });
        }
        
        // Bookings table
        const bookings = [
            { id: 'BK-1001', passenger: 'John Smith', flight: 'SW123 (JFK-LAX)', departure: '2023-05-15 08:00', seat: '12A', class: 'Economy', status: 'Confirmed' },
            { id: 'BK-1002', passenger: 'Emma Johnson', flight: 'SW456 (LHR-CDG)', departure: '2023-05-15 10:30', seat: '8B', class: 'Business', status: 'Confirmed' },
            { id: 'BK-1003', passenger: 'Michael Brown', flight: 'SW789 (DXB-SIN)', departure: '2023-05-16 14:15', seat: '3C', class: 'First', status: 'Pending' },
            { id: 'BK-1004', passenger: 'Sarah Wilson', flight: 'SW234 (HND-ICN)', departure: '2023-05-16 09:00', seat: '7D', class: 'Economy', status: 'Confirmed' },
            { id: 'BK-1005', passenger: 'David Lee', flight: 'SW567 (SYD-MEL)', departure: '2023-05-17 11:45', seat: '15F', class: 'Economy', status: 'Cancelled' }
        ];
        
        const bookingsTable = document.getElementById('bookings-table');
        if (bookingsTable) {
            bookingsTable.innerHTML = '';
            
            bookings.forEach(booking => {
                const row = document.createElement('tr');
                row.className = 'clickable-row';
                row.setAttribute('data-booking', booking.id);
                
                let statusClass = 'status-confirmed';
                if (booking.status === 'Pending') statusClass = 'status-pending';
                if (booking.status === 'Cancelled') statusClass = 'status-cancelled';
                
                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.passenger}</td>
                    <td>${booking.flight}</td>
                    <td>${booking.departure}</td>
                    <td>${booking.seat}</td>
                    <td>${booking.class}</td>
                    <td><span class="status ${statusClass}">${booking.status}</span></td>
                    <td>
                        <div class="action-icon-group">
                            <span class="action-icon view" data-tooltip="View" onclick="viewBooking('${booking.id}')">
                                <i class="fas fa-eye"></i>
                            </span>
                            <span class="action-icon edit" data-tooltip="Edit" onclick="editBooking('${booking.id}')">
                                <i class="fas fa-edit"></i>
                            </span>
                            <span class="action-icon delete" data-tooltip="Delete" onclick="deleteBooking('${booking.id}')">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </div>
                    </td>
                `;
                
                bookingsTable.appendChild(row);
            });
            
            // Add click events to booking rows
            const bookingRows = document.querySelectorAll('#bookings-table .clickable-row[data-booking]');
            bookingRows.forEach(row => {
                row.addEventListener('click', function(e) {
                    if (!e.target.closest('.action-icon')) {
                        const bookingId = this.getAttribute('data-booking');
                        viewBooking(bookingId);
                    }
                });
            });
        }
        
        // Passengers table
        const passengers = [
            { id: 'P-1001', name: 'John Smith', passport: 'US123456', nationality: 'USA', contact: 'john@example.com', miles: '12,500', status: 'Gold' },
            { id: 'P-1002', name: 'Emma Johnson', passport: 'UK789012', nationality: 'UK', contact: 'emma@example.com', miles: '8,200', status: 'Silver' },
            { id: 'P-1003', name: 'Michael Brown', passport: 'AU345678', nationality: 'Australia', contact: 'michael@example.com', miles: '5,800', status: 'Bronze' },
            { id: 'P-1004', name: 'Sarah Wilson', passport: 'JP901234', nationality: 'Japan', contact: 'sarah@example.com', miles: '3,200', status: 'Regular' },
            { id: 'P-1005', name: 'David Lee', passport: 'SG567890', nationality: 'Singapore', contact: 'david@example.com', miles: '15,700', status: 'Gold' }
        ];
        
        const passengersTable = document.getElementById('passengers-table');
        if (passengersTable) {
            passengersTable.innerHTML = '';
            
            passengers.forEach(passenger => {
                const row = document.createElement('tr');
                row.className = 'clickable-row';
                row.setAttribute('data-passenger', passenger.id);
                
                let statusClass = 'status-confirmed';
                if (passenger.status === 'Gold') statusClass = 'status-confirmed';
                if (passenger.status === 'Silver') statusClass = 'status-active';
                if (passenger.status === 'Bronze') statusClass = 'status-pending';
                if (passenger.status === 'Regular') statusClass = 'status-inactive';
                
                row.innerHTML = `
                    <td>${passenger.id}</td>
                    <td>${passenger.name}</td>
                    <td>${passenger.passport}</td>
                    <td>${passenger.nationality}</td>
                    <td>${passenger.contact}</td>
                    <td>${passenger.miles}</td>
                    <td><span class="status ${statusClass}">${passenger.status}</span></td>
                    <td>
                        <div class="action-icon-group">
                            <span class="action-icon view" data-tooltip="View" onclick="viewPassenger('${passenger.id}')">
                                <i class="fas fa-eye"></i>
                            </span>
                            <span class="action-icon edit" data-tooltip="Edit" onclick="editPassenger('${passenger.id}')">
                                <i class="fas fa-edit"></i>
                            </span>
                            <span class="action-icon delete" data-tooltip="Delete" onclick="deletePassenger('${passenger.id}')">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </div>
                    </td>
                `;
                
                passengersTable.appendChild(row);
            });
            
            // Add click events to passenger rows
            const passengerRows = document.querySelectorAll('.clickable-row[data-passenger]');
            passengerRows.forEach(row => {
                row.addEventListener('click', function(e) {
                    if (!e.target.closest('.action-icon')) {
                        const passengerId = this.getAttribute('data-passenger');
                        viewPassenger(passengerId);
                    }
                });
            });
        }
        
        // Schedule body
        const scheduleBody = document.getElementById('schedule-body');
        if (scheduleBody) {
            scheduleBody.innerHTML = '';
            
            const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            
            // Create time slots
            times.forEach(time => {
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                timeSlot.textContent = time;
                scheduleBody.appendChild(timeSlot);
                
                // Create day slots for each time
                days.forEach(day => {
                    const daySlot = document.createElement('div');
                    daySlot.className = 'day-slot';
                    
                    // Randomly add flight events to some slots
                    if (Math.random() > 0.6) {
                        const flightEvent = document.createElement('div');
                        flightEvent.className = 'flight-event';
                        
                        const flightId = `SW${Math.floor(Math.random() * 900) + 100}`;
                        const routes = ['JFK → LAX', 'LHR → CDG', 'DXB → SIN', 'HND → ICN', 'SYD → MEL'];
                        const route = routes[Math.floor(Math.random() * routes.length)];
                        
                        flightEvent.innerHTML = `
                            <div class="flight-number">${flightId}</div>
                            <div class="flight-route">${route}</div>
                        `;
                        
                        flightEvent.addEventListener('click', function() {
                            viewFlight(flightId);
                        });
                        
                        daySlot.appendChild(flightEvent);
                    }
                    
                    scheduleBody.appendChild(daySlot);
                });
            });
        }
    }
    
    function setupDashboardInteractions() {
        // Dashboard refresh button
        const refreshDashboard = document.getElementById('refresh-dashboard');
        if (refreshDashboard) {
            refreshDashboard.addEventListener('click', function() {
                showToast("Dashboard data refreshed", "success");
            });
        }
        
        // Stat cards
        const statCards = document.querySelectorAll('.stat-card.clickable');
        statCards.forEach(card => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('id');
                let section = '';
                
                switch(id) {
                    case 'flights-stat':
                        section = 'flights';
                        break;
                    case 'bookings-stat':
                        section = 'bookings';
                        break;
                    case 'passengers-stat':
                        section = 'passengers';
                        break;
                    case 'delayed-stat':
                        section = 'schedule';
                        break;
                }
                
                if (section) {
                    // Navigate to the section
                    document.querySelector(`.sidebar-nav li[data-section="${section}"]`).click();
                    showToast(`Navigated to ${section} section`, "info");
                }
            });
        });
        
        // Quick action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('id');
                
                switch(id) {
                    case 'new-flight-btn':
                        openModal(document.getElementById('add-flight-modal'));
                        showToast("Add new flight form opened", "info");
                        break;
                    case 'new-booking-btn':
                        openModal(document.getElementById('add-booking-modal'));
                        showToast("Add new booking form opened", "info");
                        break;
                    case 'add-passenger-btn':
                        openModal(document.getElementById('add-passenger-modal'));
                        showToast("Add new passenger form opened", "info");
                        break;
                    case 'generate-report-btn':
                        document.querySelector(`.sidebar-nav li[data-section="reports"]`).click();
                        showToast("Navigated to reports section", "info");
                        break;
                }
            });
        });
        
        // View all links
        document.getElementById('view-all-bookings')?.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(`.sidebar-nav li[data-section="bookings"]`).click();
        });
        
        document.getElementById('view-all-flights')?.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(`.sidebar-nav li[data-section="flights"]`).click();
        });
        
        // Refresh buttons
        document.getElementById('refresh-bookings')?.addEventListener('click', function() {
            showToast("Bookings refreshed", "success");
        });
        
        document.getElementById('refresh-flights')?.addEventListener('click', function() {
            showToast("Flights refreshed", "success");
        });
        
        // Filter buttons
        document.getElementById('filter-bookings')?.addEventListener('click', function() {
            showToast("Booking filters applied", "info");
        });
        
        document.getElementById('filter-flights')?.addEventListener('click', function() {
            showToast("Flight filters applied", "info");
        });
    }
    
    function setupFlightsSection() {
        // Add flight button
        document.getElementById('add-flight-btn-2')?.addEventListener('click', function() {
            openModal(document.getElementById('add-flight-modal'));
        });
        
        // Flight search and filter
        document.getElementById('flight-search')?.addEventListener('input', function() {
            if (this.value.length > 2) {
                showToast(`Searching flights for: ${this.value}`, "info");
            }
        });
        
        document.getElementById('flight-filter')?.addEventListener('change', function() {
            showToast(`Filtered flights by: ${this.options[this.selectedIndex].text}`, "info");
        });
        
        document.getElementById('advanced-flight-filter')?.addEventListener('click', function() {
            showToast("Advanced flight filters opened", "info");
        });
        
        // Pagination
        document.getElementById('prev-flight-page')?.addEventListener('click', function() {
            showToast("Previous page", "info");
        });
        
        document.getElementById('next-flight-page')?.addEventListener('click', function() {
            showToast("Next page", "info");
        });
        
        // Flight form submission
        const flightForm = document.getElementById('flight-form');
        if (flightForm) {
            flightForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const flightNumber = document.getElementById('flight-number').value;
                const aircraft = document.getElementById('aircraft').value;
                const departureAirport = document.getElementById('departure-airport').value;
                const arrivalAirport = document.getElementById('arrival-airport').value;
                const departureTime = document.getElementById('departure-time').value;
                const arrivalTime = document.getElementById('arrival-time').value;
                const status = document.getElementById('flight-status').value;
                
                // Create new flight object
                const newFlight = {
                    id: flightNumber,
                    route: `${departureAirport} → ${arrivalAirport}`,
                    departure: departureTime,
                    arrival: arrivalTime,
                    aircraft: document.getElementById('aircraft').options[document.getElementById('aircraft').selectedIndex].text,
                    seats: '0/0',
                    status: document.getElementById('flight-status').options[document.getElementById('flight-status').selectedIndex].text
                };
                
                // Add to flights table
                const flightsTable = document.getElementById('flights-table');
                if (flightsTable) {
                    const row = document.createElement('tr');
                    row.className = 'clickable-row';
                    row.setAttribute('data-flight', newFlight.id);
                    
                    let statusClass = 'status-confirmed';
                    if (newFlight.status === 'Delayed') statusClass = 'status-pending';
                    if (newFlight.status === 'Cancelled') statusClass = 'status-cancelled';
                    if (newFlight.status === 'Boarding') statusClass = 'status-active';
                    
                    row.innerHTML = `
                        <td>${newFlight.id}</td>
                        <td>${newFlight.route}</td>
                        <td>${newFlight.departure}</td>
                        <td>${newFlight.arrival}</td>
                        <td>${newFlight.aircraft}</td>
                        <td>${newFlight.seats}</td>
                        <td><span class="status ${statusClass}">${newFlight.status}</span></td>
                        <td>
                            <div class="action-icon-group">
                                <span class="action-icon view" data-tooltip="View" onclick="viewFlight('${newFlight.id}')">
                                    <i class="fas fa-eye"></i>
                                </span>
                                <span class="action-icon edit" data-tooltip="Edit" onclick="editFlight('${newFlight.id}')">
                                    <i class="fas fa-edit"></i>
                                </span>
                                <span class="action-icon delete" data-tooltip="Delete" onclick="deleteFlight('${newFlight.id}')">
                                    <i class="fas fa-trash-alt"></i>
                                </span>
                            </div>
                        </td>
                    `;
                    
                    flightsTable.appendChild(row);
                    
                    // Add click event to the new row
                    row.addEventListener('click', function(e) {
                        if (!e.target.closest('.action-icon')) {
                            const flightId = this.getAttribute('data-flight');
                            viewFlight(flightId);
                        }
                    });
                }
                
                closeModal(document.getElementById('add-flight-modal'));
                showToast("Flight added successfully", "success");
                
                // Reset form
                flightForm.reset();
            });
        }
    }
    
    function setupBookingsSection() {
        // Add booking button
        document.getElementById('add-booking-btn-2')?.addEventListener('click', function() {
            openModal(document.getElementById('add-booking-modal'));
            
            // Populate passenger dropdown
            const passengerSelect = document.getElementById('booking-passenger');
            if (passengerSelect) {
                passengerSelect.innerHTML = '<option value="">Select Passenger</option>';
                
                const passengers = [
                    { id: 'P-1001', name: 'John Smith' },
                    { id: 'P-1002', name: 'Emma Johnson' },
                    { id: 'P-1003', name: 'Michael Brown' },
                    { id: 'P-1004', name: 'Sarah Wilson' },
                    { id: 'P-1005', name: 'David Lee' }
                ];
                
                passengers.forEach(passenger => {
                    const option = document.createElement('option');
                    option.value = passenger.id;
                    option.textContent = `${passenger.name} (${passenger.id})`;
                    passengerSelect.appendChild(option);
                });
            }
            
            // Populate flight dropdown
            const flightSelect = document.getElementById('booking-flight');
            if (flightSelect) {
                flightSelect.innerHTML = '<option value="">Select Flight</option>';
                
                const flights = [
                    { id: 'SW123', route: 'JFK → LAX' },
                    { id: 'SW456', route: 'LHR → CDG' },
                    { id: 'SW789', route: 'DXB → SIN' },
                    { id: 'SW234', route: 'HND → ICN' }
                ];
                
                flights.forEach(flight => {
                    const option = document.createElement('option');
                    option.value = flight.id;
                    option.textContent = `${flight.id} (${flight.route})`;
                    flightSelect.appendChild(option);
                });
            }
        });
        
        // Booking search and filter
        document.getElementById('booking-search')?.addEventListener('input', function() {
            if (this.value.length > 2) {
                showToast(`Searching bookings for: ${this.value}`, "info");
            }
        });
        
        document.getElementById('booking-filter')?.addEventListener('change', function() {
            showToast(`Filtered bookings by: ${this.options[this.selectedIndex].text}`, "info");
        });
        
        document.getElementById('advanced-booking-filter')?.addEventListener('click', function() {
            showToast("Advanced booking filters opened", "info");
        });
        
        // Pagination
        document.getElementById('prev-booking-page')?.addEventListener('click', function() {
            showToast("Previous page", "info");
        });
        
        document.getElementById('next-booking-page')?.addEventListener('click', function() {
            showToast("Next page", "info");
        });
        
        // Booking form submission
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const passenger = document.getElementById('booking-passenger').options[document.getElementById('booking-passenger').selectedIndex].text;
                const flight = document.getElementById('booking-flight').options[document.getElementById('booking-flight').selectedIndex].text;
                const seat = document.getElementById('booking-seat').value;
                const bookingClass = document.getElementById('booking-class').options[document.getElementById('booking-class').selectedIndex].text;
                const price = document.getElementById('booking-price').value;
                const status = document.getElementById('booking-status').options[document.getElementById('booking-status').selectedIndex].text;
                
                // Generate booking ID
                const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
                
                // Create new booking object
                const newBooking = {
                    id: bookingId,
                    passenger: passenger.split(' (')[0],
                    flight: flight,
                    departure: '2023-05-20 10:00',
                    seat: seat,
                    class: bookingClass,
                    status: status
                };
                
                // Add to bookings table
                const bookingsTable = document.getElementById('bookings-table');
                if (bookingsTable) {
                    const row = document.createElement('tr');
                    row.className = 'clickable-row';
                    row.setAttribute('data-booking', newBooking.id);
                    
                    let statusClass = 'status-confirmed';
                    if (newBooking.status === 'Pending') statusClass = 'status-pending';
                    if (newBooking.status === 'Cancelled') statusClass = 'status-cancelled';
                    
                    row.innerHTML = `
                        <td>${newBooking.id}</td>
                        <td>${newBooking.passenger}</td>
                        <td>${newBooking.flight}</td>
                        <td>${newBooking.departure}</td>
                        <td>${newBooking.seat}</td>
                        <td>${newBooking.class}</td>
                        <td><span class="status ${statusClass}">${newBooking.status}</span></td>
                        <td>
                            <div class="action-icon-group">
                                <span class="action-icon view" data-tooltip="View" onclick="viewBooking('${newBooking.id}')">
                                    <i class="fas fa-eye"></i>
                                </span>
                                <span class="action-icon edit" data-tooltip="Edit" onclick="editBooking('${newBooking.id}')">
                                    <i class="fas fa-edit"></i>
                                </span>
                                <span class="action-icon delete" data-tooltip="Delete" onclick="deleteBooking('${newBooking.id}')">
                                    <i class="fas fa-trash-alt"></i>
                                </span>
                            </div>
                        </td>
                    `;
                    
                    bookingsTable.appendChild(row);
                    
                    // Add click event to the new row
                    row.addEventListener('click', function(e) {
                        if (!e.target.closest('.action-icon')) {
                            const bookingId = this.getAttribute('data-booking');
                            viewBooking(bookingId);
                        }
                    });
                }
                
                closeModal(document.getElementById('add-booking-modal'));
                showToast("Booking added successfully", "success");
                
                // Reset form
                bookingForm.reset();
            });
        }
        
        // Seat selection
        document.getElementById('select-seat-btn')?.addEventListener('click', function() {
            openModal(document.getElementById('seat-selection-modal'));
        });
        
        // Seat map
        const seatMap = document.getElementById('seat-map-body');
        if (seatMap) {
            // Create seat map
            seatMap.innerHTML = '';
            
            // Create 6 rows with 6 seats each
            for (let i = 1; i <= 6; i++) {
                for (let j = 0; j < 6; j++) {
                    const seat = document.createElement('div');
                    seat.className = 'seat';
                    
                    // Add seat number (A, B, C, D, E, F)
                    const seatLetter = String.fromCharCode(65 + j);
                    const seatNumber = `${i}${seatLetter}`;
                    seat.textContent = seatNumber;
                    
                    // Randomly mark some seats as occupied
                    if (Math.random() > 0.7) {
                        seat.classList.add('occupied');
                    }
                    
                    // Add class based on position
                    if (i <= 2) {
                        seat.classList.add('first-class');
                    } else if (i <= 4) {
                        seat.classList.add('business-class');
                    }
                    
                    // Add click event
                    seat.addEventListener('click', function() {
                        if (!this.classList.contains('occupied')) {
                            const selectedSeats = document.querySelectorAll('.seat.selected');
                            selectedSeats.forEach(s => s.classList.remove('selected'));
                            this.classList.add('selected');
                            document.getElementById('booking-seat').value = this.textContent;
                        }
                    });
                    
                    seatMap.appendChild(seat);
                }
            }
        }
        
        // Confirm seat selection
        document.getElementById('confirm-seat')?.addEventListener('click', function() {
            const selectedSeat = document.querySelector('.seat.selected');
            if (selectedSeat) {
                document.getElementById('booking-seat').value = selectedSeat.textContent;
                closeModal(document.getElementById('seat-selection-modal'));
                showToast(`Seat ${selectedSeat.textContent} selected`, "success");
            } else {
                showToast("Please select a seat", "error");
            }
        });
        
        // Seat class filter
        document.querySelectorAll('.seat-class-filter button').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.seat-class-filter button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const seatClass = this.getAttribute('data-class');
                const seats = document.querySelectorAll('.seat');
                
                if (seatClass === 'all') {
                    seats.forEach(seat => seat.style.display = 'flex');
                } else {
                    seats.forEach(seat => {
                        if (seat.classList.contains(`${seatClass}-class`)) {
                            seat.style.display = 'flex';
                        } else {
                            seat.style.display = 'none';
                        }
                    });
                }
                
                showToast(`Showing ${seatClass} class seats`, "info");
            });
        });
    }
    
    function setupPassengersSection() {
        // Add passenger button
        document.getElementById('add-passenger-btn-2')?.addEventListener('click', function() {
            openModal(document.getElementById('add-passenger-modal'));
        });
        
        // Passenger search and filter
        document.getElementById('passenger-search')?.addEventListener('input', function() {
            if (this.value.length > 2) {
                showToast(`Searching passengers for: ${this.value}`, "info");
            }
        });
        
        document.getElementById('passenger-filter')?.addEventListener('change', function() {
            showToast(`Filtered passengers by: ${this.options[this.selectedIndex].text}`, "info");
        });
        
        document.getElementById('import-passengers')?.addEventListener('click', function() {
            showToast("Import passengers dialog opened", "info");
        });
        
        // Pagination
        document.getElementById('prev-passenger-page')?.addEventListener('click', function() {
            showToast("Previous page", "info");
        });
        
        document.getElementById('next-passenger-page')?.addEventListener('click', function() {
            showToast("Next page", "info");
        });
        
        // Passenger form submission
        const passengerForm = document.getElementById('passenger-form');
        if (passengerForm) {
            passengerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const firstName = document.getElementById('passenger-first-name').value;
                const lastName = document.getElementById('passenger-last-name').value;
                const passport = document.getElementById('passenger-passport').value;
                const nationality = document.getElementById('passenger-nationality').value;
                const email = document.getElementById('passenger-email').value;
                const loyaltyProgram = document.getElementById('loyalty-program').checked;
                
                // Generate passenger ID
                const passengerId = `P-${Math.floor(1000 + Math.random() * 9000)}`;
                
                // Create new passenger object
                const newPassenger = {
                    id: passengerId,
                    name: `${firstName} ${lastName}`,
                    passport: passport,
                    nationality: nationality,
                    contact: email,
                    miles: '0',
                    status: loyaltyProgram ? 'Bronze' : 'Regular'
                };
                
                // Add to passengers table
                const passengersTable = document.getElementById('passengers-table');
                if (passengersTable) {
                    const row = document.createElement('tr');
                    row.className = 'clickable-row';
                    row.setAttribute('data-passenger', newPassenger.id);
                    
                    let statusClass = 'status-inactive';
                    if (newPassenger.status === 'Gold') statusClass = 'status-confirmed';
                    if (newPassenger.status === 'Silver') statusClass = 'status-active';
                    if (newPassenger.status === 'Bronze') statusClass = 'status-pending';
                    
                    row.innerHTML = `
                        <td>${newPassenger.id}</td>
                        <td>${newPassenger.name}</td>
                        <td>${newPassenger.passport}</td>
                        <td>${newPassenger.nationality}</td>
                        <td>${newPassenger.contact}</td>
                        <td>${newPassenger.miles}</td>
                        <td><span class="status ${statusClass}">${newPassenger.status}</span></td>
                        <td>
                            <div class="action-icon-group">
                                <span class="action-icon view" data-tooltip="View" onclick="viewPassenger('${newPassenger.id}')">
                                    <i class="fas fa-eye"></i>
                                </span>
                            <span class="action-icon edit" data-tooltip="Edit" onclick="editPassenger('${newPassenger.id}')">
                                <i class="fas fa-edit"></i>
                            </span>
                            <span class="action-icon delete" data-tooltip="Delete" onclick="deletePassenger('${newPassenger.id}')">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </div>
                    </td>
                `;
                
                passengersTable.appendChild(row);
                
                // Add click event to the new row
                row.addEventListener('click', function(e) {
                    if (!e.target.closest('.action-icon')) {
                        const passengerId = this.getAttribute('data-passenger');
                        viewPassenger(passengerId);
                    }
                });
            }
                
                closeModal(document.getElementById('add-passenger-modal'));
                showToast("Passenger added successfully", "success");
                
                // Reset form
                passengerForm.reset();
            });
        }
        
        // Loyalty items
        document.querySelectorAll('.loyalty-item').forEach(item => {
            item.addEventListener('click', function() {
                const loyaltyName = this.querySelector('.loyalty-name').textContent;
                showToast(`Viewing ${loyaltyName} members`, "info");
            });
        });
        
        // Activity items
        document.querySelectorAll('.activity-item').forEach(item => {
            item.addEventListener('click', function() {
                const activityText = this.querySelector('p').textContent;
                showToast(`Activity details: ${activityText}`, "info");
            });
        });
    }
    
    function setupScheduleSection() {
        // Generate schedule button
        document.getElementById('generate-schedule-btn')?.addEventListener('click', function() {
            showToast("Schedule generation started", "info");
        });
        
        // Week navigation
        document.getElementById('prev-week-btn')?.addEventListener('click', function() {
            showToast("Previous week", "info");
        });
        
        document.getElementById('next-week-btn')?.addEventListener('click', function() {
            showToast("Next week", "info");
        });
        
        // View options
        document.getElementById('week-view')?.addEventListener('click', function() {
            document.querySelectorAll('.view-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            showToast("Week view selected", "info");
        });
        
        document.getElementById('month-view')?.addEventListener('click', function() {
            document.querySelectorAll('.view-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            showToast("Month view selected", "info");
        });
        
        document.getElementById('list-view')?.addEventListener('click', function() {
            document.querySelectorAll('.view-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            showToast("List view selected", "info");
        });
        
        // Legend items
        document.querySelectorAll('.legend-item').forEach(item => {
            item.addEventListener('click', function() {
                const legendText = this.querySelector('span').textContent;
                showToast(`Showing ${legendText} flights`, "info");
            });
        });
    }
    
    function setupReportsSection() {
        // Export report button
        document.getElementById('generate-report-btn-2')?.addEventListener('click', function() {
            showToast("Report exported successfully", "success");
        });
        
        // Schedule report button
        document.getElementById('schedule-report-btn')?.addEventListener('click', function() {
            showToast("Report scheduled successfully", "success");
        });
        
        // Share report button
        document.getElementById('share-report-btn')?.addEventListener('click', function() {
            showToast("Report sharing options opened", "info");
        });
        
        // Report period selection
        document.getElementById('report-period')?.addEventListener('change', function() {
            const period = this.value;
            const customRange = document.getElementById('custom-range');
            
            if (period === 'custom') {
                customRange.classList.add('active');
            } else {
                customRange.classList.remove('active');
                showToast(`Report period set to: ${this.options[this.selectedIndex].text}`, "info");
            }
        });
        
        // Apply date range
        document.getElementById('apply-date-range')?.addEventListener('click', function() {
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            
            if (startDate && endDate) {
                showToast(`Custom date range applied: ${startDate} to ${endDate}`, "success");
            } else {
                showToast("Please select both start and end dates", "error");
            }
        });
        
        // Report tabs
        document.querySelectorAll('.report-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.report-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const reportId = this.getAttribute('data-report');
                document.querySelectorAll('[data-report-content]').forEach(content => {
                    content.classList.remove('active');
                });
                
                const reportContent = document.querySelector(`[data-report-content="${reportId}"]`);
                if (reportContent) {
                    reportContent.classList.add('active');
                }
                
                showToast(`${this.textContent} report loaded`, "info");
            });
        });
    }
    
    function makeAllSectionsInteractive() {
        // Make all sections respond to clicks
        document.querySelectorAll('.content-section').forEach(section => {
            section.addEventListener('click', function(e) {
                // Only show toast if clicking directly on the section (not on a child element that already has a click handler)
                if (e.target === this) {
                    const sectionId = this.getAttribute('id');
                    showToast(`Clicked on ${sectionId} section`, "info");
                }
            });
        });
        
        // Make all buttons respond to clicks if they don't already have a handler
        document.querySelectorAll('button:not([id])').forEach(button => {
            if (!button.onclick) {
                button.addEventListener('click', function() {
                    showToast("Button clicked", "info");
                });
            }
        });
        
        // Make all links respond to clicks if they don't already have a handler
        document.querySelectorAll('a:not([id])').forEach(link => {
            if (!link.onclick) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showToast("Link clicked", "info");
                });
            }
        });
        
        // Make all form inputs respond to focus
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.classList.remove('focused');
            });
        });
    }
    
    // Call checkLoggedIn when the page loads
    checkLoggedIn();
});

// View, Edit, Delete functions for Flights, Bookings, and Passengers
function viewFlight(flightId) {
    const viewItemModal = document.getElementById('view-item-modal');
    const viewItemTitle = document.getElementById('view-item-title');
    const viewItemContent = document.getElementById('view-item-content');
    
    viewItemTitle.textContent = `Flight Details: ${flightId}`;
    
    // Find flight data (in a real app, this would be fetched from the server)
    const flight = {
        id: flightId,
        route: 'JFK → LAX',
        departure: '2023-05-15 08:00',
        arrival: '2023-05-15 11:30',
        aircraft: 'Boeing 737-800',
        seats: '189/189',
        status: 'Scheduled',
        gate: 'A12',
        terminal: 'Terminal 4',
        crew: 'Captain John Smith, First Officer Emma Johnson',
        notes: 'Regular scheduled flight'
    };
    
    viewItemContent.innerHTML = `
        <div class="booking-details-grid">
            <div class="detail-card">
                <h4><i class="fas fa-plane"></i> Flight Information</h4>
                <ul class="detail-list">
                    <li>
                        <span class="detail-label">Flight Number</span>
                        <span class="detail-value">${flight.id}</span>
                    </li>
                    <li>
                        <span class="detail-label">Route</span>
                        <span class="detail-value">${flight.route}</span>
                    </li>
                    <li>
                        <span class="detail-label">Departure</span>
                        <span class="detail-value">${flight.departure}</span>
                    </li>
                    <li>
                        <span class="detail-label">Arrival</span>
                        <span class="detail-value">${flight.arrival}</span>
                    </li>
                    <li>
                        <span class="detail-label">Status</span>
                        <span class="detail-value">${flight.status}</span>
                    </li>
                </ul>
            </div>
            <div class="detail-card">
                <h4><i class="fas fa-info-circle"></i> Aircraft Details</h4>
                <ul class="detail-list">
                    <li>
                        <span class="detail-label">Aircraft</span>
                        <span class="detail-value">${flight.aircraft}</span>
                    </li>
                    <li>
                        <span class="detail-label">Seats</span>
                        <span class="detail-value">${flight.seats}</span>
                    </li>
                    <li>
                        <span class="detail-label">Gate</span>
                        <span class="detail-value">${flight.gate}</span>
                    </li>
                    <li>
                        <span class="detail-label">Terminal</span>
                        <span class="detail-value">${flight.terminal}</span>
                    </li>
                    <li>
                        <span class="detail-label">Crew</span>
                        <span class="detail-value">${flight.crew}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="detail-card">
            <h4><i class="fas fa-clipboard-list"></i> Additional Information</h4>
            <p>${flight.notes}</p>
        </div>
    `;
    
    // Set up edit button
    document.getElementById('edit-from-view').onclick = function() {
        closeModal(viewItemModal);
        editFlight(flightId);
    };
    
    openModal(viewItemModal);
    showToast(`Viewing flight ${flightId} details`, "info");
}

function editFlight(flightId) {
    const editItemModal = document.getElementById('edit-item-modal');
    const editItemTitle = document.getElementById('edit-item-title');
    const editItemContent = document.getElementById('edit-item-content');
    
    editItemTitle.textContent = `Edit Flight: ${flightId}`;
    
    // Find flight data (in a real app, this would be fetched from the server)
    const flight = {
        id: flightId,
        departureAirport: 'JFK',
        arrivalAirport: 'LAX',
        departure: '2023-05-15T08:00',
        arrival: '2023-05-15T11:30',
        aircraft: 'N123SW',
        status: 'Scheduled',
        type: 'domestic'
    };
    
    editItemContent.innerHTML = `
        <form id="edit-flight-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-flight-number">Flight Number</label>
                    <input type="text" id="edit-flight-number" value="${flight.id}" readonly>
                </div>
                <div class="form-group">
                    <label for="edit-aircraft">Aircraft</label>
                    <select id="edit-aircraft" required>
                        <option value="N123SW" ${flight.aircraft === 'N123SW' ? 'selected' : ''}>Boeing 737-800 (N123SW)</option>
                        <option value="N456SW" ${flight.aircraft === 'N456SW' ? 'selected' : ''}>Airbus A320 (N456SW)</option>
                        <option value="N789SW" ${flight.aircraft === 'N789SW' ? 'selected' : ''}>Boeing 787-9 (N789SW)</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-departure-airport">Departure Airport</label>
                    <input type="text" id="edit-departure-airport" value="${flight.departureAirport}" required>
                </div>
                <div class="form-group">
                    <label for="edit-arrival-airport">Arrival Airport</label>
                    <input type="text" id="edit-arrival-airport" value="${flight.arrivalAirport}" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-departure-time">Departure Time</label>
                    <input type="datetime-local" id="edit-departure-time" value="${flight.departure}" required>
                </div>
                <div class="form-group">
                    <label for="edit-arrival-time">Arrival Time</label>
                    <input type="datetime-local" id="edit-arrival-time" value="${flight.arrival}" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-flight-status">Status</label>
                    <select id="edit-flight-status">
                        <option value="scheduled" ${flight.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
                        <option value="delayed" ${flight.status === 'Delayed' ? 'selected' : ''}>Delayed</option>
                        <option value="cancelled" ${flight.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-flight-type">Flight Type</label>
                    <select id="edit-flight-type">
                        <option value="domestic" ${flight.type === 'domestic' ? 'selected' : ''}>Domestic</option>
                        <option value="international" ${flight.type === 'international' ? 'selected' : ''}>International</option>
                    </select>
                </div>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-secondary close-modal">Cancel</button>
            </div>
        </form>
    `;
    
    // Set up form submission
    const editFlightForm = document.getElementById('edit-flight-form');
    editFlightForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update flight in table
        const flightRows = document.querySelectorAll(`tr[data-flight="${flightId}"]`);
        if (flightRows.length > 0) {
            const departureAirport = document.getElementById('edit-departure-airport').value;
            const arrivalAirport = document.getElementById('edit-arrival-airport').value;
            const status = document.getElementById('edit-flight-status').options[document.getElementById('edit-flight-status').selectedIndex].text;
            
            let statusClass = 'status-confirmed';
            if (status === 'Delayed') statusClass = 'status-pending';
            if (status === 'Cancelled') statusClass = 'status-cancelled';
            
            flightRows.forEach(row => {
                row.cells[1].textContent = `${departureAirport} → ${arrivalAirport}`;
                row.cells[2].textContent = document.getElementById('edit-departure-time').value;
                row.cells[3].textContent = document.getElementById('edit-arrival-time').value;
                row.cells[4].textContent = document.getElementById('edit-aircraft').options[document.getElementById('edit-aircraft').selectedIndex].text;
                row.cells[6].innerHTML = `<span class="status ${statusClass}">${status}</span>`;
            });
        }
        
        closeModal(editItemModal);
        showToast(`Flight ${flightId} updated successfully`, "success");
    });
    
    openModal(editItemModal);
    showToast(`Editing flight ${flightId}`, "info");
}

function deleteFlight(flightId) {
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmationTitle = document.getElementById('confirmation-title');
    const confirmationMessage = document.getElementById('confirmation-message');
    const confirmAction = document.getElementById('confirm-action');
    
    confirmationTitle.textContent = 'Delete Flight';
    confirmationMessage.innerHTML = `
        <div class="delete-confirmation">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Are you sure you want to delete flight <span class="item-name">${flightId}</span>?</p>
            <p>This action cannot be undone.</p>
        </div>
    `;
    
    confirmAction.onclick = function() {
        // Remove flight from table
        const flightRows = document.querySelectorAll(`tr[data-flight="${flightId}"]`);
        flightRows.forEach(row => row.remove());
        
        closeModal(confirmationModal);
        showToast(`Flight ${flightId} deleted successfully`, "success");
    };
    
    openModal(confirmationModal);
}

function viewBooking(bookingId) {
    const viewItemModal = document.getElementById('view-item-modal');
    const viewItemTitle = document.getElementById('view-item-title');
    const viewItemContent = document.getElementById('view-item-content');
    
    viewItemTitle.textContent = `Booking Details: ${bookingId}`;
    
    // Find booking data (in a real app, this would be fetched from the server)
    const booking = {
        id: bookingId,
        passenger: 'John Smith',
        flight: 'SW123 (JFK-LAX)',
        departure: '2023-05-15 08:00',
        arrival: '2023-05-15 11:30',
        seat: '12A',
        class: 'Economy',
        status: 'Confirmed',
        price: '$350.00',
        paymentMethod: 'Credit Card (**** 1234)',
        bookingDate: '2023-04-30',
        specialRequests: 'Vegetarian meal, Extra legroom'
    };
    
    viewItemContent.innerHTML = `
        <div class="booking-summary">
            <div class="booking-header">
                <div class="booking-id">${booking.id}</div>
                <div class="booking-date">Booked on: ${booking.bookingDate}</div>
            </div>
            <div class="booking-details">
                <div class="booking-detail">
                    <div class="booking-detail-label">Passenger</div>
                    <div class="booking-detail-value">${booking.passenger}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Flight</div>
                    <div class="booking-detail-value">${booking.flight}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Departure</div>
                    <div class="booking-detail-value">${booking.departure}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Arrival</div>
                    <div class="booking-detail-value">${booking.arrival}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Seat</div>
                    <div class="booking-detail-value">${booking.seat}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Class</div>
                    <div class="booking-detail-value">${booking.class}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Status</div>
                    <div class="booking-detail-value">${booking.status}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Payment Method</div>
                    <div class="booking-detail-value">${booking.paymentMethod}</div>
                </div>
            </div>
            <div class="booking-price">
                <div class="booking-price-label">Total Price</div>
                <div class="booking-price-value">${booking.price}</div>
            </div>
        </div>
        <div class="detail-card">
            <h4><i class="fas fa-clipboard-list"></i> Special Requests</h4>
            <p>${booking.specialRequests || 'None'}</p>
        </div>
    `;
    
    // Set up edit button
    document.getElementById('edit-from-view').onclick = function() {
        closeModal(viewItemModal);
        editBooking(bookingId);
    };
    
    openModal(viewItemModal);
    showToast(`Viewing booking ${bookingId} details`, "info");
}

function editBooking(bookingId) {
    const editItemModal = document.getElementById('edit-item-modal');
    const editItemTitle = document.getElementById('edit-item-title');
    const editItemContent = document.getElementById('edit-item-content');
    
    editItemTitle.textContent = `Edit Booking: ${bookingId}`;
    
    // Find booking data (in a real app, this would be fetched from the server)
    const booking = {
        id: bookingId,
        passenger: 'John Smith',
        flight: 'SW123',
        seat: '12A',
        class: 'Economy',
        status: 'Confirmed',
        price: '350',
        notes: 'Vegetarian meal, Extra legroom'
    };
    
    editItemContent.innerHTML = `
        <form id="edit-booking-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-booking-id">Booking ID</label>
                    <input type="text" id="edit-booking-id" value="${booking.id}" readonly>
                </div>
                <div class="form-group">
                    <label for="edit-booking-passenger">Passenger</label>
                    <input type="text" id="edit-booking-passenger" value="${booking.passenger}" readonly>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-booking-flight">Flight</label>
                    <input type="text" id="edit-booking-flight" value="${booking.flight}" readonly>
                </div>
                <div class="form-group">
                    <label for="edit-booking-seat">Seat</label>
                    <input type="text" id="edit-booking-seat" value="${booking.seat}" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-booking-class">Class</label>
                    <select id="edit-booking-class" required>
                        <option value="Economy" ${booking.class === 'Economy' ? 'selected' : ''}>Economy</option>
                        <option value="Business" ${booking.class === 'Business' ? 'selected' : ''}>Business</option>
                        <option value="First" ${booking.class === 'First' ? 'selected' : ''}>First Class</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-booking-status">Status</label>
                    <select id="edit-booking-status">
                        <option value="Confirmed" ${booking.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Pending" ${booking.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Cancelled" ${booking.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-booking-price">Price</label>
                    <input type="number" id="edit-booking-price" value="${booking.price}" required>
                </div>
            </div>
            <div class="form-group">
                <label for="edit-booking-notes">Special Requests</label>
                <textarea id="edit-booking-notes" rows="3">${booking.notes}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-secondary close-modal">Cancel</button>
            </div>
        </form>
    `;
    
    // Set up form submission
    const editBookingForm = document.getElementById('edit-booking-form');
    editBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update booking in table
        const bookingRows = document.querySelectorAll(`tr[data-booking="${bookingId}"]`);
        if (bookingRows.length > 0) {
            const seat = document.getElementById('edit-booking-seat').value;
            const bookingClass = document.getElementById('edit-booking-class').options[document.getElementById('edit-booking-class').selectedIndex].text;
            const status = document.getElementById('edit-booking-status').value;
            
            let statusClass = 'status-confirmed';
            if (status === 'Pending') statusClass = 'status-pending';
            if (status === 'Cancelled') statusClass = 'status-cancelled';
            
            bookingRows.forEach(row => {
                row.cells[4].textContent = seat;
                row.cells[5].textContent = bookingClass;
                row.cells[6].innerHTML = `<span class="status ${statusClass}">${status}</span>`;
            });
        }
        
        closeModal(editItemModal);
        showToast(`Booking ${bookingId} updated successfully`, "success");
    });
    
    openModal(editItemModal);
    showToast(`Editing booking ${bookingId}`, "info");
}

function deleteBooking(bookingId) {
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmationTitle = document.getElementById('confirmation-title');
    const confirmationMessage = document.getElementById('confirmation-message');
    const confirmAction = document.getElementById('confirm-action');
    
    confirmationTitle.textContent = 'Delete Booking';
    confirmationMessage.innerHTML = `
        <div class="delete-confirmation">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Are you sure you want to delete booking <span class="item-name">${bookingId}</span>?</p>
            <p>This action cannot be undone.</p>
        </div>
    `;
    
    confirmAction.onclick = function() {
        // Remove booking from table
        const bookingRows = document.querySelectorAll(`tr[data-booking="${bookingId}"]`);
        bookingRows.forEach(row => row.remove());
        
        closeModal(confirmationModal);
        showToast(`Booking ${bookingId} deleted successfully`, "success");
    };
    
    openModal(confirmationModal);
}

function viewPassenger(passengerId) {
    const viewItemModal = document.getElementById('view-item-modal');
    const viewItemTitle = document.getElementById('view-item-title');
    const viewItemContent = document.getElementById('view-item-content');
    
    viewItemTitle.textContent = `Passenger Details: ${passengerId}`;
    
    // Find passenger data (in a real app, this would be fetched from the server)
    const passenger = {
        id: passengerId,
        firstName: 'John',
        lastName: 'Smith',
        passport: 'US123456',
        nationality: 'USA',
        dob: '1985-06-15',
        gender: 'Male',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        miles: '12,500',
        status: 'Gold',
        joinDate: '2020-03-10',
        lastFlight: '2023-04-22'
    };
    
    const initials = passenger.firstName.charAt(0) + passenger.lastName.charAt(0);
    
    viewItemContent.innerHTML = `
        <div class="passenger-profile">
            <div class="passenger-avatar">${initials}</div>
            <div class="passenger-info">
                <h3 class="passenger-name">${passenger.firstName} ${passenger.lastName}</h3>
                <div class="status status-confirmed">${passenger.status} Member</div>
                <div class="passenger-contact">
                    <span><i class="fas fa-envelope"></i> ${passenger.email}</span>
                    <span><i class="fas fa-phone"></i> ${passenger.phone}</span>
                </div>
            </div>
            <div class="passenger-actions">
                <button class="btn btn-primary" onclick="editPassenger('${passengerId}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </div>
        </div>
        
        <div class="passenger-details-grid">
            <div class="detail-card">
                <h4><i class="fas fa-user"></i> Personal Information</h4>
                <ul class="detail-list">
                    <li>
                        <span class="detail-label">Passport</span>
                        <span class="detail-value">${passenger.passport}</span>
                    </li>
                    <li>
                        <span class="detail-label">Nationality</span>
                        <span class="detail-value">${passenger.nationality}</span>
                    </li>
                    <li>
                        <span class="detail-label">Date of Birth</span>
                        <span class="detail-value">${passenger.dob}</span>
                    </li>
                    <li>
                        <span class="detail-label">Gender</span>
                        <span class="detail-value">${passenger.gender}</span>
                    </li>
                    <li>
                        <span class="detail-label">Address</span>
                        <span class="detail-value">${passenger.address}</span>
                    </li>
                </ul>
            </div>
            <div class="detail-card">
                <h4><i class="fas fa-plane"></i> Travel Information</h4>
                <ul class="detail-list">
                    <li>
                        <span class="detail-label">Loyalty Status</span>
                        <span class="detail-value">${passenger.status}</span>
                    </li>
                    <li>
                        <span class="detail-label">Miles</span>
                        <span class="detail-value">${passenger.miles}</span>
                    </li>
                    <li>
                        <span class="detail-label">Member Since</span>
                        <span class="detail-value">${passenger.joinDate}</span>
                    </li>
                    <li>
                        <span class="detail-label">Last Flight</span>
                        <span class="detail-value">${passenger.lastFlight}</span>
                    </li>
                </ul>
            </div>
        </div>
    `;
    
    // Set up edit button
    document.getElementById('edit-from-view').onclick = function() {
        closeModal(viewItemModal);
        editPassenger(passengerId);
    };
    
    openModal(viewItemModal);
    showToast(`Viewing passenger ${passengerId} details`, "info");
}

function editPassenger(passengerId) {
    const editItemModal = document.getElementById('edit-item-modal');
    const editItemTitle = document.getElementById('edit-item-title');
    const editItemContent = document.getElementById('edit-item-content');
    
    editItemTitle.textContent = `Edit Passenger: ${passengerId}`;
    
    // Find passenger data (in a real app, this would be fetched from the server)
    const passenger = {
        id: passengerId,
        firstName: 'John',
        lastName: 'Smith',
        passport: 'US123456',
        nationality: 'USA',
        dob: '1985-06-15',
        gender: 'Male',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        status: 'Gold'
    };
    
    editItemContent.innerHTML = `
        <form id="edit-passenger-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-passenger-id">Passenger ID</label>
                    <input type="text" id="edit-passenger-id" value="${passenger.id}" readonly>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-passenger-first-name">First Name</label>
                    <input type="text" id="edit-passenger-first-name" value="${passenger.firstName}" required>
                </div>
                <div class="form-group">
                    <label for="edit-passenger-last-name">Last Name</label>
                    <input type="text" id="edit-passenger-last-name" value="${passenger.lastName}" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-passenger-passport">Passport Number</label>
                    <input type="text" id="edit-passenger-passport" value="${passenger.passport}" required>
                </div>
                <div class="form-group">
                    <label for="edit-passenger-nationality">Nationality</label>
                    <input type="text" id="edit-passenger-nationality" value="${passenger.nationality}" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-passenger-dob">Date of Birth</label>
                    <input type="date" id="edit-passenger-dob" value="${passenger.dob}" required>
                </div>
                <div class="form-group">
                    <label for="edit-passenger-gender">Gender</label>
                    <select id="edit-passenger-gender" required>
                        <option value="Male" ${passenger.gender === 'Male' ? 'selected' : ''}>Male</option>
                        <option value="Female" ${passenger.gender === 'Female' ? 'selected' : ''}>Female</option>
                        <option value="Other" ${passenger.gender === 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-passenger-email">Email</label>
                    <input type="email" id="edit-passenger-email" value="${passenger.email}" required>
                </div>
                <div class="form-group">
                    <label for="edit-passenger-phone">Phone</label>
                    <input type="tel" id="edit-passenger-phone" value="${passenger.phone}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="edit-passenger-status">Loyalty Status</label>
                    <select id="edit-passenger-status">
                        <option value="Regular" ${passenger.status === 'Regular' ? 'selected' : ''}>Regular</option>
                        <option value="Bronze" ${passenger.status === 'Bronze' ? 'selected' : ''}>Bronze</option>
                        <option value="Silver" ${passenger.status === 'Silver' ? 'selected' : ''}>Silver</option>
                        <option value="Gold" ${passenger.status === 'Gold' ? 'selected' : ''}>Gold</option>
                    </select>
                </div>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-secondary close-modal">Cancel</button>
            </div>
        </form>
    `;
    
    // Set up form submission
    const editPassengerForm = document.getElementById('edit-passenger-form');
    editPassengerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update passenger in table
        const passengerRows = document.querySelectorAll(`tr[data-passenger="${passengerId}"]`);
        if (passengerRows.length > 0) {
            const firstName = document.getElementById('edit-passenger-first-name').value;
            const lastName = document.getElementById('edit-passenger-last-name').value;
            const passport = document.getElementById('edit-passenger-passport').value;
            const nationality = document.getElementById('edit-passenger-nationality').value;
            const email = document.getElementById('edit-passenger-email').value;
            const status = document.getElementById('edit-passenger-status').value;
            
            let statusClass = 'status-inactive';
            if (status === 'Gold') statusClass = 'status-confirmed';
            if (status === 'Silver') statusClass = 'status-active';
            if (status === 'Bronze') statusClass = 'status-pending';
            
            passengerRows.forEach(row => {
                row.cells[1].textContent = `${firstName} ${lastName}`;
                row.cells[2].textContent = passport;
                row.cells[3].textContent = nationality;
                row.cells[4].textContent = email;
                row.cells[6].innerHTML = `<span class="status ${statusClass}">${status}</span>`;
            });
        }
        
        closeModal(editItemModal);
        showToast(`Passenger ${passengerId} updated successfully`, "success");
    });
    
    openModal(editItemModal);
    showToast(`Editing passenger ${passengerId}`, "info");
}

function deletePassenger(passengerId) {
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmationTitle = document.getElementById('confirmation-title');
    const confirmationMessage = document.getElementById('confirmation-message');
    const confirmAction = document.getElementById('confirm-action');
    
    confirmationTitle.textContent = 'Delete Passenger';
    confirmationMessage.innerHTML = `
        <div class="delete-confirmation">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Are you sure you want to delete passenger <span class="item-name">${passengerId}</span>?</p>
            <p>This action cannot be undone.</p>
        </div>
    `;
    
    confirmAction.onclick = function() {
        // Remove passenger from table
        const passengerRows = document.querySelectorAll(`tr[data-passenger="${passengerId}"]`);
        passengerRows.forEach(row => row.remove());
        
        closeModal(confirmationModal);
        showToast(`Passenger ${passengerId} deleted successfully`, "success");
    };
    
    openModal(confirmationModal);
}

// Helper function to open modal
function openModal(modal) {
    document.getElementById('modal-overlay').style.display = 'block';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Helper function to close modal
function closeModal(modal) {
    document.getElementById('modal-overlay').style.display = 'none';
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Helper function to show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}