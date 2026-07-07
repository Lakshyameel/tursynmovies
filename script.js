/**
 * Tursyn Movies - Core Application Script
 * Version: 1.0.0 (2026)
 * Description: Interface handling for FAQ accordions, performance scroll-spy tracking, 
 * dynamic counting animations, and heavy visual effects.
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // PART 1 — FILE SETUP & GLOBAL VARIABLES (Approx. 40-60 lines)
    // =========================================================================
    
    // --- Configuration Variables ---
    const CONFIG = {
        scrollOffsetPercent: 0.1,    // Threshold adjustments for scroll tracking
        counterDuration: 2000,       // Duration of numbers count-up animation (ms)
        navbarScrollThreshold: 50    // Scroll pixel depth before navbar modifies state
    };

    // --- Query Selectors ---
    const DOM = {
        header: document.querySelector("header"),
        navbar: document.querySelector(".navbar"),
        navLinks: document.querySelectorAll(".navbar ul li a"),
        hero: document.querySelector(".hero"),
        heroContent: document.querySelector(".hero-content"),
        heroButtons: document.querySelectorAll(".hero-buttons .download-btn, .hero-buttons .tutorial-btn"),
        heroStatsItems: document.querySelectorAll(".hero-stats > div"),
        counterElements: document.querySelectorAll(".hero-stats h2"),
        faqQuestions: document.querySelectorAll(".faq-question"),
        galleryItems: document.querySelectorAll(".gallery-item"),
        timelineItems: document.querySelectorAll(".timeline-item"),
        allSections: document.querySelectorAll("section[id]")
    };

    // --- Helper Functions ---
    /**
     * Safely parses target numbers from metric elements strings (e.g., "100%" -> 100)
     * @param {string} text - Raw content found inside text node
     * @returns {number} Extracted target digits
     */
    const extractDigits = (text) => {
        const clean = text.replace(/[^0-9]/g, "");
        return clean ? parseInt(clean, 10) : 0;
    };

    // --- Initial Execution Bootstrapper ---
    const initApp = () => {
        setupHeroEntranceStyles();
        setupScrollObserverTriggers();
    };


    // =========================================================================
    // PART 2 — STICKY HEADER & NAVIGATION (Approx. 80 lines)
    // =========================================================================
    
    /**
     * Updates navbar transparency visual configuration based on vertical baseline depth
     */
    const handleNavbarScrollEffect = () => {
        if (window.scrollY > CONFIG.navbarScrollThreshold) {
            DOM.navbar.classList.add("scrolled");
        } else {
            DOM.navbar.classList.remove("scrolled");
        }
    };

    /**
     * Intercepts standard anchors to track layout height calculations and trigger soft smooth scrolls
     */
    const setupSmoothScrollNavigation = () => {
        const activeScrollAnchors = document.querySelectorAll(
            '.navbar ul li a, .hero-buttons a[href^="#"], .cta-buttons a[href^="#"], .footer-links a[href^="#"]'
        );

        activeScrollAnchors.forEach(anchor => {
            anchor.addEventListener("click", function (e) {
                const targetId = this.getAttribute("href");
                
                if (targetId.startsWith("#")) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const navbarHeight = DOM.navbar ? DOM.navbar.offsetHeight : 0;
                        const targetPosition = targetSection.offsetTop - navbarHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: "smooth"
                        });
                        
                        // Close fallback mobile responsive menus here if implemented later
                        if (DOM.navbar.classList.contains("mobile-active")) {
                            DOM.navbar.classList.remove("mobile-active");
                        }
                    }
                }
            });
        });
    };

    /**
     * Matches scroll depth coordinate spaces to toggle operational links actively highlighted
     */
    const runScrollSpyLinkTracker = () => {
        const scrollPosition = window.scrollY + (DOM.navbar ? DOM.navbar.offsetHeight : 0) + 20;

        DOM.allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                DOM.navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    // Global Scroll Listener Bindings
    window.addEventListener("scroll", () => {
        handleNavbarScrollEffect();
        runScrollSpyLinkTracker();
    });

    setupSmoothScrollNavigation();


    // =========================================================================
    // PART 3 — HERO ANIMATIONS (Approx. 100 lines)
    // =========================================================================
    
    /**
     * Inject inline functional CSS targets enabling hardware-accelerated animations 
     */
    function setupHeroEntranceStyles() {
        // Hero core structure initialization styles
        if (DOM.heroContent) {
            DOM.heroContent.style.opacity = "0";
            DOM.heroContent.style.transform = "translateY(40px)";
            DOM.heroContent.style.transition = "opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
        }

        // Hero Button configurations
        DOM.heroButtons.forEach((btn, index) => {
            btn.style.opacity = "0";
            btn.style.transform = "scale(0.9) translateY(15px)";
            btn.style.transition = `opacity 0.6s ease ${0.6 + index * 0.2}s, transform 0.6s ease ${0.6 + index * 0.2}s, background-color 0.3s ease, box-shadow 0.3s ease`;
        });

        // Statistics blocks metrics staggered declarations
        DOM.heroStatsItems.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            item.style.transition = `opacity 0.8s ease ${1.0 + index * 0.15}s, transform 0.8s ease ${1.0 + index * 0.15}s`;
        });

        // Trigger safe delayed structural calculations layout renderings
        requestAnimationFrame(() => {
            if (DOM.heroContent) {
                DOM.heroContent.style.opacity = "1";
                DOM.heroContent.style.transform = "translateY(0)";
            }
            DOM.heroButtons.forEach(btn => {
                btn.style.opacity = "1";
                btn.style.transform = "scale(1) translateY(0)";
            });
            DOM.heroStatsItems.forEach(item => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            });
        });
    }

    /**
     * Interactive mouse engine tracing tracking layer perspectives over Hero backgrounds
     */
    if (DOM.hero) {
        DOM.hero.addEventListener("mousemove", (e) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Generate clean normalized axis floating fractions (-0.5 to 0.5)
            const xAxis = (e.clientX / width) - 0.5;
            const yAxis = (e.clientY / height) - 0.5;
            
            // Restrained perspective modifications parameters values
            if (DOM.heroContent) {
                DOM.heroContent.style.transform = `translate3d(${xAxis * 15}px, ${yAxis * 15}px, 0)`;
            }
        });

        // Re-align variables automatically if user cursor exists boundaries frame
        DOM.hero.addEventListener("mouseleave", () => {
            if (DOM.heroContent) {
                DOM.heroContent.style.transform = "translate3d(0px, 0px, 0px)";
            }
        });
    }


    // =========================================================================
    // PART 4 — ANIMATED COUNTERS (Approx. 70 lines)
    // =========================================================================
    
    /**
     * Standard functional mapping routine processing incremental linear digit scaling calculations
     * @param {HTMLElement} element - Target header element DOM token element
     */
    const animateMetricCounter = (element) => {
        const rawText = element.textContent.trim();
        const targetValue = extractDigits(rawText);
        const suffix = rawText.replace(/[0-9]/g, ""); // Pull character tokens like '%', 'v' 
        
        let startTimestamp = null;

        const countingStep = (currentTimestamp) => {
            if (!startTimestamp) startTimestamp = currentTimestamp;
            const progress = currentTimestamp - startTimestamp;
            
            // Safe mathematical progress percent capped calculation
            const progressPercentage = Math.min(progress / CONFIG.counterDuration, 1);
            
            // Ease-out numerical tracking logic 
            const easedProgress = 1 - Math.pow(1 - progressPercentage, 3);
            const currentComputedCount = Math.floor(easedProgress * targetValue);

            // Re-render visual content checks
            if (suffix && suffix !== rawText) {
                element.textContent = currentComputedCount + suffix;
            } else if (isNaN(rawText)) {
                element.textContent = currentComputedCount + " " + rawText.replace(/[0-9\s]/g, "");
            } else {
                element.textContent = currentComputedCount;
            }

            if (progressPercentage < 1) {
                window.requestAnimationFrame(countingStep);
            } else {
                element.textContent = rawText; // Force fallback safety target assignments completion
            }
        };

        window.requestAnimationFrame(countingStep);
    };

    /**
     * Initializes structural Intersection Observers monitoring view coordinates states accurately
     */
    function setupScrollObserverTriggers() {
        // Configurable numeric counters monitoring rules 
        const countersObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateMetricCounter(entry.target);
                    observer.unobserve(entry.target); // Kill task tracker mapping assignments once processed
                }
            });
        }, { threshold: 0.5 });

        DOM.counterElements.forEach(counter => countersObserver.observe(counter));
    }


    // =========================================================================
    // ADD-ON — INTERACTIVE COMPONENTS (FAQ Accordions & Dynamic Adjustments)
    // =========================================================================
    
    DOM.faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const toggleIcon = question.querySelector("span");
            const isActive = question.classList.contains("active");
            
            // Evaluate structural items mapping configuration setups
            document.querySelectorAll(".faq-question").forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.classList.remove("active");
                    if (otherQuestion.nextElementSibling) {
                        otherQuestion.nextElementSibling.style.maxHeight = null;
                    }
                    const otherIcon = otherQuestion.querySelector("span");
                    if (otherIcon) otherIcon.textContent = "+";
                }
            });

            // Toggle processing selection logic layouts execution runs
            if (!isActive) {
                question.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
                if (toggleIcon) toggleIcon.textContent = "−";
            } else {
                question.classList.remove("active");
                answer.style.maxHeight = null;
                if (toggleIcon) toggleIcon.textContent = "+";
            }
        });
    });

    // Boot structural tasks execution loop sequences
    initApp();

// =========================================================================
    // PART 5 — SCROLL REVEAL SYSTEM (Approx. 120 lines)
    // =========================================================================
    
    /**
     * Initializes a global, unified Scroll Reveal Engine using intersection observers.
     * Selects sections, cards, and images, applying customizable, clean directional reveals.
     */
    const initScrollRevealSystem = () => {
        // Targets across multiple sections for animation assignment
        const revealTargets = document.querySelectorAll(
            '.feature-card, .experience-left, .experience-right, .timeline-item, .gallery-item, .download-box, .faq-item, .cta-box'
        );

        // Pre-assign specialized architectural directional structural behaviors
        revealTargets.forEach((target, index) => {
            target.style.opacity = "0";
            target.style.willChange = "transform, opacity";

            if (target.classList.contains('feature-card') || target.classList.contains('gallery-item')) {
                // Staggered grid setups
                target.style.transform = "translateY(30px) scale(0.96)";
                target.style.transition = "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
            } else if (target.classList.contains('experience-left') || target.classList.contains('timeline-item')) {
                // Slide up left configurations
                target.style.transform = "translateX(-40px)";
                target.style.transition = "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
            } else if (target.classList.contains('experience-right')) {
                // Slide up right animations
                target.style.transform = "translateX(40px)";
                target.style.transition = "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
            } else {
                // Standard soft baseline transitions
                target.style.transform = "translateY(40px)";
                target.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
            }
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    // Fire reveals smoothly, computing standalone inline delay parameters if desired
                    requestAnimationFrame(() => {
                        target.style.opacity = "1";
                        target.style.transform = "translate3d(0, 0, 0)";
                    });
                    
                    observer.unobserve(target); // Deallocate item monitoring trackers immediately
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        revealTargets.forEach(target => revealObserver.observe(target));
    };

    initScrollRevealSystem();


    // =========================================================================
    // PART 6 — FEATURE CARDS INTERACTION (Approx. 60 lines)
    // =========================================================================
    
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        // Enforce structural hardware rendering layers
        card.style.willChange = "transform";
        card.style.transition = "transform 0.15s ease-out, box-shadow 0.3s ease";

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  

            // Compute exact relative offset dimensional variables (-10deg to 10deg)
            const tiltX = ((y / rect.height) - 0.5) * -12;
            const tiltY = ((x / rect.width) - 0.5) * 12;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
            
            // Inject hardware-accelerated focal glow tracking calculations dynamically via CSS variables
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            // Restore default grid alignment metrics smoothly
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });


    // =========================================================================
    // PART 7 — TIMELINE ANIMATION (Approx. 70 lines)
    // =========================================================================
    
    const setupTimelineTracker = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const badge = entry.target.querySelector('.timeline-number');
                if (entry.isIntersecting) {
                    entry.target.classList.add('step-active');
                    if (badge) {
                        badge.style.transform = "scale(1.15)";
                        badge.style.backgroundColor = "#ff4a5a"; // Accent theme color override
                        badge.style.color = "#ffffff";
                        badge.style.transition = "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
                    }
                } else {
                    // Soft styling rollbacks when moving out of focus layouts
                    if (badge && entry.boundingClientRect.top > window.innerHeight) {
                        entry.target.classList.remove('step-active');
                        badge.style.transform = "scale(1)";
                        badge.style.backgroundColor = "";
                        badge.style.color = "";
                    }
                }
            });
        }, { threshold: 0.6 }); // Triggers when the layout element passes through 60% view thresholds

        timelineItems.forEach(item => timelineObserver.observe(item));
    };

    setupTimelineTracker();


    // =========================================================================
    // PART 8 — GALLERY SYSTEM & LIGHTBOX (Approx. 120 lines)
    // =========================================================================
    
    let currentImageIndex = 0;
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    
    // Create functional Lightbox DOM fragments dynamically
    const lightboxContainer = document.createElement('div');
    lightboxContainer.id = 'custom-lightbox';
    lightboxContainer.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background-color: rgba(10, 10, 14, 0.95); z-index: 9999; 
        display: flex; align-items: center; justify-content: center; 
        opacity: 0; pointer-events: none; transition: opacity 0.4s ease;
    `;
    
    lightboxContainer.innerHTML = `
        <div class="lightbox-close" style="position: absolute; top: 30px; right: 40px; color: #fff; font-size: 35px; cursor: pointer; user-select: none;">&times;</div>
        <div class="lightbox-btn prev" style="position: absolute; left: 30px; color: #fff; font-size: 40px; cursor: pointer; user-select: none;">&#10094;</div>
        <img class="lightbox-img" src="" alt="Preview" style="max-width: 85%; max-height: 80%; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scale(0.9); transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);">
        <div class="lightbox-btn next" style="position: absolute; right: 30px; color: #fff; font-size: 40px; cursor: pointer; user-select: none;">&#10095;</div>
    `;
    document.body.appendChild(lightboxContainer);

    const lightboxImg = lightboxContainer.querySelector('.lightbox-img');

    const updateLightboxView = (index) => {
        if (index >= 0 && index < galleryImages.length) {
            currentImageIndex = index;
            lightboxImg.style.transform = "scale(0.95)";
            setTimeout(() => {
                lightboxImg.src = galleryImages[index].src;
                lightboxImg.style.transform = "scale(1)";
            }, 100);
        }
    };

    // Open lightbox interactions 
    galleryImages.forEach((img, index) => {
        img.parentElement.addEventListener('click', () => {
            updateLightboxView(index);
            lightboxContainer.style.pointerEvents = "auto";
            lightboxContainer.style.opacity = "1";
            document.body.style.overflow = "hidden"; // Retain screen lock scrolling metrics
        });
    });

    // Close Actions Tracker
    const closeLightbox = () => {
        lightboxContainer.style.opacity = "0";
        lightboxContainer.style.pointerEvents = "none";
        document.body.style.overflow = "";
    };

    lightboxContainer.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightboxContainer.querySelector('.prev').addEventListener('click', () => updateLightboxView(currentImageIndex - 1));
    lightboxContainer.querySelector('.next').addEventListener('click', () => updateLightboxView(currentImageIndex + 1));

    // Keyboard Hotkey Navigation Controllers
    window.addEventListener('keydown', (e) => {
        if (lightboxContainer.style.opacity === "1") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight" && currentImageIndex < galleryImages.length - 1) updateLightboxView(currentImageIndex + 1);
            if (e.key === "ArrowLeft" && currentImageIndex > 0) updateLightboxView(currentImageIndex - 1);
        }
    });


    // =========================================================================
    // PART 9 — FAQ ACCORDION KEYBOARD ACCESS (Approx. 80 lines)
    // =========================================================================
    
    // Native keyboard focus tracking support updates for accessibility
    DOM.faqQuestions.forEach(question => {
        question.setAttribute('tabindex', '0');
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click(); // Trigger default fallback processing rules smoothly
            }
        });
    });


    // =========================================================================
    // PART 10 — DOWNLOAD SECTION & TOAST NOTIFICATION SYSTEM (Approx. 80 lines)
    // =========================================================================
    
    /**
     * Builds and appends programmatic visual alerts on system operations completion status
     * @param {string} message - Feedback description target message strings
     */
    const triggerSuccessToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'success-toast-alert';
        toast.style.cssText = `
            position: fixed; bottom: 40px; right: 40px; background: #10b981; 
            color: #fff; padding: 16px 28px; border-radius: 8px; font-weight: 500;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3); z-index: 10000;
            transform: translateY(20px); opacity: 0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="margin-right: 10px;"></i> ${message}`;
        document.body.appendChild(toast);

        // Render animation steps running frames calculations
        requestAnimationFrame(() => {
            toast.style.transform = "translateY(0)";
            toast.style.opacity = "1";
        });

        // Decay handler logic definitions
        setTimeout(() => {
            toast.style.transform = "translateY(20px)";
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    };

    const downloadButtons = document.querySelectorAll('.download-btn, .main-download-btn');

    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Check to avoid simultaneous trigger loops
            if (this.classList.contains('download-processing')) return;
            
            this.classList.add('download-processing');
            const nativeOriginalContent = this.innerHTML;
            
            // Set tracking button architecture status indicators
            this.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Securing Connection...`;
            this.style.opacity = "0.85";

            // Simulate localized infrastructure checks before delivering binaries streams
            setTimeout(() => {
                this.innerHTML = `<i class="fa-solid fa-cloud-arrow-down"></i> Downloading Application...`;
                
                setTimeout(() => {
                    // Reset standard operational visual variables back to structural baselines
                    this.classList.remove('download-processing');
                    this.innerHTML = nativeOriginalContent;
                    this.style.opacity = "1";
                    
                    triggerSuccessToast("Tursyn Movies APK download sequence initiated successfully!");
                }, 1500);
            }, 1200);
        });
    });

// =========================================================================
    // PART 11 — CTA BUTTON EFFECTS (Approx. 60 lines)
    // =========================================================================
    
    /**
     * Initializes advanced ripple and transform effects across primary CTA interface regions
     */
    const initCTAEffects = () => {
        const ctaButtons = document.querySelectorAll('.main-download-btn, .tutorial-btn, .download-btn');

        ctaButtons.forEach(btn => {
            // Apply scale depress modifications on mouse active press click states
            btn.addEventListener('mousedown', () => {
                btn.style.transform = "scale(0.96)";
            });

            btn.addEventListener('mouseup', () => {
                btn.style.transform = "";
            });

            // Native programmatic structural click element ripple injection logic
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'btn-click-ripple';
                ripple.style.cssText = `
                    position: absolute; background: rgba(255, 255, 255, 0.35);
                    width: 100px; height: 100px; margin-left: -50px; margin-top: -50px;
                    left: ${x}px; top: ${y}px; border-radius: 50%; pointer-events: none;
                    transform: scale(0); animation: buttonRippleAnimation 0.6s linear;
                `;

                // Quick support layout override configurations
                const positionStyle = window.getComputedStyle(this).position;
                if (positionStyle !== 'relative' && positionStyle !== 'absolute') {
                    this.style.position = 'relative';
                }
                if (window.getComputedStyle(this).overflow !== 'hidden') {
                    this.style.overflow = 'hidden';
                }

                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    };

    initCTAEffects();


    // =========================================================================
    // PART 12 — SCROLL TO TOP PROGRESS BUTTON (Approx. 60 lines)
    // =========================================================================
    
    /**
     * Generates a modern fixed scroll-to-top floating interactive block 
     * complete with dynamic SVG circle perimeter line path progress rendering indicators.
     */
    const initScrollToTopWidget = () => {
        const scrollTopBtn = document.createElement('div');
        scrollTopBtn.id = 'scroll-to-top-widget';
        scrollTopBtn.style.cssText = `
            position: fixed; bottom: 30px; left: 30px; width: 46px; height: 46px;
            background: #111116; border-radius: 50%; color: #fff; display: flex;
            align-items: center; justify-content: center; cursor: pointer; z-index: 999;
            opacity: 0; pointer-events: none; transform: translateY(15px);
            transition: opacity 0.4s ease, transform 0.4s ease, background-color 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        `;
        
        // SVG progress indicator mapping path setups
        scrollTopBtn.innerHTML = `
            <svg width="46" height="46" style="position: absolute; transform: rotate(-90deg);">
                <circle cx="23" cy="23" r="20" stroke="#22222a" stroke-width="3" fill="transparent"/>
                <circle id="scroll-progress-indicator" cx="23" cy="23" r="20" stroke="#ff4a5a" stroke-width="3" fill="transparent"
                    stroke-dasharray="125.66" stroke-dashoffset="125.66" style="transition: stroke-dashoffset 0.1s linear;"/>
            </svg>
            <i class="fa-solid fa-arrow-up" style="font-size: 14px; position: relative; z-index: 2;"></i>
        `;
        document.body.appendChild(scrollTopBtn);

        const progressCircle = scrollTopBtn.querySelector('#scroll-progress-indicator');
        const circumference = 2 * Math.PI * 20; // Approx 125.66

        window.addEventListener('scroll', () => {
            const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            if (totalScrollableHeight > 0) {
                const currentScrollProgress = window.scrollY / totalScrollableHeight;
                const progressOffset = circumference - (currentScrollProgress * circumference);
                if (progressCircle) progressCircle.style.strokeDashoffset = progressOffset;

                if (window.scrollY > 300) {
                    scrollTopBtn.style.opacity = "1";
                    scrollTopBtn.style.pointerEvents = "auto";
                    scrollTopBtn.style.transform = "translateY(0)";
                } else {
                    scrollTopBtn.style.opacity = "0";
                    scrollTopBtn.style.pointerEvents = "none";
                    scrollTopBtn.style.transform = "translateY(15px)";
                }
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    initScrollToTopWidget();


    // =========================================================================
    // PART 13 — TOAST NOTIFICATION QUEUE SYSTEM (Approx. 100 lines)
    // =========================================================================
    
    /**
     * Managed centralized messaging architecture container tracking visual interface alerts
     */
    const GlobalToastNotificationEngine = {
        activeQueue: [],
        maxActiveToasts: 3,
        verticalSpacingOffset: 20,

        /**
         * Dispatches structural alert frames into view space layout stacks
         * @param {string} text - User readable string target notification
         * @param {string} type - Configuration status classifications ('success' | 'error' | 'warning')
         */
        trigger(text, type = 'success') {
            const configurationStyles = {
                success: { bg: '#10b981', icon: 'fa-circle-check' },
                error: { bg: '#ef4444', icon: 'fa-circle-xmark' },
                warning: { bg: '#f59e0b', icon: 'fa-triangle-exclamation' }
            };

            const selectedStyle = configurationStyles[type] || configurationStyles.success;

            const notificationItem = document.createElement('div');
            notificationItem.className = `system-toast-card status-${type}`;
            notificationItem.style.cssText = `
                position: fixed; right: 40px; background: ${selectedStyle.bg};
                color: #fff; padding: 14px 24px; border-radius: 6px; font-weight: 500;
                box-shadow: 0 8px 20px rgba(0,0,0,0.25); z-index: 10001; opacity: 0;
                transform: translateY(30px); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                display: flex; align-items: center; min-width: 260px;
            `;
            notificationItem.innerHTML = `<i class="fa-solid ${selectedStyle.icon}" style="margin-right: 12px; font-size: 18px;"></i> <span>${text}</span>`;
            
            document.body.appendChild(notificationItem);
            this.activeQueue.push(notificationItem);
            
            this.recalculateStackPositions();

            // Run structural frame calculations entry animations
            requestAnimationFrame(() => {
                notificationItem.style.opacity = "1";
            });

            // Auto purge cleanup configurations logic
            setTimeout(() => {
                this.dismiss(notificationItem);
            }, 4500);
        },

        recalculateStackPositions() {
            // Trim stack tracking array lengths limits
            if (this.activeQueue.length > this.maxActiveToasts) {
                const oldestToast = this.activeQueue.shift();
                this.dismiss(oldestToast);
            }

            let computedBottomAccumulator = 40;
            // Iterate reverse through array elements stacking items sequentially upwards
            for (let i = this.activeQueue.length - 1; i >= 0; i--) {
                const item = this.activeQueue[i];
                item.style.bottom = `${computedBottomAccumulator}px`;
                computedBottomAccumulator += item.offsetHeight + this.verticalSpacingOffset;
            }
        },

        dismiss(toastElement) {
            if (!toastElement) return;
            toastElement.style.transform = "translateY(15px) scale(0.9)";
            toastElement.style.opacity = "0";

            setTimeout(() => {
                if (toastElement.parentNode) {
                    toastElement.remove();
                }
                this.activeQueue = this.activeQueue.filter(element => element !== toastElement);
                this.recalculateStackPositions();
            }, 400);
        }
    };

    // Override Part 10 simple alert assignments linking into the new central manager engine
    window.showNotificationAlert = (message, statusType) => GlobalToastNotificationEngine.trigger(message, statusType);


    // =========================================================================
    // PART 14 — UTILITY STRUCTURAL FUNCTIONS (Approx. 80 lines)
    // =========================================================================
    
    /**
     * Restrains visual operational computational call volumes within fixed latency boundaries
     */
    const debounceUtility = (callback, delayWindow) => {
        let executionTimer;
        return (...args) => {
            clearTimeout(executionTimer);
            executionTimer = setTimeout(() => callback.apply(this, args), delayWindow);
        };
    };

    /**
     * Limits periodic calculations tracking functions execution routines
     */
    const throttleUtility = (callback, timeLimit) => {
        let trackingThrottleFlag = false;
        return (...args) => {
            if (!trackingThrottleFlag) {
                callback.apply(this, args);
                trackingThrottleFlag = true;
                setTimeout(() => trackingThrottleFlag = false, timeLimit);
            }
        };
    };

    // Math numerical data range restraint bounds modifiers logic configuration
    const mathClampValue = (value, lowerBound, upperBound) => Math.min(Math.max(value, lowerBound), upperBound);


    // =========================================================================
    // PART 15 — INITIALIZATION & PERFORMANCE BOOTSTRAP (Approx. 50 lines)
    // =========================================================================
    
    /**
     * Primary operational pipeline sequencing script boot validation cycles safely
     */
    const executeSystemSanityBootstrap = () => {
        const systemPerformanceStartTime = performance.now();
        
        try {
            // Validate system baseline targets exist intact before continuing tracking setup tasks
            if (!document.querySelector('.navbar') || !document.querySelector('.hero')) {
                throw new Error("Core structural streaming theme elements missing from landing page target DOM nodes mappings layout.");
            }

            // Global generic frame resize updates hooks wrapped via debounce performance optimizations
            window.addEventListener('resize', debounceUtility(() => {
                const activeFAQItem = document.querySelector('.faq-answer[style*="max-height"]');
                if (activeFAQItem) {
                    activeFAQItem.style.maxHeight = activeFAQItem.scrollHeight + "px";
                }
            }, 250));

            const systemPerformanceEndTime = performance.now();
            const compilationDuration = (systemPerformanceEndTime - systemPerformanceStartTime).toFixed(2);

            // Log operational platform visual baseline outputs
            console.log(
                `%c🚀 Tursyn Movies Hub Core Ready | Core UI Engine bootstrapped safely in ${compilationDuration}ms.`,
                "color: #10b981; font-weight: bold; font-size: 12px; font-family: system-ui;"
            );

        } catch (initializationFailureError) {
            console.error(
                `%c🛑 Tursyn Movies Core Boot Initialization Fault Detected: ${initializationFailureError.message}`,
                "color: #ef4444; font-weight: bold;"
            );
        }
    };

    // Initialize application core processing tasks configurations loops pipeline execution runs
    executeSystemSanityBootstrap();
});