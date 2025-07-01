<script>
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    
    // Google Auth Provider
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    // Facebook Auth Provider
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    // Sample database (using localStorage for demonstration)
    function initializeDatabase() {
        if (!localStorage.getItem('doctors')) {
            // Sample doctor data
            const doctors =[
                {
                    id: "DOC001",
                    name: "Dr.Smith",
                    email: "dr.smith@hospital.com",
                    password: "doctor123"
                },
                {
                    id: "DOC002",
                    name: "Dr.Johnson",
                    email: "dr.johnson@hospital.com",
                    password: "doctor456"
                },
                {
                    id: "DOC003",
                    name: "Dr.Test",
                    email: "dr.test@hospital.com",
                    password: "test123"
                }
            ];
            localStorage.setItem('doctors', JSON.stringify(doctors));
        }

        if (!localStorage.getItem('patients')) {
            // Sample patient data
            const patients=[
                {
                    email:"patient1@example.com",
                    password: "patient123"
                },
                {
                    email:"patient2@example.com",
                    password:"patient456"
                }
            ];
            localStorage.setItem('patients', JSON.stringify(patients));
        }
    }

    // Initialize the database when page loads
    initializeDatabase();

    // Database functions
    function findDoctorById(id) {
        const doctors = JSON.parse(localStorage.getItem('doctors'));
        return doctors.find(doctor=>doctor.id === id);
    }

    function findPatientByEmail(email) {
        const patients = JSON.parse(localStorage.getItem('patients'));
        return patients.find(patient=>patient.email === email);
    }

    function addDoctor(doctor){
        const doctors = JSON.parse(localStorage.getItem('doctors'));
        doctors.push(doctor);
        localStorage.setItem('doctors',JSON.stringify(doctors));
    }

    function addPatient(patient) {
        const patients = JSON.parse(localStorage.getItem('patients'));
        patients.push(patient);
        localStorage.setItem('patients', JSON.stringify(patients));
    }
    
    // Sample data for website content
    let services = [
        {
            id: 1,
            title: "General Checkup",
            description: "Comprehensive physical examination to assess your overall health and detect any potential issues early.",
            image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 2,
            title: "Pediatric Care",
            description: "Specialized medical care for infants, children, and adolescents, focusing on their unique health needs.",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 3,
            title: "Chronic Disease Management",
            description: "Personalized treatment plans for managing chronic conditions like diabetes, hypertension, and more.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
    ];
    
    let testimonials = [
        {
            id: 1,
            author: "Sarah Johnson",
            content: "Dr. Smith has been our family doctor for years. He's incredibly knowledgeable and always takes the time to listen to our concerns.",
            rating: 5
        },
        {
            id: 2,
            author: "Michael Brown",
            content: "The clinic staff is friendly and professional. I never have to wait long for my appointments, which I really appreciate.",
            rating: 4
        },
        {
            id: 3,
            author: "Emily Davis",
            content: "Dr. Smith diagnosed a condition that other doctors had missed. I'm so grateful for his expertise and care.",
            rating: 5
        }
    ];
    
    let galleryImages = [
        {
            id: 1,
            title: "Clinic Reception",
            image: "https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Our welcoming reception area with comfortable seating and friendly staff ready to assist you."
        },
        {
            id: 2,
            title: "Examination Room",
            image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "State-of-the-art examination rooms equipped with modern medical equipment for accurate diagnostics."
        },
        {
            id: 3,
            title: "Waiting Area",
            image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Comfortable waiting area with amenities to make your visit pleasant while you wait for your appointment."
        },
        {
            id: 4,
            title: "Medical Equipment",
            image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "We use only the latest medical technology to ensure the best care for our patients."
        },
        {
            id: 5,
            title: "Doctor Consultation",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Our doctors provide thorough consultations to understand and address your health concerns."
        },
        {
            id: 6,
            title: "Pediatric Care",
            image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Specialized care for children in a child-friendly environment to make visits comfortable."
        }
    ];
    
    // DOM Elements
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content');
    const logoutBtn = document.getElementById('logout-btn');
    const adminPanel = document.getElementById('admin-panel');
    const closeAdmin = document.getElementById('close-admin');
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminContents = document.querySelectorAll('.admin-content');
    const backToTop = document.getElementById('back-to-top');
    const header = document.getElementById('main-header');
    
    // Services
    const servicesContainer = document.getElementById('services-container');
    const servicesList = document.getElementById('services-list');
    const addServiceBtn = document.getElementById('add-service');
    const serviceForm = document.getElementById('service-form');
    const serviceTitle = document.getElementById('service-title');
    const serviceDescription = document.getElementById('service-description');
    const serviceImage = document.getElementById('service-image');
    const serviceImagePreview = document.getElementById('service-image-preview');
    const serviceId = document.getElementById('service-id');
    const saveServiceBtn = document.getElementById('save-service');
    const cancelServiceBtn = document.getElementById('cancel-service');
    
    // Testimonials
    const testimonialsContainer = document.getElementById('testimonials-container');
    const testimonialsList = document.getElementById('testimonials-list');
    const addTestimonialBtn = document.getElementById('add-testimonial');
    const testimonialForm = document.getElementById('testimonial-form');
    const testimonialAuthor = document.getElementById('testimonial-author');
    const testimonialContent = document.getElementById('testimonial-content');
    const testimonialRating = document.getElementById('testimonial-rating');
    const testimonialId = document.getElementById('testimonial-id');
    const saveTestimonialBtn = document.getElementById('save-testimonial');
    const cancelTestimonialBtn = document.getElementById('cancel-testimonial');
    
    // Gallery
    const carouselTrack = document.getElementById('carousel-track');
    const carouselDots = document.getElementById('carousel-dots');
    const galleryList = document.getElementById('gallery-list');
    const addGalleryImageBtn = document.getElementById('add-gallery-image');
    const galleryForm = document.getElementById('gallery-form');
    const galleryImageTitle = document.getElementById('gallery-image-title');
    const galleryImageDescription = document.getElementById('gallery-image-description');
    const galleryImage = document.getElementById('gallery-image');
    const galleryImagePreview = document.getElementById('gallery-image-preview');
    const galleryImageId = document.getElementById('gallery-image-id');
    const saveGalleryImageBtn = document.getElementById('save-gallery-image');
    const cancelGalleryImageBtn = document.getElementById('cancel-gallery-image');
    
    // Image Modal
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.getElementById('close-modal');
    
    // Current editing item
    let currentEditingItem = null;
    let carouselInterval;
    let currentSlide = 0;
    let slideWidth = 0;
    let totalSlides = 0;
    let isPaused = false;

        window.addEventListener('DOMContentLoaded', () => {
            const fill = document.getElementById('progressFill');
            setTimeout(() => { fill.style.width = '100%'; },300); // Start animation
        setTimeout(() => {
            document.getElementById('splash').classList.add('hide');
            document.getElementById('main-content').classList.add('show');
        }, 2300);
        });

    // Splash Screen Animation
    // const fill = document.getElementById('progressFill');
    // setTimeout(() => { fill.style.width = '100%'; }, 300);
    // setTimeout(() => {
    //     document.getElementById('splash').classList.add('hide');
    // }, 2300);
    // Initialize the page
    document.addEventListener('DOMContentLoaded', function() {
        loadServices();
        loadTestimonials();
        loadGallery();
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Back to top button
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Logout button
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
        
        // Close admin panel
        closeAdmin.addEventListener('click', function() {
            adminPanel.style.display = 'none';
        });
        
        // Admin tabs
        adminTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab
                adminTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update active content
                adminContents.forEach(c => c.classList.remove('active'));
                document.getElementById(`${tabId}-admin`).classList.add('active');
            });
        });
        
        // Services CRUD
        addServiceBtn.addEventListener('click', showServiceForm);
        cancelServiceBtn.addEventListener('click', hideServiceForm);
        saveServiceBtn.addEventListener('click', saveService);
        serviceImage.addEventListener('change', previewServiceImage);
        
        // Testimonials CRUD
        addTestimonialBtn.addEventListener('click', showTestimonialForm);
        cancelTestimonialBtn.addEventListener('click', hideTestimonialForm);
        saveTestimonialBtn.addEventListener('click', saveTestimonial);
        
        // Gallery CRUD
        addGalleryImageBtn.addEventListener('click', showGalleryForm);
        cancelGalleryImageBtn.addEventListener('click', hideGalleryForm);
        saveGalleryImageBtn.addEventListener('click', saveGalleryImage);
        galleryImage.addEventListener('change', previewGalleryImage);
        
        // Close modal
        closeModal.addEventListener('click', closeImageModal);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (carouselTrack.children.length > 0) {
                slideWidth = carouselTrack.children[0].offsetWidth;
                updateCarouselPosition();
            }
        });
        
        // Role selection
        $('#doctorBtn').click(function() {
            $(this).addClass('active');
            $('#userBtn').removeClass('active');
            $('#doctorForms').show();
            $('#userForms').hide();
        });
        
        $('#userBtn').click(function() {
            $(this).addClass('active');
            $('#doctorBtn').removeClass('active');
            $('#userForms').show();
            $('#doctorForms').hide();
        });
        
        // Doctor form toggling
        $('#showDoctorSignUp').click(function() {
            $('#doctorSignIn').removeClass('active');
            $('#doctorSignUp').addClass('active');
        });
        
        $('#showDoctorSignIn').click(function() {
            $('#doctorSignUp').removeClass('active');
            $('#doctorSignIn').addClass('active');
        });
        
        // User form toggling
        $('#showUserSignUp').click(function() {
            $('#userSignIn').removeClass('active');
            $('#userSignUp').addClass('active');
        });
        
        $('#showUserSignIn').click(function() {
            $('#userSignUp').removeClass('active');
            $('#userSignIn').addClass('active');
        });
        
        // Forgot password
        $('#doctorForgotPassword, #userForgotPassword').click(function(e) {
            e.preventDefault();
            var modal = new bootstrap.Modal(document.getElementById('forgotPasswordModal'));
            modal.show();
        });
        
        // Form submissions
        $('#doctorLoginForm').submit(function(e) {
            e.preventDefault();
            const doctorId = $('#doctorId').val();
            const doctorName = $('#doctorName').val();
            const password = $('#doctorPassword').val();
            
            // Check against database
            const doctor = findDoctorById(doctorId);
            if (doctor && doctor.name===doctorName && doctor.password ===password) {
                showSuccessAlert('Doctor login successful!');
                // Show admin panel directly for doctors
                setTimeout(() => {
                    loginContainer.style.display = 'none';
                    mainContent.style.display = 'block';
                    adminPanel.style.display = 'flex';
                    mainContent.classList.add('show');
                }, 1500);
            } else {
                showErrorAlert('Invalid credentials. Please try again.');
            }
        });
        
        $('#doctorRegisterForm').submit(function(e) {
            e.preventDefault();
            const doctorId = $('#newDoctorId').val();
            const doctorName = $('#newDoctorName').val();
            const email = $('#newDoctorEmail').val();
            const password = $('#newDoctorPassword').val();
            const confirmPassword = $('#confirmDoctorPassword').val();
            
            if (password !== confirmPassword) {
                showErrorAlert('Passwords do not match!');
                return;
            }
            
            // Check if doctor already exists
            if (findDoctorById(doctorId)) {
                showErrorAlert('Doctor with this ID already exists!');
                return;
            }
            
            // Add new doctor to database
            const newDoctor = {
                id: doctorId,
                name: doctorName,
                email: email,
                password: password
            };
            addDoctor(newDoctor);
            showSuccessAlert('Doctor registration successful!');
            
            // Switch to sign in form
            $('#doctorSignUp').removeClass('active');
            $('#doctorSignIn').addClass('active');
        });
        
        $('#userLoginForm').submit(function(e) {
            e.preventDefault();
            const email = $('#userEmail').val();
            const password = $('#userPassword').val();
            
            // Check against database
            const patient = findPatientByEmail(email);
            if (patient && patient.password === password) {
                showSuccessAlert('Patient login successful!');
                // Show main website for patients
                setTimeout(() => {
                    loginContainer.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.classList.add('show');
                }, 1500);
            } else {
                showErrorAlert('Invalid credentials. Please try again.');
            }
        });
        
        $('#userRegisterForm').submit(function(e) {
            e.preventDefault();
            const email = $('#newUserEmail').val();
            const password = $('#newUserPassword').val();
            const confirmPassword = $('#confirmUserPassword').val();
            
            if (password !== confirmPassword) {
                showErrorAlert('Passwords do not match!');
                return;
            }
            
            // Check if patient already exists
            if (findPatientByEmail(email)) {
                showErrorAlert('Patient with this email already exists!');
                return;
            }
            
            // Add new patient to database
            const newPatient = {
                email: email,
                password: password
            };
            addPatient(newPatient);
            showSuccessAlert('Patient registration successful!');
            
            // Switch to sign in form
            $('#userSignUp').removeClass('active');
            $('#userSignIn').addClass('active');
        });
        
        // Social login for doctors
        $('#googleSignUpDoctor').click(function() {
            signInWithGoogle('doctor');
        });
        
        $('#facebookSignUpDoctor').click(function() {
            signInWithFacebook('doctor');
        });
        
        // Social login for users
        $('#googleSignInUser, #googleSignUpUser').click(function() {
            signInWithGoogle('patient');
        });
        
        $('#facebookSignInUser, #facebookSignUpUser').click(function() {
            signInWithFacebook('patient');
        });
        
        // Send reset link
        $('#sendResetLink').click(function() {
            const email = $('#resetEmail').val();
            if(email) {
                auth.sendPasswordResetEmail(email)
                    .then(() => {
                        showSuccessAlert('Password reset link sent to: ' + email);
                        $('#forgotPasswordModal').modal('hide');
                    })
                    .catch(error => {
                        showErrorAlert('Error sending reset link: ' + error.message);
                    });
            } else {
                showErrorAlert('Please enter your email address');
            }
        });
    });
    
    // Logout function
    function logout() {
        loginContainer.style.display = 'block';
        mainContent.style.display = 'none';
        adminPanel.style.display = 'none';
        mainContent.classList.remove('show');
        
        // Reset forms
        $('#doctorSignIn').addClass('active');
        $('#doctorSignUp').removeClass('active');
        $('#userSignIn').addClass('active');
        $('#userSignUp').removeClass('active');
        
        $('#doctorId').val('');
        $('#doctorName').val('');
        $('#doctorPassword').val('');
        $('#userEmail').val('');
        $('#userPassword').val('');
    }
    
    // Social login functions
    function signInWithGoogle(role) {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                const user = result.user;
                showSuccessAlert(`${role.charAt(0).toUpperCase() + role.slice(1)} signed in with Google: ${user.email}`);
                // Redirect based on role
                if (role === 'doctor') {
                    loginContainer.style.display = 'none';
                    mainContent.style.display = 'block';
                    adminPanel.style.display = 'flex';
                    mainContent.classList.add('show');
                } else {
                    loginContainer.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.classList.add('show');
                }
            })
            .catch((error) => {
                showErrorAlert(`Google sign in error: ${error.message}`);
            });
    }
    
    function signInWithFacebook(role) {
        auth.signInWithPopup(facebookProvider)
            .then((result) => {
                const user = result.user;
                showSuccessAlert(`${role.charAt(0).toUpperCase() + role.slice(1)} signed in with Facebook`);
                // Redirect based on role
                if (role === 'doctor') {
                    loginContainer.style.display = 'none';
                    mainContent.style.display = 'block';
                    adminPanel.style.display = 'flex';
                    mainContent.classList.add('show');
                } else {
                    loginContainer.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.classList.add('show');
                }
            })
            .catch((error) => {
                showErrorAlert(`Facebook sign in error: ${error.message}`);
            });
    }
    
    // Alert functions
    function showSuccessAlert(message) {
        const alert = $(`
            <div class="alert alert-success alert-dismissible fade show animate__animated animate__fadeInRight" 
                    role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        $('body').append(alert);
        setTimeout(() => {
            alert.addClass('animate__fadeOutRight');
            setTimeout(() => alert.remove(), 500);
        }, 3000);
    }
    
    function showErrorAlert(message) {
        const alert = $(`
            <div class="alert alert-danger alert-dismissible fade show animate__animated animate__fadeInRight" 
                    role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        $('body').append(alert);
        setTimeout(() => {
            alert.addClass('animate__fadeOutRight');
            setTimeout(() => alert.remove(), 500);
        }, 3000);
    }
    
    // Load services to public page
    function loadServices() {
        servicesContainer.innerHTML = '';
        
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-img">
                    <img src="${service.image}" alt="${service.title}">
                </div>
                <div class="service-content">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `;
            servicesContainer.appendChild(serviceCard);
        });
        
        // Also load to admin list
        loadServicesAdmin();
    }
    
    // Load services to admin panel
    function loadServicesAdmin() {
        servicesList.innerHTML = '';
        
        services.forEach(service => {
            const li = document.createElement('li');
            li.className = 'admin-list-item';
            li.innerHTML = `
                <div>
                    <h4>${service.title}</h4>
                    <p>${service.description.substring(0, 50)}...</p>
                </div>
                <div class="admin-list-actions">
                    <button class="btn btn-edit" data-id="${service.id}">Edit</button>
                    <button class="btn btn-delete" data-id="${service.id}">Delete</button>
                </div>
            `;
            servicesList.appendChild(li);
        });
        
        // Add event listeners to edit/delete buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                editService(id);
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteService(id);
            });
        });
    }
    
    // Load testimonials to public page
    function loadTestimonials() {
        testimonialsContainer.innerHTML = '';
        
        testimonials.forEach(testimonial => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            
            // Create star rating
            let stars = '';
            for (let i = 0; i < testimonial.rating; i++) {
                stars += '★';
            }
            
            testimonialCard.innerHTML = `
                <div class="rating">${stars}</div>
                <p>"${testimonial.content}"</p>
                <div class="author">- ${testimonial.author}</div>
            `;
            testimonialsContainer.appendChild(testimonialCard);
        });
        
        // Also load to admin list
        loadTestimonialsAdmin();
    }
    
    // Load testimonials to admin panel
    function loadTestimonialsAdmin() {
        testimonialsList.innerHTML = '';
        
        testimonials.forEach(testimonial => {
            const li = document.createElement('li');
            li.className = 'admin-list-item';
            li.innerHTML = `
                <div>
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.content.substring(0, 50)}...</p>
                </div>
                <div class="admin-list-actions">
                    <button class="btn btn-edit" data-id="${testimonial.id}">Edit</button>
                    <button class="btn btn-delete" data-id="${testimonial.id}">Delete</button>
                </div>
            `;
            testimonialsList.appendChild(li);
        });
        
        // Add event listeners to edit/delete buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                editTestimonial(id);
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteTestimonial(id);
            });
        });
    }
    
    // Load gallery to public page
    function loadGallery() {
        carouselTrack.innerHTML = '';
        carouselDots.innerHTML = '';
        
        // Create slides
        galleryImages.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.dataset.index = index;
            slide.innerHTML = `
                <img src="${image.image}" alt="${image.title || 'Clinic Image'}" data-id="${image.id}">
            `;
            carouselTrack.appendChild(slide);
            
            // Create navigation dots
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.dataset.index = index;
            carouselDots.appendChild(dot);
        });
        
        // Clone first few slides to beginning and last few to end for infinite effect
        const firstSlides = Array.from(carouselTrack.children).slice(0, 3).map(el => el.cloneNode(true));
        const lastSlides = Array.from(carouselTrack.children).slice(-3).map(el => el.cloneNode(true));
        
        firstSlides.reverse().forEach(slide => {
            carouselTrack.insertBefore(slide, carouselTrack.firstChild);
        });
        
        lastSlides.forEach(slide => {
            carouselTrack.appendChild(slide.cloneNode(true));
        });
        
        // Initialize carousel
        initCarousel();
        
        // Add event listeners
        addCarouselEventListeners();
        
        // Also load to admin list
        loadGalleryAdmin();
    }

    function initCarousel() {
        slideWidth = carouselTrack.children[0].offsetWidth;
        totalSlides = galleryImages.length;
        
        // Set initial position (accounting for cloned slides)
        currentSlide = 3; // Start at first original slide (after clones)
        updateCarouselPosition();
        updateDots();
        
        // Start auto-scroll
        startCarousel();
    }

    function startCarousel() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, 2000); // 2 seconds delay between slides
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= totalSlides + 3) { // Account for cloned slides
            // When we reach the end of original slides + clones, 
            // instantly (without animation) jump to the first original slide
            currentSlide = 3;
            carouselTrack.style.transition = 'none';
            updateCarouselPosition();
            // Force reflow to apply the instant change
            carouselTrack.offsetHeight;
            // Then animate the next slide
            currentSlide++;
            carouselTrack.style.transition = 'transform 0.5s ease';
        }
        updateCarouselPosition();
        updateDots();
    }

    function updateCarouselPosition() {
        const offset = -currentSlide * slideWidth;
        carouselTrack.style.transform = `translateX(${offset}px)`;
    }

    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        const activeIndex = currentSlide % totalSlides;
        
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        currentSlide = index + 3; // Account for cloned slides
        updateCarouselPosition();
        updateDots();
    }

    function addCarouselEventListeners() {
        // Pause on hover
        carouselTrack.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            isPaused = false;
        });
        
        // Click on slide to show modal
        document.querySelectorAll('.carousel-slide img').forEach(img => {
            img.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                showImageDetails(id);
            });
        });
        
        // Navigation dots
        document.querySelectorAll('.carousel-dot').forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                goToSlide(index);
                // Reset autoplay timer
                clearInterval(carouselInterval);
                startCarousel();
            });
        });
    }

    function showImageDetails(id) {
        const image = galleryImages.find(img => img.id === id);
        if (image) {
            modalImage.src = image.image;
            modalImage.alt = image.title;
            modalTitle.textContent = image.title;
            modalDescription.textContent = image.description;
            imageModal.style.display = 'flex';
            
            // Pause carousel while modal is open
            isPaused = true;
        }
    }

    function closeImageModal() {
        imageModal.style.display = 'none';
        isPaused = false;
    }
    
    // Load gallery to admin panel
    function loadGalleryAdmin() {
        galleryList.innerHTML = '';
        
        galleryImages.forEach(image => {
            const li = document.createElement('li');
            li.className = 'admin-list-item';
            li.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="${image.image}" style="width: 60px; height: 40px; object-fit: cover; margin-right: 1rem; border-radius: 4px;">
                    <div>
                        <h4>${image.title || 'Untitled Image'}</h4>
                    </div>
                </div>
                <div class="admin-list-actions">
                    <button class="btn btn-delete" data-id="${image.id}">Delete</button>
                </div>
            `;
            galleryList.appendChild(li);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteGalleryImage(id);
            });
        });
    }
    
    // Service CRUD functions
    function showServiceForm() {
        serviceForm.style.display = 'block';
        serviceTitle.value = '';
        serviceDescription.value = '';
        serviceImage.value = '';
        serviceImagePreview.innerHTML = '';
        serviceId.value = '';
        currentEditingItem = null;
        addServiceBtn.style.display = 'none';
    }
    
    function hideServiceForm() {
        serviceForm.style.display = 'none';
        addServiceBtn.style.display = 'block';
    }
    
    function previewServiceImage() {
        const file = serviceImage.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                serviceImagePreview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 200px;">`;
            };
            reader.readAsDataURL(file);
        }
    }
    
    function editService(id) {
        const service = services.find(s => s.id === id);
        if (service) {
            currentEditingItem = service;
            serviceTitle.value = service.title;
            serviceDescription.value = service.description;
            serviceId.value = service.id;
            serviceImagePreview.innerHTML = `<img src="${service.image}" style="max-width: 100%; max-height: 200px;">`;
            serviceForm.style.display = 'block';
            addServiceBtn.style.display = 'none';
        }
    }
    
    function saveService() {
        const title = serviceTitle.value.trim();
        const description = serviceDescription.value.trim();
        const id = serviceId.value ? parseInt(serviceId.value) : null;
        
        if (!title || !description) {
            alert('Please fill in all fields');
            return;
        }
        
        if (currentEditingItem) {
            // Update existing service
            const index = services.findIndex(s => s.id === currentEditingItem.id);
            if (index !== -1) {
                services[index].title = title;
                services[index].description = description;
                
                // Update image if a new one was selected
                if (serviceImage.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        services[index].image = e.target.result;
                        loadServices();
                        hideServiceForm();
                    };
                    reader.readAsDataURL(serviceImage.files[0]);
                } else {
                    loadServices();
                    hideServiceForm();
                }
            }
        } else {
            // Add new service
            const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
            
            if (serviceImage.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    services.push({
                        id: newId,
                        title: title,
                        description: description,
                        image: e.target.result
                    });
                    loadServices();
                    hideServiceForm();
                };
                reader.readAsDataURL(serviceImage.files[0]);
            } else {
                alert('Please select an image for the service');
            }
        }
    }
    
    function deleteService(id) {
        if (confirm('Are you sure you want to delete this service?')) {
            services = services.filter(s => s.id !== id);
            loadServices();
        }
    }
    
    // Testimonial CRUD functions
    function showTestimonialForm() {
        testimonialForm.style.display = 'block';
        testimonialAuthor.value = '';
        testimonialContent.value = '';
        testimonialRating.value = '5';
        testimonialId.value = '';
        currentEditingItem = null;
        addTestimonialBtn.style.display = 'none';
    }
    
    function hideTestimonialForm() {
        testimonialForm.style.display = 'none';
        addTestimonialBtn.style.display = 'block';
    }
    
    function editTestimonial(id) {
        const testimonial = testimonials.find(t => t.id === id);
        if (testimonial) {
            currentEditingItem = testimonial;
            testimonialAuthor.value = testimonial.author;
            testimonialContent.value = testimonial.content;
            testimonialRating.value = testimonial.rating;
            testimonialId.value = testimonial.id;
            testimonialForm.style.display = 'block';
            addTestimonialBtn.style.display = 'none';
        }
    }
    
    function saveTestimonial() {
        const author = testimonialAuthor.value.trim();
        const content = testimonialContent.value.trim();
        const rating = parseInt(testimonialRating.value);
        const id = testimonialId.value ? parseInt(testimonialId.value) : null;
        
        if (!author || !content) {
            alert('Please fill in all fields');
            return;
        }
        
        if (currentEditingItem) {
            // Update existing testimonial
            const index = testimonials.findIndex(t => t.id === currentEditingItem.id);
            if (index !== -1) {
                testimonials[index].author = author;
                testimonials[index].content = content;
                testimonials[index].rating = rating;
                loadTestimonials();
                hideTestimonialForm();
            }
        } else {
            // Add new testimonial
            const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
            testimonials.push({
                id: newId,
                author: author,
                content: content,
                rating: rating
            });
            loadTestimonials();
            hideTestimonialForm();
        }
    }
    
    function deleteTestimonial(id) {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            testimonials = testimonials.filter(t => t.id !== id);
            loadTestimonials();
        }
    }
    
    // Gallery CRUD functions
    function showGalleryForm() {
        galleryForm.style.display = 'block';
        galleryImageTitle.value = '';
        galleryImageDescription.value = '';
        galleryImage.value = '';
        galleryImagePreview.innerHTML = '';
        galleryImageId.value = '';
        currentEditingItem = null;
        addGalleryImageBtn.style.display = 'none';
    }
    
    function hideGalleryForm() {
        galleryForm.style.display = 'none';
        addGalleryImageBtn.style.display = 'block';
    }
    
    function previewGalleryImage() {
        const file = galleryImage.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                galleryImagePreview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 200px;">`;
            };
            reader.readAsDataURL(file);
        }
    }
    
    function saveGalleryImage() {
        const title = galleryImageTitle.value.trim();
        const description = galleryImageDescription.value.trim();
        
        if (galleryImage.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newId = galleryImages.length > 0 ? Math.max(...galleryImages.map(g => g.id)) + 1 : 1;
                
                galleryImages.push({
                    id: newId,
                    title: title,
                    description: description,
                    image: e.target.result
                });
                
                // Reset carousel
                clearInterval(carouselInterval);
                loadGallery();
                startCarousel();
                hideGalleryForm();
            };
            reader.readAsDataURL(galleryImage.files[0]);
        } else {
            alert('Please select an image');
        }
    }
    
    function deleteGalleryImage(id) {
        if (confirm('Are you sure you want to delete this image?')) {
            galleryImages = galleryImages.filter(g => g.id !== id);
            
            // Reset carousel
            clearInterval(carouselInterval);
            loadGallery();
            startCarousel();
        }
    }
</script>