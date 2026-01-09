/**
 * LOANS WITH KB - MAIN JAVASCRIPT
 * Handles navigation, form validation, and interactive features
 */

// ========================================
// MOBILE NAVIGATION
// ========================================
(function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

        hamburger.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
            hamburger.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
})();

// ========================================
// STICKY HEADER SCROLL EFFECT
// ========================================
(function initStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
})();

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================
(function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// ========================================
// CONTACT FORM VALIDATION
// ========================================
(function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone validation regex (flexible format)
    const phoneRegex = /^[\d\s\-\(\)\.]+$/;

    // Validation functions
    const validators = {
        name: (value) => {
            if (!value.trim()) {
                return 'Name is required';
            }
            if (value.trim().length < 2) {
                return 'Name must be at least 2 characters';
            }
            return '';
        },

        email: (value) => {
            if (!value.trim()) {
                return 'Email is required';
            }
            if (!emailRegex.test(value)) {
                return 'Please enter a valid email address';
            }
            return '';
        },

        phone: (value) => {
            if (!value.trim()) {
                return 'Phone number is required';
            }
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
                return 'Please enter a valid phone number';
            }
            return '';
        },

        'loan-type': (value) => {
            if (!value) {
                return 'Please select a loan type';
            }
            return '';
        },

        message: (value) => {
            if (!value.trim()) {
                return 'Message is required';
            }
            if (value.trim().length < 10) {
                return 'Message must be at least 10 characters';
            }
            return '';
        }
    };

    // Show error message
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const field = document.getElementById(fieldId);

        if (errorElement) {
            errorElement.textContent = message;
        }

        if (field) {
            field.setAttribute('aria-invalid', 'true');
        }
    }

    // Clear error message
    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const field = document.getElementById(fieldId);

        if (errorElement) {
            errorElement.textContent = '';
        }

        if (field) {
            field.setAttribute('aria-invalid', 'false');
        }
    }

    // Validate field
    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return true;

        const value = field.value;
        const validator = validators[fieldId];

        if (!validator) return true;

        const errorMessage = validator(value);

        if (errorMessage) {
            showError(fieldId, errorMessage);
            return false;
        } else {
            clearError(fieldId);
            return true;
        }
    }

    // Add real-time validation on blur
    Object.keys(validators).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldId));

            // Clear error on input
            field.addEventListener('input', () => {
                if (document.getElementById(`${fieldId}-error`).textContent) {
                    validateField(fieldId);
                }
            });
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        Object.keys(validators).forEach(fieldId => {
            if (!validateField(fieldId)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Focus first error field
            const firstError = form.querySelector('[aria-invalid="true"]');
            if (firstError) {
                firstError.focus();
            }
            return;
        }

        // If valid, submit the form
        // Netlify will handle the submission via its form detection
        form.submit();
    });
})();

// ========================================
// SUCCESS BANNER DISPLAY
// ========================================
(function initSuccessBanner() {
    const successBanner = document.getElementById('success-banner');
    if (!successBanner) return;

    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');

    if (success === '1') {
        successBanner.style.display = 'block';

        // Scroll to banner
        setTimeout(() => {
            successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);

        // Hide after 10 seconds
        setTimeout(() => {
            successBanner.style.display = 'none';
        }, 10000);
    }
})();

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS (Optional lightweight enhancement)
// ========================================
(function initScrollAnimations() {
    // Only add subtle fade-in on scroll if user hasn't indicated preference for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

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

    // Observe section elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Set initial state
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        observer.observe(section);
    });
})();

// ========================================
// MORTGAGE CALCULATOR
// ========================================
(function initMortgageCalculator() {
    // Check if calculator exists on page
    if (!document.getElementById('home-price')) return;

    // Get all input elements
    const inputs = {
        homePrice: document.getElementById('home-price'),
        homePriceSlider: document.getElementById('home-price-slider'),
        downPaymentPercent: document.getElementById('down-payment-percent'),
        downPaymentDollar: document.getElementById('down-payment-dollar'),
        downPaymentSlider: document.getElementById('down-payment-slider'),
        interestRate: document.getElementById('interest-rate'),
        interestRateSlider: document.getElementById('interest-rate-slider'),
        loanTerm: document.getElementById('loan-term'),
        propertyTax: document.getElementById('property-tax'),
        homeInsurance: document.getElementById('home-insurance'),
        hoaFees: document.getElementById('hoa-fees')
    };

    // Get all output elements
    const outputs = {
        totalPayment: document.getElementById('total-payment'),
        principalInterest: document.getElementById('principal-interest'),
        propertyTaxMonthly: document.getElementById('property-tax-monthly'),
        insuranceMonthly: document.getElementById('insurance-monthly'),
        hoaMonthly: document.getElementById('hoa-monthly'),
        pmiMonthly: document.getElementById('pmi-monthly'),
        pmiItem: document.getElementById('pmi-item'),
        loanAmount: document.getElementById('loan-amount'),
        downPaymentDisplay: document.getElementById('down-payment-display'),
        breakdownChart: document.getElementById('breakdown-chart')
    };

    // Format number as currency
    function formatCurrency(num) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(num);
    }

    // Format number with commas
    function formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(num);
    }

    // Parse currency string to number
    function parseCurrency(str) {
        return parseFloat(str.replace(/[^0-9.-]+/g, '')) || 0;
    }

    // Calculate monthly mortgage payment (Principal + Interest only)
    function calculateMortgagePayment(principal, annualRate, years) {
        if (annualRate === 0) return principal / (years * 12);

        const monthlyRate = annualRate / 100 / 12;
        const numPayments = years * 12;
        const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                       (Math.pow(1 + monthlyRate, numPayments) - 1);
        return payment;
    }

    // Calculate PMI (typically 0.5% to 1% of loan amount annually)
    function calculatePMI(loanAmount, downPaymentPercent) {
        if (downPaymentPercent >= 20) return 0;
        const pmiRate = 0.007; // 0.7% annually (middle estimate)
        return (loanAmount * pmiRate) / 12;
    }

    // Update all calculations
    function updateCalculations() {
        // Get current values
        const homePrice = parseCurrency(inputs.homePrice.value);
        const downPaymentPercent = parseFloat(inputs.downPaymentPercent.value);
        const interestRate = parseFloat(inputs.interestRate.value);
        const loanTermYears = parseInt(inputs.loanTerm.value);
        const propertyTaxYearly = parseCurrency(inputs.propertyTax.value);
        const homeInsuranceYearly = parseCurrency(inputs.homeInsurance.value);
        const hoaFeesMonthly = parseCurrency(inputs.hoaFees.value);

        // Calculate derived values
        const downPaymentDollar = homePrice * (downPaymentPercent / 100);
        const loanAmount = homePrice - downPaymentDollar;

        // Calculate monthly costs
        const principalInterest = calculateMortgagePayment(loanAmount, interestRate, loanTermYears);
        const propertyTaxMonthly = propertyTaxYearly / 12;
        const insuranceMonthly = homeInsuranceYearly / 12;
        const pmiMonthly = calculatePMI(loanAmount, downPaymentPercent);

        // Calculate total monthly payment
        const totalPayment = principalInterest + propertyTaxMonthly + insuranceMonthly + hoaFeesMonthly + pmiMonthly;

        // Update display values
        outputs.totalPayment.textContent = formatCurrency(totalPayment);
        outputs.principalInterest.textContent = formatCurrency(principalInterest);
        outputs.propertyTaxMonthly.textContent = formatCurrency(propertyTaxMonthly);
        outputs.insuranceMonthly.textContent = formatCurrency(insuranceMonthly);
        outputs.hoaMonthly.textContent = formatCurrency(hoaFeesMonthly);
        outputs.loanAmount.textContent = formatCurrency(loanAmount);
        outputs.downPaymentDisplay.textContent = `${formatCurrency(downPaymentDollar)} (${downPaymentPercent}%)`;

        // Show/hide PMI
        if (pmiMonthly > 0) {
            outputs.pmiMonthly.textContent = formatCurrency(pmiMonthly);
            outputs.pmiItem.style.display = 'flex';
        } else {
            outputs.pmiItem.style.display = 'none';
        }

        // Update chart visualization
        updateChart(principalInterest, propertyTaxMonthly, insuranceMonthly, hoaFeesMonthly, pmiMonthly, totalPayment);
    }

    // Update the visual chart
    function updateChart(principal, tax, insurance, hoa, pmi, total) {
        const chartBar = outputs.breakdownChart.querySelector('.chart-bar');
        chartBar.innerHTML = '';

        const components = [
            { class: 'principal', value: principal },
            { class: 'tax', value: tax },
            { class: 'insurance', value: insurance }
        ];

        if (hoa > 0) {
            components.push({ class: 'hoa', value: hoa });
        }

        if (pmi > 0) {
            components.push({ class: 'pmi', value: pmi });
        }

        components.forEach(comp => {
            const segment = document.createElement('div');
            segment.className = `bar-segment ${comp.class}`;
            const percentage = (comp.value / total) * 100;
            segment.style.width = `${percentage}%`;
            chartBar.appendChild(segment);
        });
    }

    // Sync home price input and slider
    inputs.homePrice.addEventListener('input', (e) => {
        const value = parseCurrency(e.target.value);
        inputs.homePriceSlider.value = value;
        inputs.homePrice.value = formatNumber(value);
        updateCalculations();
    });

    inputs.homePriceSlider.addEventListener('input', (e) => {
        inputs.homePrice.value = formatNumber(e.target.value);
        updateCalculations();
    });

    // Sync down payment percent, dollar, and slider
    inputs.downPaymentPercent.addEventListener('input', (e) => {
        const percent = parseFloat(e.target.value);
        const homePrice = parseCurrency(inputs.homePrice.value);
        const dollarAmount = homePrice * (percent / 100);

        inputs.downPaymentSlider.value = percent;
        inputs.downPaymentDollar.value = formatNumber(dollarAmount);
        updateCalculations();
    });

    inputs.downPaymentDollar.addEventListener('input', (e) => {
        const dollarAmount = parseCurrency(e.target.value);
        const homePrice = parseCurrency(inputs.homePrice.value);
        const percent = (dollarAmount / homePrice) * 100;

        inputs.downPaymentPercent.value = percent.toFixed(1);
        inputs.downPaymentSlider.value = percent;
        inputs.downPaymentDollar.value = formatNumber(dollarAmount);
        updateCalculations();
    });

    inputs.downPaymentSlider.addEventListener('input', (e) => {
        const percent = parseFloat(e.target.value);
        const homePrice = parseCurrency(inputs.homePrice.value);
        const dollarAmount = homePrice * (percent / 100);

        inputs.downPaymentPercent.value = percent;
        inputs.downPaymentDollar.value = formatNumber(dollarAmount);
        updateCalculations();
    });

    // Sync interest rate input and slider
    inputs.interestRate.addEventListener('input', (e) => {
        inputs.interestRateSlider.value = e.target.value;
        updateCalculations();
    });

    inputs.interestRateSlider.addEventListener('input', (e) => {
        inputs.interestRate.value = e.target.value;
        updateCalculations();
    });

    // Update on loan term change
    inputs.loanTerm.addEventListener('change', updateCalculations);

    // Format and update on other inputs
    inputs.propertyTax.addEventListener('input', (e) => {
        const value = parseCurrency(e.target.value);
        inputs.propertyTax.value = formatNumber(value);
        updateCalculations();
    });

    inputs.homeInsurance.addEventListener('input', (e) => {
        const value = parseCurrency(e.target.value);
        inputs.homeInsurance.value = formatNumber(value);
        updateCalculations();
    });

    inputs.hoaFees.addEventListener('input', (e) => {
        const value = parseCurrency(e.target.value);
        inputs.hoaFees.value = formatNumber(value);
        updateCalculations();
    });

    // Initial calculation on page load
    updateCalculations();
})();

// ========================================
// FAQ ACCORDION
// ========================================
(function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current answer
            question.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('active');
        });
    });
})();

// ========================================
// STICKY CTA BUTTON
// ========================================
(function initStickyCTA() {
    const stickyCTA = document.getElementById('sticky-cta');
    if (!stickyCTA) return;

    const scrollThreshold = 500; // Show after scrolling 500px

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        // Show button after scrolling past threshold
        if (currentScroll > scrollThreshold) {
            stickyCTA.classList.add('visible');
        } else {
            stickyCTA.classList.remove('visible');
        }
    }

    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
})();

// ========================================
// CONTACT FORM VALIDATION
// ========================================
(function initContactFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        loanType: document.getElementById('loan-type'),
        message: document.getElementById('message')
    };

    const errorMessages = {
        name: document.getElementById('name-error'),
        email: document.getElementById('email-error'),
        phone: document.getElementById('phone-error'),
        loanType: document.getElementById('loan-type-error'),
        message: document.getElementById('message-error')
    };

    // Validation functions
    function validateName(value) {
        if (!value || value.trim().length < 2) {
            return 'Please enter your full name (at least 2 characters)';
        }
        if (value.trim().length > 100) {
            return 'Name is too long (maximum 100 characters)';
        }
        return '';
    }

    function validateEmail(value) {
        if (!value || value.trim().length === 0) {
            return 'Please enter your email address';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    function validatePhone(value) {
        if (!value || value.trim().length === 0) {
            return 'Please enter your phone number';
        }
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 10) {
            return 'Please enter a valid phone number (at least 10 digits)';
        }
        if (digitsOnly.length > 20) {
            return 'Phone number is too long';
        }
        return '';
    }

    function validateLoanType() {
        // Loan type is optional, no validation needed
        return '';
    }

    function validateMessage(value) {
        // Message is optional, only validate length if provided
        if (value && value.trim().length > 2000) {
            return 'Message is too long (maximum 2000 characters)';
        }
        return '';
    }

    // Show error message
    function showError(field, message) {
        const errorElement = errorMessages[field];
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
            fields[field].setAttribute('aria-invalid', 'true');
            fields[field].classList.add('error');
        }
    }

    // Clear error message
    function clearError(field) {
        const errorElement = errorMessages[field];
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            fields[field].removeAttribute('aria-invalid');
            fields[field].classList.remove('error');
        }
    }

    // Validate individual field
    function validateField(fieldName) {
        const value = fields[fieldName].value;
        let errorMessage = '';

        switch(fieldName) {
            case 'name':
                errorMessage = validateName(value);
                break;
            case 'email':
                errorMessage = validateEmail(value);
                break;
            case 'phone':
                errorMessage = validatePhone(value);
                break;
            case 'loanType':
                errorMessage = validateLoanType(value);
                break;
            case 'message':
                errorMessage = validateMessage(value);
                break;
        }

        if (errorMessage) {
            showError(fieldName, errorMessage);
            return false;
        } else {
            clearError(fieldName);
            return true;
        }
    }

    // Add real-time validation on blur
    Object.keys(fields).forEach(fieldName => {
        fields[fieldName].addEventListener('blur', () => {
            validateField(fieldName);
        });

        // Clear error on input
        fields[fieldName].addEventListener('input', () => {
            if (errorMessages[fieldName].textContent) {
                clearError(fieldName);
            }
        });
    });

    // Form submission validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        Object.keys(fields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });

        // If all fields are valid, submit the form
        if (isValid) {
            // Check honeypot field (basic spam protection)
            const honeypot = form.querySelector('input[name="bot-field"]');
            if (honeypot && honeypot.value) {
                console.log('Bot detected');
                return;
            }

            // Get form data
            const formData = {
                name: fields.name.value,
                email: fields.email.value,
                phone: fields.phone.value,
                contactMethod: form.querySelector('input[name="contact-method"]:checked')?.value || 'email',
                loanType: fields.loanType.value || 'Not specified',
                message: fields.message.value || '',
                timestamp: new Date().toISOString(),
                source: 'loanswithkb.com'
            };

            // Disable submit button to prevent double submissions
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            // Submit to n8n webhook (Follow Up Boss CRM integration)
            fetch('https://n8n.meridian-automations.com/webhook/fub-lead-submission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                mode: 'cors'
            })
            .then(response => {
                // Accept any 2xx response as success
                if (response.ok) {
                    return response.json().catch(() => ({ ok: true }));
                }
                throw new Error(`Server responded with ${response.status}`);
            })
            .then((data) => {
                console.log('Form submitted successfully:', data);

                // Show success banner
                const successBanner = document.getElementById('success-banner');
                if (successBanner) {
                    successBanner.style.display = 'block';
                    successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                // Reset form
                form.reset();

                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            })
            .catch((error) => {
                console.error('Form submission error:', error);
                alert('There was an error submitting the form. Please try again or contact us directly.');

                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
})();

// ========================================
// CALCULATOR LEAD CAPTURE FORM
// ========================================
(function initCalculatorLeadCapture() {
    const leadForm = document.getElementById('calculator-lead-form');
    if (!leadForm) return;

    const hiddenFields = {
        homePrice: document.getElementById('calc-home-price'),
        downPayment: document.getElementById('calc-down-payment'),
        monthlyPayment: document.getElementById('calc-monthly-payment')
    };

    const calcOutputs = {
        homePrice: document.getElementById('home-price'),
        downPayment: document.getElementById('down-payment-display'),
        monthlyPayment: document.getElementById('total-payment')
    };

    // Update hidden fields when form is submitted
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Populate hidden fields with current calculator values
        if (hiddenFields.homePrice && calcOutputs.homePrice) {
            hiddenFields.homePrice.value = calcOutputs.homePrice.value;
        }
        if (hiddenFields.downPayment && calcOutputs.downPayment) {
            hiddenFields.downPayment.value = calcOutputs.downPayment.textContent;
        }
        if (hiddenFields.monthlyPayment && calcOutputs.monthlyPayment) {
            hiddenFields.monthlyPayment.value = calcOutputs.monthlyPayment.textContent;
        }

        // Submit to n8n webhook (calculator leads)
        const formData = new FormData(leadForm);
        const calculatorData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            homePrice: hiddenFields.homePrice.value,
            downPayment: hiddenFields.downPayment.value,
            monthlyPayment: hiddenFields.monthlyPayment.value,
            timestamp: new Date().toISOString(),
            source: 'calculator',
            leadType: 'Calculator Lead'
        };

        fetch('https://n8n.meridian-automations.com/webhook/fub-lead-submission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(calculatorData),
            mode: 'cors'
        })
        .then(response => {
            if (response.ok) {
                return response.json().catch(() => ({ ok: true }));
            }
            throw new Error(`Server responded with ${response.status}`);
        })
        .then(() => {
            // Show success message
            alert('Thank you! Your estimate has been saved. I\'ll reach out within 24 hours to discuss your numbers and answer any questions.');
            // Reset form
            leadForm.reset();
        })
        .catch((error) => {
            console.error('Form submission error:', error);
            alert('There was an error submitting the form. Please try again or contact us directly.');
        });
    });
})();

// ========================================
// PROGRESSIVE STEPPER
// ========================================
(function() {
    const stepperDots = document.querySelectorAll('.stepper-dot');
    const stepPanels = document.querySelectorAll('.step-panel');
    const prevBtn = document.querySelector('.stepper-prev');
    const nextBtn = document.querySelector('.stepper-next');
    const progressFill = document.querySelector('.progress-fill');

    if (!stepperDots.length || !stepPanels.length) return;

    let currentStep = 0;
    const totalSteps = stepPanels.length;

    function updateStepper() {
        // Update dots
        stepperDots.forEach((dot, index) => {
            dot.classList.remove('active', 'completed');
            if (index === currentStep) {
                dot.classList.add('active');
            } else if (index < currentStep) {
                dot.classList.add('completed');
            }
        });

        // Update panels
        stepPanels.forEach((panel, index) => {
            panel.classList.remove('active');
            if (index === currentStep) {
                panel.classList.add('active');
            }
        });

        // Update progress bar
        const progressPercent = (currentStep / (totalSteps - 1)) * 100;
        progressFill.style.width = `${progressPercent}%`;

        // Update navigation buttons
        if (prevBtn) {
            prevBtn.disabled = currentStep === 0;
        }

        if (nextBtn) {
            if (currentStep === totalSteps - 1) {
                nextBtn.querySelector('span').textContent = 'Get Started →';
            } else {
                nextBtn.querySelector('span').textContent = 'Next Step →';
            }
        }
    }

    // Dot navigation
    stepperDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentStep = index;
            updateStepper();
        });
    });

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateStepper();
            }
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps - 1) {
                currentStep++;
                updateStepper();
            } else {
                // On last step, scroll to CTA or redirect
                document.querySelector('.how-it-works-cta')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    }

    // Initialize
    updateStepper();
})();

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================
(function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (!slides.length || !dots.length) return;

    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Start autoplay
    startAutoplay();

    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }
})();

// ========================================
// LOAN PROGRAMS ACCORDION
// ========================================
(function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all other accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    const otherContent = otherHeader.parentElement.querySelector('.accordion-content');
                    otherContent.classList.remove('active');
                }
            });

            // Toggle current accordion
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                accordionContent.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                accordionContent.classList.add('active');
            }
        });
    });
})();

// ========================================
// UTILITIES
// ========================================

// Log when JS is loaded (for debugging)
console.log('Loans with KB - JavaScript loaded successfully');
