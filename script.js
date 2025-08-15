// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize Social Proof
    console.log('Initializing Social Proof...');

    // Social Proof functionality - Updated with exact data from Next.js component
    const REVIEWS = {
        flavor: [
            { rating: 5, quote: "Bright orange flavor—clean, not candy-sweet. It actually makes the habit easy.", author: "Maya R." },
            { rating: 5, quote: "Tastes like fresh citrus. I take two after my morning coffee and never forget.", author: "Jules D." },
            { rating: 4, quote: "Light and refreshing. Zero sugar but still satisfying—huge win for me.", author: "Andrew P." },
        ],
        benefit: [
            { rating: 5, quote: "Daily feels steadier—no theatrics, just a routine I can keep.", author: "Sofia L." },
            { rating: 5, quote: "My digestion is more predictable. Simple, consistent, and portable.", author: "Dustin O." },
            { rating: 4, quote: "Small habit, real payoff in day-to-day comfort.", author: "Kim V." },
        ],
        ingredients: [
            { rating: 5, quote: "Clear label with turmeric, ginger, milk thistle—clinically informed picks.", author: "Renee T." },
            { rating: 5, quote: "Love the sugar-free formula and vegan pectin base. Clean and considered.", author: "Ben K." },
            { rating: 4, quote: "The blend makes sense and the taste proves it.", author: "Priya M." },
        ],
        convenience: [
            { rating: 5, quote: "Way easier than powders. Two gummies and I'm out the door.", author: "Kate S." },
            { rating: 5, quote: "No shaker, no sink. I keep a pack in my bag for travel.", author: "Kevin M." },
            { rating: 4, quote: "Zero prep, takes seconds. The definition of keepable.", author: "Liam H." },
        ],
    };

    // Utility to clamp rating 0..5 - exact implementation from Next.js component
    const clamp = (n) => Math.max(0, Math.min(5, Math.round(n)));

    // Stars component - exact implementation from Next.js component
    function createStars(rating) {
        const v = clamp(rating);
        const starsContainer = document.createElement('div');
        starsContainer.className = 'review-stars';
        starsContainer.setAttribute('aria-label', `${v} out of 5 stars`);

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('svg');
            const filled = i < v;
            star.setAttribute('viewBox', '0 0 20 20');
            star.setAttribute('width', '20');
            star.setAttribute('height', '20');
            star.setAttribute('aria-hidden', 'true');
            star.style.display = 'block';

            const path = document.createElement('path');
            path.setAttribute('d', 'M10 1.5l2.47 4.98 5.5.8-3.98 3.88.94 5.49L10 14.98 5.07 16.65l.94-5.49L2.03 7.28l5.5-.8L10 1.5z');
            path.setAttribute('fill', filled ? '#fb923c' : 'rgba(255,255,255,0.15)');
            path.setAttribute('stroke', filled ? 'transparent' : 'rgba(255,255,255,0.25)');
            path.setAttribute('stroke-width', filled ? '0' : '1');

            star.appendChild(path);
            starsContainer.appendChild(star);
        }

        console.log(`Created ${v} filled stars for review (rating: ${rating})`);
        console.log('Stars container:', starsContainer);
        console.log('Stars container children:', starsContainer.children.length);
        return starsContainer;
    }

    // Create review card
    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card fade-in';

        const stars = createStars(review.rating);
        const quote = document.createElement('p');
        quote.className = 'review-quote';
        quote.textContent = review.quote;

        const author = document.createElement('p');
        author.className = 'review-author';
        author.textContent = review.author;

        card.appendChild(stars);
        card.appendChild(quote);
        card.appendChild(author);

        console.log('Review card created:', card);
        console.log('Review card children:', card.children.length);
        console.log('Stars in card:', card.querySelector('.review-stars'));

        return card;
    }

    // Update reviews display
    function updateReviews(category) {
        const reviewsGrid = document.getElementById('reviews-grid');
        console.log('Looking for reviews-grid, found:', reviewsGrid);
        if (!reviewsGrid) {
            console.log('Reviews grid not found, returning early');
            return;
        }

        const reviews = REVIEWS[category];

        // Fade out current reviews
        const currentCards = reviewsGrid.querySelectorAll('.review-card');
        currentCards.forEach(card => {
            card.classList.remove('fade-in');
            card.classList.add('fade-out');
        });

        // Wait for fade out, then update content
        setTimeout(() => {
            reviewsGrid.innerHTML = '';

            reviews.forEach(review => {
                const card = createReviewCard(review);
                reviewsGrid.appendChild(card);
            });

            // Trigger fade in
            setTimeout(() => {
                const newCards = reviewsGrid.querySelectorAll('.review-card');
                newCards.forEach(card => {
                    card.classList.remove('fade-out');
                    card.classList.add('fade-in');
                });
            }, 50);
        }, 300);
    }

    // Tab switching functionality
    function initializeSocialProof() {
        const tabButtons = document.querySelectorAll('.tab-button');
        console.log('Found tab buttons:', tabButtons.length);
        if (tabButtons.length === 0) {
            console.log('No tab buttons found, returning early');
            return;
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');

                // Update button states
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });

                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');

                // Update reviews
                updateReviews(category);
            });

            // Keyboard navigation
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });

        // Initialize with flavor reviews
        console.log('Initializing with flavor reviews...');
        updateReviews('flavor');
        console.log('Flavor reviews initialized');
    }

    // Initialize Social Proof
    initializeSocialProof();
    console.log('Social Proof initialization complete');

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate elements on scroll
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit-card, .testimonial-card, .trust-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

            // Product video hover effect and video-to-image transition
    const productVideoContainer = document.querySelector('.product-video-container');
    const productVideo = document.querySelector('.product-video');
    const productImageFallback = document.querySelector('.product-image-fallback');

    if (productVideoContainer) {
        productVideoContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        productVideoContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Handle video-to-image transition
    if (productVideo && productImageFallback) {
        productVideo.addEventListener('ended', function() {
            // Fade out video
            this.classList.add('fade-out');

            // Fade in image after a short delay
            setTimeout(() => {
                productImageFallback.classList.add('fade-in');
            }, 500);
        });

        // Also handle if video fails to load
        productVideo.addEventListener('error', function() {
            productImageFallback.classList.add('fade-in');
        });
    }

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Ingredients Carousel
    class IngredientsCarousel {
        constructor() {
            this.carousel = document.querySelector('.ingredients-carousel');
            this.track = document.querySelector('.carousel-track');
            this.coins = document.querySelectorAll('.ingredient-coin');
            this.currentIndex = 0;
            this.totalCoins = this.coins.length;
            this.interval = null;
            this.intervalTime = 6000; // 6 seconds
            this.isPaused = false;

            this.init();
        }

        init() {
            if (!this.carousel || this.coins.length === 0) return;

            this.updateCarousel();
            this.startAutoPlay();
            this.addEventListeners();
        }

        updateCarousel() {
            this.coins.forEach((coin, index) => {
                // Remove all classes
                coin.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');

                // Calculate position relative to current index
                const diff = index - this.currentIndex;

                // Handle wrapping around
                let adjustedDiff = diff;
                if (diff > this.totalCoins / 2) {
                    adjustedDiff = diff - this.totalCoins;
                } else if (diff < -this.totalCoins / 2) {
                    adjustedDiff = diff + this.totalCoins;
                }

                // Apply appropriate class based on position
                if (adjustedDiff === 0) {
                    coin.classList.add('active');
                } else if (adjustedDiff === -1) {
                    coin.classList.add('prev');
                } else if (adjustedDiff === 1) {
                    coin.classList.add('next');
                } else if (adjustedDiff === -2) {
                    coin.classList.add('far-prev');
                } else if (adjustedDiff === 2) {
                    coin.classList.add('far-next');
                }
            });
        }

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.totalCoins;
            this.updateCarousel();
        }

        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.totalCoins) % this.totalCoins;
            this.updateCarousel();
        }

        startAutoPlay() {
            console.log('Carousel interval set to:', this.intervalTime, 'ms');
            this.interval = setInterval(() => {
                if (!this.isPaused) {
                    this.next();
                }
            }, this.intervalTime);
        }

        pause() {
            this.isPaused = true;
        }

        resume() {
            this.isPaused = false;
        }

        resetAutoPlay() {
            // Clear current interval and restart
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.startAutoPlay();
        }

        addEventListeners() {
            // Arrow button clicks
            const leftArrow = this.carousel.querySelector('.carousel-arrow-left');
            const rightArrow = this.carousel.querySelector('.carousel-arrow-right');

            if (leftArrow) {
                leftArrow.addEventListener('click', () => {
                    this.prev();
                    this.resetAutoPlay();
                });
            }

            if (rightArrow) {
                rightArrow.addEventListener('click', () => {
                    this.next();
                    this.resetAutoPlay();
                });
            }

            // Pause on hover
            this.carousel.addEventListener('mouseenter', () => {
                this.pause();
            });

            this.carousel.addEventListener('mouseleave', () => {
                this.resume();
            });

            // Pause on focus (for accessibility)
            this.carousel.addEventListener('focusin', () => {
                this.pause();
            });

            this.carousel.addEventListener('focusout', () => {
                this.resume();
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (this.carousel.matches(':hover') || this.carousel.matches(':focus-within')) {
                    if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        this.prev();
                        this.resetAutoPlay();
                    } else if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        this.next();
                        this.resetAutoPlay();
                    }
                }
            });
        }
    }

    // Initialize carousel
    new IngredientsCarousel();

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Counter animation for reviews
    const reviewsText = document.querySelector('.reviews p');
    if (reviewsText) {
        const originalText = reviewsText.textContent;
        const numberMatch = originalText.match(/(\d+)/);
        if (numberMatch) {
            const targetNumber = parseInt(numberMatch[1]);
            let currentNumber = 0;
            const increment = targetNumber / 50;

            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    currentNumber = targetNumber;
                    clearInterval(counter);
                }
                reviewsText.textContent = originalText.replace(numberMatch[1], Math.floor(currentNumber).toLocaleString());
            }, 50);
        }
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle (if needed in future)
    function createMobileMenu() {
        const nav = document.querySelector('.nav');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.display = 'none';

        nav.appendChild(mobileMenuBtn);

        mobileMenuBtn.addEventListener('click', function() {
            const navCenter = document.querySelector('.nav-center');
            navCenter.classList.toggle('mobile-active');
        });

        // Show mobile menu button on small screens
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
            } else {
                mobileMenuBtn.style.display = 'none';
                document.querySelector('.nav-center').classList.remove('mobile-active');
            }
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }

    createMobileMenu();
});

// Add some additional CSS for mobile menu
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    .mobile-menu-btn {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
    }

    @media (max-width: 768px) {
        .nav-center {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.98);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
        }

        .nav-center.mobile-active {
            transform: translateY(0);
            opacity: 1;
        }

        .nav-menu {
            flex-direction: column;
            gap: 1rem;
        }
    }
`;
document.head.appendChild(mobileStyles);

// LQIP (Low Quality Image Placeholder) handling
document.addEventListener('DOMContentLoaded', function() {
    const featureImages = document.querySelectorAll('.feature-top-img[src*="-blur.jpg"]');

    featureImages.forEach(img => {
        // Create a new image to preload the high-res version
        const highResImg = new Image();

        // Get the WebP source if available, otherwise fallback to JPEG
        const picture = img.closest('picture');
        const webpSource = picture?.querySelector('source[type="image/webp"]');
        const jpegSource = picture?.querySelector('source[type="image/jpeg"]');

        if (webpSource) {
            highResImg.src = webpSource.srcset;
        } else if (jpegSource) {
            highResImg.src = jpegSource.srcset;
        }

        // When high-res image loads, replace the blur placeholder
        highResImg.onload = function() {
            img.src = highResImg.src;
            img.classList.add('loaded');
        };

        // Fallback if high-res image fails to load
        highResImg.onerror = function() {
            if (jpegSource) {
                img.src = jpegSource.srcset;
                img.classList.add('loaded');
            }
        };
    });
});

    // FAQ with CTA Accordion functionality - Livera Style
    function initializeFAQLivera() {
        const faqQuestions = document.querySelectorAll('.faq-livera-question');

        faqQuestions.forEach((question, index) => {
            const answer = question.nextElementSibling;

            // Set initial state (first item open by default)
            if (index === 0) {
                question.setAttribute('aria-expanded', 'true');
                answer.classList.add('expanded');
            }

            // Click handler
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';

                // Close all other items
                faqQuestions.forEach((otherQuestion, otherIndex) => {
                    if (otherIndex !== index) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherQuestion.nextElementSibling.classList.remove('expanded');
                    }
                });

                // Toggle current item
                if (isExpanded) {
                    question.setAttribute('aria-expanded', 'false');
                    answer.classList.remove('expanded');
                } else {
                    question.setAttribute('aria-expanded', 'true');
                    answer.classList.add('expanded');
                }
            });

            // Keyboard navigation
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }

    // Initialize FAQ with CTA - Livera Style
    initializeFAQLivera();
