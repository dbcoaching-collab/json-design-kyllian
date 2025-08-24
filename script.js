/* ===== PREMIUM FITNESS COACHING WEBSITE - INTERACTIVE FUNCTIONALITY ===== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== TAB FUNCTIONALITY - FIXED VERSION =====
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Remove active class from all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none'; // Ensure it's hidden
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Find and show the corresponding content using a more specific selector
            const targetContent = document.querySelector(`.tab-content[data-tab="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
                console.log('Activated content for tab:', targetTab);
                
                // Apply current language to the newly active tab content
                applyLanguageToTabContent(targetContent);
            } else {
                console.log('No content found for tab:', targetTab);
            }
        });
    });
    
    // Function to apply language to specific tab content
    function applyLanguageToTabContent(tabContent) {
        console.log('Applying language', currentLanguage, 'to tab content');
        
        // Service description
        const description = tabContent.querySelector('.service-description');
        if (description) {
            const langText = description.getAttribute(currentLanguage === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) {
                description.textContent = langText;
                console.log('Updated description to', currentLanguage);
            }
        }
        
        // Service title
        const title = tabContent.querySelector('.service-title');
        if (title) {
            const langText = title.getAttribute(currentLanguage === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) {
                title.textContent = langText;
            }
        }
        
        // Service features
        const features = tabContent.querySelectorAll('.service-features li');
        features.forEach(li => {
            const langText = li.getAttribute(currentLanguage === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) {
                li.textContent = langText;
            }
        });
        
        // Service button
        const button = tabContent.querySelector('.btn[data-cz][data-en]');
        if (button) {
            const langText = button.getAttribute(currentLanguage === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) {
                button.textContent = langText;
            }
        }
    }
    
    // ===== NAVIGATION FUNCTIONALITY =====
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    navLinks.forEach(link => {
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
    
    // ===== REMOVE MOBILE MENU FUNCTIONALITY =====
    // Navigation is now horizontal, no mobile menu needed
    const sidebarNav = document.querySelector('.sidebar-nav');
    

        if (window.innerWidth <= 768) {
            const existingButton = document.querySelector('.mobile-menu-btn');
            if (existingButton) return;
            
            const mobileButton = document.createElement('button');
            mobileButton.className = 'mobile-menu-btn';
            mobileButton.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
            `;
            mobileButton.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 1001;
                background: var(--color-accent-gold);
                border: none;
                color: var(--color-bg-primary);
                width: 50px;
                height: 50px;
                border-radius: 0;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition-default);
            `;
            
            mobileButton.addEventListener('click', function() {
                isNavOpen = !isNavOpen;
                sidebarNav.classList.toggle('open', isNavOpen);
            });
            

    
    // ===== FORM HANDLING =====
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you! Your consultation request has been submitted.', 'success');
            this.reset();
        });
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--color-accent-gold)' : type === 'error' ? '#e74c3c' : 'var(--color-bg-surface)'};
            color: ${type === 'success' ? 'var(--color-bg-primary)' : 'var(--color-text-primary)'};
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: 0;
            z-index: 1002;
            font-weight: var(--font-weight-medium);
            transform: translateX(100%);
            transition: var(--transition-default);
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // ===== LANGUAGE FUNCTIONALITY =====
    const languageToggle = document.querySelector('.language-toggle');
    const testLangButton = document.querySelector('.test-lang');
    let currentLanguage = 'CZ';
    
    // Debug: Check if elements are found
    console.log('🔍 Language toggle found:', !!languageToggle);
    console.log('🔍 Test lang button found:', !!testLangButton);
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            console.log('🔄 Language toggle clicked, current language:', currentLanguage);
            currentLanguage = currentLanguage === 'CZ' ? 'EN' : 'CZ';
            this.textContent = currentLanguage;
            console.log('🔄 Switching to language:', currentLanguage);
            switchLanguage(currentLanguage);
            
            const langText = currentLanguage === 'CZ' ? 'Čeština' : 'English';
            showNotification(`Language switched to ${langText}`, 'info');
        });
    }
    
    if (testLangButton) {
        testLangButton.addEventListener('click', function() {
            console.log('🧪 Testing language switch...');
            currentLanguage = 'EN';
            languageToggle.textContent = 'EN';
            switchLanguage('EN');
            showNotification('Testing English', 'info');
            
            setTimeout(() => {
                currentLanguage = 'CZ';
                languageToggle.textContent = 'CZ';
                switchLanguage('CZ');
                showNotification('Back to Czech', 'info');
            }, 3000);
        });
    }
    
    // ===== ENHANCED TRANSLATION SYSTEM =====
    // Enhanced switchLanguage function that handles the entire website
    function switchLanguage(language) {
        console.log('Switching entire website to:', language);
        
        // Update all navigation labels
        const navLabels = document.querySelectorAll('.nav-label[data-cz][data-en]');
        navLabels.forEach(label => {
            const langText = label.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) label.textContent = langText;
        });
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title[data-cz][data-en]');
        if (heroTitle) {
            const langText = heroTitle.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) heroTitle.textContent = langText;
        }
        
        const heroDescription = document.querySelector('.hero-description[data-cz][data-en]');
        if (heroDescription) {
            const langText = heroDescription.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) heroDescription.textContent = langText;
        }
        
        const heroButtons = document.querySelectorAll('.hero-cta .btn[data-cz][data-en]');
        heroButtons.forEach(btn => {
            const langText = btn.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) btn.textContent = langText;
        });
        
        const overlayText = document.querySelector('.overlay-text[data-cz][data-en]');
        if (overlayText) {
            const langText = overlayText.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) overlayText.textContent = langText;
        }
        
        // Update all section titles
        const sectionTitles = document.querySelectorAll('.section-title[data-cz][data-en]');
        sectionTitles.forEach(title => {
            const langText = title.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) title.textContent = langText;
        });
        
        // Update tab button texts
        const tabButtons = document.querySelectorAll('.tab[data-cz][data-en]');
        tabButtons.forEach(tab => {
            const langText = tab.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) tab.textContent = langText;
        });
        
        // Update all service content in ALL tab contents
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(tabContent => {
            // Service descriptions
            const descriptions = tabContent.querySelectorAll('.service-description[data-cz][data-en]');
            descriptions.forEach(desc => {
                const langText = desc.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
                if (langText) desc.textContent = langText;
            });
            
            // Service titles
            const titles = tabContent.querySelectorAll('.service-title[data-cz][data-en]');
            titles.forEach(title => {
                const langText = title.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
                if (langText) title.textContent = langText;
            });
            
            // Service features
            const features = tabContent.querySelectorAll('.service-features li[data-cz][data-en]');
            features.forEach(li => {
                const langText = li.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
                if (langText) li.textContent = langText;
            });
            
            // Service buttons
            const buttons = tabContent.querySelectorAll('.btn[data-cz][data-en]');
            buttons.forEach(btn => {
                const langText = btn.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
                if (langText) btn.textContent = langText;
            });
        });
        
        // Update about section
        const aboutDescription = document.querySelector('.about-description[data-cz][data-en]');
        if (aboutDescription) {
            const langText = aboutDescription.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) aboutDescription.textContent = langText;
        }
        
        const statLabels = document.querySelectorAll('.stat-label[data-cz][data-en]');
        statLabels.forEach(label => {
            const langText = label.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) label.textContent = langText;
        });
        
        const aboutButton = document.querySelector('.about-text .btn[data-cz][data-en]');
        if (aboutButton) {
            const langText = aboutButton.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) aboutButton.textContent = langText;
        }
        
        // Update testimonials
        const testimonialQuotes = document.querySelectorAll('.testimonial-quote[data-cz][data-en]');
        testimonialQuotes.forEach(quote => {
            const langText = quote.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) quote.textContent = langText;
        });
        
        // Update transformations section
        const transformationSectionTitle = document.querySelector('.transformations-section .section-title[data-cz][data-en]');
        if (transformationSectionTitle) {
            const langText = transformationSectionTitle.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) transformationSectionTitle.textContent = langText;
        }
        
        const transformationDetails = document.querySelectorAll('.transformation-details[data-cz][data-en]');
        transformationDetails.forEach(detail => {
            const langText = detail.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) detail.textContent = langText;
        });
        
        const transformationLabels = document.querySelectorAll('.image-label[data-cz][data-en]');
        transformationLabels.forEach(label => {
            const langText = label.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) label.textContent = langText;
        });
        
        // Update ebooks section
        const ebookTitles = document.querySelectorAll('.ebook-title[data-cz][data-en]');
        ebookTitles.forEach(title => {
            const langText = title.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) title.textContent = langText;
        });
        
        const ebookDescriptions = document.querySelectorAll('.ebook-description[data-cz][data-en]');
        ebookDescriptions.forEach(desc => {
            const langText = desc.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) desc.textContent = langText;
        });
        
        const ebookButtons = document.querySelectorAll('.ebooks-section .btn[data-cz][data-en]');
        ebookButtons.forEach(btn => {
            const langText = btn.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) btn.textContent = langText;
        });
        
        const ebookOverlays = document.querySelectorAll('.ebook-overlay span[data-cz][data-en]');
        ebookOverlays.forEach(overlay => {
            const langText = overlay.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) overlay.textContent = langText;
        });
        
        // Update footer
        const footerTitles = document.querySelectorAll('.footer-title[data-cz][data-en]');
        footerTitles.forEach(title => {
            const langText = title.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) title.textContent = langText;
        });
        
        const footerBottomText = document.querySelector('.footer-bottom span[data-cz][data-en]');
        if (footerBottomText) {
            const langText = footerBottomText.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) footerBottomText.textContent = langText;
        }
        
        // Update contact section
        const contactSubtitle = document.querySelector('.contact-subtitle[data-cz][data-en]');
        if (contactSubtitle) {
            const langText = contactSubtitle.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) contactSubtitle.textContent = langText;
        }
        
        const contactDescription = document.querySelector('.contact-description[data-cz][data-en]');
        if (contactDescription) {
            const langText = contactDescription.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) contactDescription.textContent = langText;
        }
        
        const contactItems = document.querySelectorAll('.contact-item span[data-cz][data-en]');
        contactItems.forEach(item => {
            const langText = item.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) item.textContent = langText;
        });
        
        // Update form elements
        const formInputs = document.querySelectorAll('.form-input[data-placeholder-cz][data-placeholder-en]');
        formInputs.forEach(input => {
            const placeholderText = input.getAttribute(language === 'CZ' ? 'data-placeholder-cz' : 'data-placeholder-en');
            if (placeholderText) input.placeholder = placeholderText;
        });
        
        const selectOptions = document.querySelectorAll('option[data-cz][data-en]');
        selectOptions.forEach(option => {
            const langText = option.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) option.textContent = langText;
        });
        
        const contactButton = document.querySelector('.contact-form .btn[data-cz][data-en]');
        if (contactButton) {
            const langText = contactButton.getAttribute(language === 'CZ' ? 'data-cz' : 'data-en');
            if (langText) contactButton.textContent = langText;
        }
        
        console.log('Complete website translation completed to:', language);
        
        // Update global language variable for questionnaires
        window.currentLanguage = language;
        
        // Update modal language if questionnaire is open
        const modal = document.getElementById('questionnaire-modal');
        if (modal && modal.classList.contains('show')) {
            updateModalLanguage(language);
        }
    }
    
    // ===== SCROLL ANIMATIONS =====
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
    
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===== INITIALIZATION =====
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // Initialize language state
    currentLanguage = 'CZ';
    if (languageToggle) {
        languageToggle.textContent = 'CZ';
    }
    switchLanguage('CZ');
    
    // ===== QUESTIONNAIRE SYSTEM =====
    
    // Questionnaire data structure
    const questionnaires = {
        'online-coaching': {
            id: 'online-coaching',
            title: {
                cz: 'KOMPLETNÍ ONLINE COACHING - DOTAZNÍK',
                en: 'COMPLETE ONLINE COACHING - QUESTIONNAIRE'
            },
            questions: [
                {
                    type: 'text',
                    id: 'name',
                    label: { cz: 'Jméno a příjmení', en: 'Full Name' },
                    required: true
                },
                {
                    type: 'email',
                    id: 'email',
                    label: { cz: 'E-mail', en: 'Email Address' },
                    required: true
                },
                {
                    type: 'tel',
                    id: 'phone',
                    label: { cz: 'Telefonní číslo (WhatsApp)', en: 'Phone Number (WhatsApp)' },
                    required: true
                },
                {
                    type: 'select',
                    id: 'experience',
                    label: { cz: 'Vaše zkušenosti s fitness', en: 'Your fitness experience' },
                    options: {
                        cz: ['Začátečník', 'Mírně pokročilý', 'Pokročilý', 'Expert'],
                        en: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
                    },
                    required: true
                },
                {
                    type: 'select',
                    id: 'goal',
                    label: { cz: 'Hlavní cíl', en: 'Primary Goal' },
                    options: {
                        cz: ['Hubnutí', 'Nabírání svalové hmoty', 'Zlepšení kondice', 'Celková transformace'],
                        en: ['Weight Loss', 'Muscle Gain', 'Improve Fitness', 'Complete Transformation']
                    },
                    required: true
                },
                {
                    type: 'textarea',
                    id: 'current_situation',
                    label: { cz: 'Popište svou současnou situaci', en: 'Describe your current situation' },
                    required: true
                },
                {
                    type: 'textarea',
                    id: 'motivation',
                    label: { cz: 'Co vás motivuje k této změně?', en: 'What motivates you to make this change?' },
                    required: true
                }
            ]
        },
        'kickstart': {
            id: 'kickstart',
            title: {
                cz: 'KICKSTART PLÁN NA MÍRU - DOTAZNÍK',
                en: 'CUSTOM KICKSTART PLAN - QUESTIONNAIRE'
            },
            questions: [
                {
                    type: 'text',
                    id: 'name',
                    label: { cz: 'Jméno a příjmení', en: 'Full Name' },
                    required: true
                },
                {
                    type: 'email',
                    id: 'email',
                    label: { cz: 'E-mail', en: 'Email Address' },
                    required: true
                },
                {
                    type: 'tel',
                    id: 'phone',
                    label: { cz: 'Telefonní číslo (WhatsApp)', en: 'Phone Number (WhatsApp)' },
                    required: true
                },
                {
                    type: 'select',
                    id: 'timeline',
                    label: { cz: 'Časový rámec pro dosažení cíle', en: 'Timeline to achieve goal' },
                    options: {
                        cz: ['1-3 měsíce', '3-6 měsíců', '6-12 měsíců', 'Více než rok'],
                        en: ['1-3 months', '3-6 months', '6-12 months', 'More than a year']
                    },
                    required: true
                },
                {
                    type: 'select',
                    id: 'training_frequency',
                    label: { cz: 'Kolikrát týdně můžete trénovat?', en: 'How many times per week can you train?' },
                    options: {
                        cz: ['2-3x týdně', '3-4x týdně', '4-5x týdně', '5+ týdně'],
                        en: ['2-3 times/week', '3-4 times/week', '4-5 times/week', '5+ times/week']
                    },
                    required: true
                },
                {
                    type: 'textarea',
                    id: 'specific_goals',
                    label: { cz: 'Jaké jsou vaše specifické cíle?', en: 'What are your specific goals?' },
                    required: true
                }
            ]
        },
        'personal-praha': {
            id: 'personal-praha',
            title: {
                cz: 'OSOBNÍ TRÉNINKY PRAHA - DOTAZNÍK',
                en: 'PERSONAL TRAINING PRAGUE - QUESTIONNAIRE'
            },
            questions: [
                {
                    type: 'text',
                    id: 'name',
                    label: { cz: 'Jméno a příjmení', en: 'Full Name' },
                    required: true
                },
                {
                    type: 'email',
                    id: 'email',
                    label: { cz: 'E-mail', en: 'Email Address' },
                    required: true
                },
                {
                    type: 'tel',
                    id: 'phone',
                    label: { cz: 'Telefonní číslo (WhatsApp)', en: 'Phone Number (WhatsApp)' },
                    required: true
                },
                {
                    type: 'select',
                    id: 'preferred_time',
                    label: { cz: 'Preferovaný čas tréninků', en: 'Preferred training time' },
                    options: {
                        cz: ['Ráno (6-10)', 'Dopoledne (10-14)', 'Odpoledne (14-18)', 'Večer (18-22)'],
                        en: ['Morning (6-10)', 'Late morning (10-14)', 'Afternoon (14-18)', 'Evening (18-22)']
                    },
                    required: true
                },
                {
                    type: 'select',
                    id: 'frequency',
                    label: { cz: 'Frekvence tréninků', en: 'Training frequency' },
                    options: {
                        cz: ['1x týdně', '2x týdně', '3x týdně', '4+ týdně'],
                        en: ['1x per week', '2x per week', '3x per week', '4+ per week']
                    },
                    required: true
                },
                {
                    type: 'textarea',
                    id: 'health_issues',
                    label: { cz: 'Máte nějaké zdravotní omezení?', en: 'Do you have any health limitations?' },
                    required: false
                },
                {
                    type: 'textarea',
                    id: 'expectations',
                    label: { cz: 'Co očekáváte od osobních tréninků?', en: 'What do you expect from personal training?' },
                    required: true
                }
            ]
        },
        'couple-training': {
            id: 'couple-training',
            title: {
                cz: 'PÁROVÉ TRÉNINKY - DOTAZNÍK',
                en: 'COUPLE TRAINING - QUESTIONNAIRE'
            },
            questions: [
                {
                    type: 'text',
                    id: 'name1',
                    label: { cz: 'Jméno partnera 1', en: 'Partner 1 Name' },
                    required: true
                },
                {
                    type: 'text',
                    id: 'name2',
                    label: { cz: 'Jméno partnera 2', en: 'Partner 2 Name' },
                    required: true
                },
                {
                    type: 'email',
                    id: 'email',
                    label: { cz: 'Kontaktní e-mail', en: 'Contact Email' },
                    required: true
                },
                {
                    type: 'tel',
                    id: 'phone',
                    label: { cz: 'Telefonní číslo (WhatsApp)', en: 'Phone Number (WhatsApp)' },
                    required: true
                },
                {
                    type: 'select',
                    id: 'both_experience',
                    label: { cz: 'Zkušenosti s fitness (oba partneři)', en: 'Fitness experience (both partners)' },
                    options: {
                        cz: ['Oba začátečníci', 'Jeden pokročilý, jeden začátečník', 'Oba pokročilí'],
                        en: ['Both beginners', 'One advanced, one beginner', 'Both advanced']
                    },
                    required: true
                },
                {
                    type: 'textarea',
                    id: 'shared_goals',
                    label: { cz: 'Jaké jsou vaše společné cíle?', en: 'What are your shared goals?' },
                    required: true
                },
                {
                    type: 'textarea',
                    id: 'individual_goals',
                    label: { cz: 'Individuální cíle každého partnera', en: 'Individual goals of each partner' },
                    required: true
                }
            ]
        }
    };

    // Modal HTML template
    function createModalHTML() {
        return `
            <div id="questionnaire-modal" class="modal-overlay">
                <div class="modal-container">
                    <div class="modal-header">
                        <h2 id="modal-title" class="modal-title"></h2>
                        <button class="modal-close" onclick="closeQuestionnaireModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="questionnaire-form" class="questionnaire-form">
                            <div id="questions-container"></div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary submit-questionnaire">
                                    <span class="submit-text-cz">ODESLAT DOTAZNÍK</span>
                                    <span class="submit-text-en">SUBMIT QUESTIONNAIRE</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div id="success-modal" class="modal-overlay" style="display: none;">
                <div class="modal-container success-container">
                    <div class="success-content">
                        <div class="success-icon">✓</div>
                        <h2 class="success-title">
                            <span class="success-title-cz">DOTAZNÍK ÚSPĚŠNĚ ODESLÁN!</span>
                            <span class="success-title-en">QUESTIONNAIRE SUCCESSFULLY SUBMITTED!</span>
                        </h2>
                        <p class="success-message">
                            <span class="success-message-cz">
                                Děkujeme za vyplnění dotazníku. Vaše odpovědi jsem obdržel a brzy se vám ozvu na WhatsApp s dalšími informacemi.
                            </span>
                            <span class="success-message-en">
                                Thank you for filling out the questionnaire. I have received your answers and will contact you soon on WhatsApp with further information.
                            </span>
                        </p>
                        <button class="btn btn-primary" onclick="closeSuccessModal()">
                            <span class="close-text-cz">ZAVŘÍT</span>
                            <span class="close-text-en">CLOSE</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // CSS for modals
    function addModalStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .modal-overlay.show {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-container {
                background: var(--color-bg-surface);
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                border: 2px solid var(--color-accent-gold);
                position: relative;
                transform: scale(0.8);
                transition: transform 0.3s ease;
                overflow-y: auto;
            }
            
            .modal-overlay.show .modal-container {
                transform: scale(1);
            }
            
            .modal-header {
                padding: var(--spacing-md);
                border-bottom: 1px solid #333;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--color-bg-primary);
            }
            
            .modal-title {
                color: var(--color-accent-gold);
                font-size: 1.5rem;
                font-weight: var(--font-weight-bold);
                letter-spacing: 0.1em;
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--color-text-secondary);
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition-default);
            }
            
            .modal-close:hover {
                color: var(--color-accent-gold);
            }
            
            .modal-body {
                padding: var(--spacing-lg);
            }
            
            .questionnaire-form .form-group {
                margin-bottom: var(--spacing-md);
            }
            
            .questionnaire-form .form-label {
                display: block;
                color: var(--color-text-primary);
                font-weight: var(--font-weight-medium);
                margin-bottom: var(--spacing-xs);
                text-transform: uppercase;
                letter-spacing: 0.05em;
                font-size: 0.875rem;
            }
            
            .questionnaire-form .form-input {
                width: 100%;
                padding: 1rem;
                background: var(--color-bg-primary);
                border: 2px solid #333;
                color: var(--color-text-primary);
                font-family: inherit;
                font-size: 1rem;
                transition: var(--transition-default);
                border-radius: 4px;
            }
            
            .questionnaire-form .form-input:focus {
                outline: none;
                border-color: var(--color-accent-gold);
                box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
            }
            
            .questionnaire-form .form-input::placeholder {
                color: var(--color-text-muted);
            }
            
            .questionnaire-form textarea.form-input {
                resize: vertical;
                min-height: 100px;
            }
            
            .questionnaire-form select.form-input {
                appearance: none;
                background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 1rem;
                padding-right: 3rem;
            }
            
            .questionnaire-form select.form-input option {
                background: var(--color-bg-primary);
                color: var(--color-text-primary);
                padding: 0.5rem;
            }
            
            .form-actions {
                text-align: center;
                padding-top: var(--spacing-md);
                border-top: 1px solid #333;
                margin-top: var(--spacing-lg);
            }
            
            .success-container {
                max-width: 500px;
            }
            
            .success-content {
                text-align: center;
                padding: var(--spacing-xl);
            }
            
            .success-icon {
                width: 80px;
                height: 80px;
                background: var(--color-accent-gold);
                color: var(--color-bg-primary);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                font-weight: bold;
                margin: 0 auto var(--spacing-md);
            }
            
            .success-title {
                color: var(--color-accent-gold);
                font-size: 1.5rem;
                font-weight: var(--font-weight-bold);
                margin-bottom: var(--spacing-md);
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            
            .success-message {
                color: var(--color-text-secondary);
                line-height: 1.6;
                margin-bottom: var(--spacing-lg);
            }
            
            @media (max-width: 768px) {
                .modal-container {
                    width: 95%;
                    max-height: 90vh;
                }
                
                .modal-header {
                    padding: var(--spacing-sm);
                }
                
                .modal-body {
                    padding: var(--spacing-md);
                }
                
                .modal-title {
                    font-size: 1.2rem;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Functions to show/hide language-specific content
    function updateModalLanguage(lang) {
        // Show/hide language-specific elements
        document.querySelectorAll('[class*="-cz"]').forEach(el => {
            el.style.display = lang === 'CZ' ? 'inline' : 'none';
        });
        document.querySelectorAll('[class*="-en"]').forEach(el => {
            el.style.display = lang === 'EN' ? 'inline' : 'none';
        });
    }

    // Open questionnaire modal
    window.openQuestionnaire = function(serviceId) {
        console.log('=== openQuestionnaire FUNCTION CALLED ===');
        console.log('openQuestionnaire called with serviceId:', serviceId);
        const questionnaire = questionnaires[serviceId];
        if (!questionnaire) {
            console.error('No questionnaire found for serviceId:', serviceId);
            return;
        }
        console.log('Questionnaire found:', questionnaire);
        
        const currentLang = window.currentLanguage || 'CZ';
        
        // Create modal if it doesn't exist
        if (!document.getElementById('questionnaire-modal')) {
            document.body.insertAdjacentHTML('beforeend', createModalHTML());
            addModalStyles();
        }
        
        // Update modal content
        const modal = document.getElementById('questionnaire-modal');
        const title = document.getElementById('modal-title');
        const questionsContainer = document.getElementById('questions-container');
        
        title.textContent = questionnaire.title[currentLang.toLowerCase()];
        
        // Generate questions HTML
        let questionsHTML = '';
        questionnaire.questions.forEach(question => {
            const label = question.label[currentLang.toLowerCase()];
            const required = question.required ? 'required' : '';
            
            questionsHTML += `
                <div class="form-group">
                    <label class="form-label" for="${question.id}">
                        ${label} ${question.required ? '*' : ''}
                    </label>
            `;
            
            if (question.type === 'textarea') {
                questionsHTML += `
                    <textarea 
                        class="form-input" 
                        id="${question.id}" 
                        name="${question.id}" 
                        ${required}
                    ></textarea>
                `;
            } else if (question.type === 'select') {
                const options = question.options[currentLang.toLowerCase()];
                questionsHTML += `
                    <select class="form-input" id="${question.id}" name="${question.id}" ${required}>
                        <option value="">-- ${currentLang === 'CZ' ? 'Vyberte možnost' : 'Select option'} --</option>
                `;
                options.forEach(option => {
                    questionsHTML += `<option value="${option}">${option}</option>`;
                });
                questionsHTML += `</select>`;
            } else {
                questionsHTML += `
                    <input 
                        type="${question.type}" 
                        class="form-input" 
                        id="${question.id}" 
                        name="${question.id}" 
                        ${required}
                    >
                `;
            }
            
            questionsHTML += `</div>`;
        });
        
        questionsContainer.innerHTML = questionsHTML;
        
        // Update language-specific content
        updateModalLanguage(currentLang);
        
        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add form submit handler
        const form = document.getElementById('questionnaire-form');
        form.onsubmit = (e) => handleQuestionnaireSubmit(e, serviceId, questionnaire.title[currentLang.toLowerCase()]);
    }

    // Close questionnaire modal
    window.closeQuestionnaireModal = function() {
        const modal = document.getElementById('questionnaire-modal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Close success modal
    window.closeSuccessModal = function() {
        const modal = document.getElementById('success-modal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Handle form submission
    function handleQuestionnaireSubmit(e, serviceId, serviceTitle) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const answers = {};
        
        for (let [key, value] of formData.entries()) {
            answers[key] = value;
        }
        
        // Prepare email data
        const emailData = {
            service: serviceTitle,
            serviceId: serviceId,
            timestamp: new Date().toLocaleString('cs-CZ'),
            language: currentLanguage || 'CZ',
            answers: answers
        };
        
        // Simulate sending email (replace with actual email service)
        console.log('Sending email to dbcoaching@dbrom.cz:', emailData);
        
        // Here you would integrate with your email service
        sendQuestionnaireEmail(emailData);
        
        // Close questionnaire modal and show success modal
        closeQuestionnaireModal();
        setTimeout(() => {
            const successModal = document.getElementById('success-modal');
            successModal.classList.add('show');
            updateModalLanguage(currentLanguage || 'CZ');
        }, 300);
    }

    // Email sending function (implement with your preferred service)
    function sendQuestionnaireEmail(data) {
        // Example implementation with EmailJS (you'll need to set this up)
        /*
        emailjs.send('your_service_id', 'your_template_id', {
            to_email: 'dbcoaching@dbrom.cz',
            subject: `Nový dotazník: ${data.service}`,
            service_name: data.service,
            timestamp: data.timestamp,
            language: data.language,
            answers: JSON.stringify(data.answers, null, 2)
        });
        */
        
        // For now, just log the data
        console.log('Email would be sent with this data:', data);
    }

    // Service buttons are already set up in HTML with onclick handlers
    console.log('✅ Service buttons configured with onclick handlers');
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            if (e.target.id === 'questionnaire-modal') {
                closeQuestionnaireModal();
            } else if (e.target.id === 'success-modal') {
                closeSuccessModal();
            }
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeQuestionnaireModal();
            closeSuccessModal();
        }
    });
    
    console.log('✅ Premium Fitness Website Loaded - Tab functionality fixed!');
    console.log('🔧 Each tab now shows unique content in both languages');
    console.log('🇨🇿 Default: Czech | 🇬🇧 Click toggle for English');
    console.log('📝 Questionnaire system ready for all services');
    console.log('🔍 openQuestionnaire function available:', typeof window.openQuestionnaire);
    console.log('🔍 closeQuestionnaireModal function available:', typeof window.closeQuestionnaireModal);
    console.log('🔍 closeSuccessModal function available:', typeof window.closeSuccessModal);
    
    // ===== TRANSFORMATION SLIDESHOW =====
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.transformation-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Function to show specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
        
        // Apply language to transformation details
        const activeSlide = slides[index];
        if (activeSlide) {
            const details = activeSlide.querySelector('.transformation-details[data-cz][data-en]');
            const labels = activeSlide.querySelectorAll('.image-label[data-cz][data-en]');
            
            if (details) {
                const langText = details.getAttribute(currentLanguage === 'CZ' ? 'data-cz' : 'data-en');
                if (langText) details.textContent = langText;
            }
            
            labels.forEach(label => {
                const langText = label.getAttribute(currentLanguage === 'CZ' ? 'data-cz' : 'data-en');
                if (langText) label.textContent = langText;
            });
        }
    }
    
    // Function to change slide
    window.changeSlide = function(direction) {
        currentSlideIndex += direction;
        
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }
        
        showSlide(currentSlideIndex);
    }
    
    // Function to go to specific slide
    window.currentSlide = function(index) {
        currentSlideIndex = index - 1;
        showSlide(currentSlideIndex);
    }
    
    // Auto-play slideshow
    let autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Pause auto-play on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                changeSlide(1);
            }, 5000);
        });
    }
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slideshowContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1); // Swipe left - next slide
            } else {
                changeSlide(-1); // Swipe right - previous slide
            }
        }
    }
    
    console.log('✅ Transformation slideshow initialized with', slides.length, 'slides');
    
    // ===== PURCHASE NOTIFICATION SYSTEM =====
    const purchaseNotifications = [
        {
            name: "Jana K.",
            action: {
                cz: "si právě rezervovala vstupní konzultaci",
                en: "just booked an initial consultation"
            }
        },
        {
            name: "Tomáš M.",
            action: {
                cz: "si zakoupil Kickstart plán",
                en: "purchased a Kickstart plan"
            }
        },
        {
            name: "Petra S.",
            action: {
                cz: "začala Online coaching program",
                en: "started Online coaching program"
            }
        },
        {
            name: "Martin V.",
            action: {
                cz: "si rezervoval osobní trénink",
                en: "booked personal training"
            }
        }
    ];
    
    let notificationIndex = 0;
    
    function showPurchaseNotification() {
        const notification = document.getElementById('purchase-notification');
        const nameElement = notification.querySelector('.popup-name');
        const actionElement = notification.querySelector('.popup-action');
        
        const currentNotification = purchaseNotifications[notificationIndex];
        const currentLang = window.currentLanguage || 'CZ';
        
        nameElement.textContent = currentNotification.name;
        actionElement.textContent = currentNotification.action[currentLang.toLowerCase()];
        
        notification.classList.add('show');
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
        
        // Move to next notification
        notificationIndex = (notificationIndex + 1) % purchaseNotifications.length;
    }
    
    window.closePurchasePopup = function() {
        document.getElementById('purchase-notification').classList.remove('show');
    };
    
    // ===== UPDATED PURCHASE NOTIFICATION TIMING =====
    // Show notifications every 2 minutes (120 seconds)
    function startNotificationTimer() {
        setTimeout(() => {
            showPurchaseNotification();
            startNotificationTimer();
        }, 120000); // 2 minutes = 120,000 milliseconds
    }
    
    // Start notifications after 30 seconds initially
    setTimeout(startNotificationTimer, 30000);
    
    console.log('✅ Purchase notification system initialized');
    
    // ===== MOBILNÍ NAVIGACE =====
    // Mobilní menu toggle
    window.toggleMobileMenu = function() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
        
        // Zavři při kliknutí na odkaz
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    };
    
    // Zavři menu při resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const menu = document.querySelector('.nav-menu');
            
            if (menuToggle) menuToggle.classList.remove('active');
            if (menu) menu.classList.remove('active');
        }
    });
    
    console.log('✅ Mobile navigation initialized');
});
