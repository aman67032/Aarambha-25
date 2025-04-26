document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Schedule Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Initialize schedule data for all days
    const scheduleData = {
        day1: [
            {
                time: '9:00 AM - 10:30 AM',
                title: 'Registration & Welcome Kit Distribution',
                location: 'Main Auditorium'
            },
            {
                time: '11:00 AM - 12:30 PM',
                title: 'Inaugural Ceremony',
                location: 'Main Auditorium'
            },
            {
                time: '1:30 PM - 2:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '3:00 PM - 5:00 PM',
                title: 'Ice Breaking Sessions',
                location: 'Department-wise Activity Areas'
            }
        ],
        day2: [
            {
                time: '9:30 AM - 11:00 AM',
                title: 'University Tour',
                location: 'Campus Grounds'
            },
            {
                time: '11:30 AM - 1:00 PM',
                title: 'Department Introduction',
                location: 'Respective Departments'
            },
            {
                time: '1:00 PM - 2:00 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '2:30 PM - 4:30 PM',
                title: 'Industry Expert Talk',
                location: 'Seminar Hall'
            },
            {
                time: '5:00 PM - 7:00 PM',
                title: 'Cultural Activities',
                location: 'Central Lawn'
            }
        ],
        day3: [
            {
                time: '9:30 AM - 11:30 AM',
                title: 'Workshop: Career Planning',
                location: 'Lecture Hall 1'
            },
            {
                time: '12:00 PM - 1:30 PM',
                title: 'Alumni Interaction',
                location: 'Seminar Hall'
            },
            {
                time: '1:30 PM - 2:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '3:00 PM - 6:00 PM',
                title: 'Sports & Games',
                location: 'Sports Complex'
            }
        ],
        day4: [
            {
                time: '9:30 AM - 12:30 PM',
                title: 'Technical Workshop',
                location: 'Computer Labs'
            },
            {
                time: '12:30 PM - 1:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '2:00 PM - 4:00 PM',
                title: 'Entrepreneurship Session',
                location: 'E-Cell Hub'
            },
            {
                time: '4:30 PM - 6:30 PM',
                title: 'Talent Hunt Preliminaries',
                location: 'Auditorium'
            }
        ],
        day5: [
            {
                time: '10:00 AM - 12:00 PM',
                title: 'Motivational Talk',
                location: 'Main Auditorium'
            },
            {
                time: '12:30 PM - 1:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '2:00 PM - 5:00 PM',
                title: 'Cultural Night & Talent Hunt Finals',
                location: 'Main Auditorium'
            },
            {
                time: '5:30 PM - 7:00 PM',
                title: 'Closing Ceremony',
                location: 'Main Auditorium'
            }
        ]
    };
    
    // Function to create schedule HTML
    function createScheduleHTML(day) {
        const scheduleItems = scheduleData[day];
        let html = '';
        
        scheduleItems.forEach(item => {
            html += `
                <div class="schedule-item">
                    <div class="time">${item.time}</div>
                    <div class="event-details">
                        <h3>${item.title}</h3>
                        <p>${item.location}</p>
                    </div>
                </div>
            `;
        });
        
        return html;
    }
    
    // Initially load day 1 schedule
    const day1Content = document.getElementById('day1');
    if (day1Content) {
        day1Content.innerHTML = createScheduleHTML('day1');
    }
    
    // Tab switching
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the day data attribute
                const day = this.getAttribute('data-day');
                
                // Hide all tab panes
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Show the selected tab pane
                const tabPane = document.getElementById(day);
                if (!tabPane) {
                    // Create tab pane if it doesn't exist
                    const newPane = document.createElement('div');
                    newPane.id = day;
                    newPane.className = 'tab-pane active';
                    newPane.innerHTML = createScheduleHTML(day);
                    document.querySelector('.tab-content').appendChild(newPane);
                } else {
                    tabPane.classList.add('active');
                    // Update content if it's empty
                    if (tabPane.innerHTML.trim() === '') {
                        tabPane.innerHTML = createScheduleHTML(day);
                    }
                }
            });
        });
    }
    
    // Registration Form Submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const course = document.getElementById('course').value;
            const year = document.getElementById('year').value;
            
            if (!name || !email || !phone || !course || !year) {
                alert('Please fill all the fields');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Registration successful! We will contact you soon.');
            registerForm.reset();
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
    }
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-header, .about-content, .event-card, .speaker-card, .gallery-item, .mosaic-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const screenPosition = windowHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.section-header, .about-content, .event-card, .speaker-card, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Additional mobile menu functionality
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Animate hero content on page load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('loaded');
        }
    }, 300);

    // Parallax effect for decorative elements
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Apply to floating circles
        document.querySelectorAll('.circle').forEach((circle, index) => {
            const speed = (index + 1) * 2;
            const xPos = (x * speed);
            const yPos = (y * speed);
            circle.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });

    // Initialize particle grid
    const particleGrid = document.getElementById('particle-grid');
    if (particleGrid) {
        const gridSize = 20;
        const rows = Math.ceil(window.innerHeight / gridSize);
        const cols = Math.ceil(window.innerWidth / gridSize);
        
        for (let i = 0; i < rows * cols / 3; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particleGrid.appendChild(particle);
        }
    }

    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Image gallery interaction
    document.querySelectorAll('.mosaic-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            document.querySelectorAll('.mosaic-item').forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.add('dim');
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            document.querySelectorAll('.mosaic-item').forEach(otherItem => {
                otherItem.classList.remove('dim');
            });
        });
    });

    // Dynamic year update
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(element => {
        element.textContent = currentYear;
    });

    // Custom cursor effect
    initCustomCursor();
    
    // Create morph shapes for background
    if (typeof createMorphShapes === 'function') {
        createMorphShapes();
    }

    // Video Modal Popup functionality
    initVideoModal();
});

// Custom cursor effect
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add slight delay to outline for smooth effect
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 80);
    });
    
    // Scale effect on clickable elements
    const clickables = document.querySelectorAll(
        'a, button, .mosaic-item, .speaker-card, .event-card, input, select, .download-btn, .video-card, .video-preview, .play-overlay'
    );
    
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--accent-color)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--primary-color)';
        });
    });
    
    // Hide on mouse leave
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
}

// Create morph shapes for background (placeholder function - implement if needed)
function createMorphShapes() {
    // Implementation of createMorphShapes function would go here
    // This is left as a placeholder since the implementation wasn't provided
}

// Video Modal Popup functionality
function initVideoModal() {
    const videoCards = document.querySelectorAll('.video-card');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoSource = document.getElementById('modalVideoSource');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modal || !modalVideo || !modalVideoSource) return;
    
    // Open modal when clicking on a video card
    videoCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const videoSrc = this.getAttribute('data-video');
            if (!videoSrc) return;
            
            // Set the video source and load it
            modalVideoSource.setAttribute('src', videoSrc);
            modalVideo.load();
            
            // Show the modal with animation
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
                setTimeout(() => {
                    // Start playing when animation is complete
                    modalVideo.play().catch(e => console.log('Video play error:', e));
                }, 400);
            }, 10);
            
            // Disable body scroll
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Also make the video previews and play overlays clickable
    document.querySelectorAll('.video-preview, .play-overlay').forEach(element => {
        element.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent double triggering
            const videoCard = this.closest('.video-card');
            if (videoCard) {
                videoCard.click(); // Trigger the click on the parent card
            }
        });
    });
    
    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the video
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modalVideo.pause();
        modal.classList.remove('show');
        
        // Hide modal after animation completes
        setTimeout(() => {
            modal.style.display = 'none';
            modalVideoSource.setAttribute('src', '');
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Ensure preview videos loop continuously
    const previewVideos = document.querySelectorAll('.video-preview video');
    previewVideos.forEach(video => {
        // Force loop and autoplay for preview videos
        video.loop = true;
        video.muted = true;
        video.autoplay = true;
        
        // Make sure videos play
        video.play().catch(e => {
            console.log('Preview video play error:', e);
            // Retry playing after a short delay
            setTimeout(() => {
                video.play().catch(() => {});
            }, 1000);
        });
        
        // Add event listener to restart if it stops
        video.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play().catch(() => {});
        });
    });
} 