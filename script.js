document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Navbar scroll background change
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        hamburger.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                navLinks.classList.toggle('active');
            }
        });
    }

    // Dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');

        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });

        dropdownLink.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Donation popup
    const popup = document.getElementById('donationPopup');
    const closeBtn = document.getElementById('closePopup');

    if (popup && closeBtn) {
        setTimeout(() => {
            popup.classList.add('active');
        }, 1500);

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                popup.classList.remove('active');
            }
        });
    }

    // Carousel functionality
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.querySelector('.carousel-dots');
    const carouselContainer = document.querySelector('.carousel-container');
    let currentIndex = 0;
    let autoSlide;

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.style.display = index === currentIndex ? 'flex' : 'none';
        });

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            dot.setAttribute('aria-selected', index === currentIndex ? 'true' : 'false');
        });
    }

    function generateDots() {
        dotsContainer.innerHTML = '';
        carouselItems.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
            if (i === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                resetAutoSlide();
            });

            dotsContainer.appendChild(dot);
        });
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlide = setInterval(showNextSlide, 3000
        );// 3 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { showNextSlide(); resetAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { showPrevSlide(); resetAutoSlide(); });

    if (carouselItems.length > 0) {
        generateDots();
        updateCarousel();
        startAutoSlide();
    }

    // ✅ Pause carousel auto-slide on mouse hover
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseover', () => {
            clearInterval(autoSlide);
        });

        carouselContainer.addEventListener('mouseout', () => {
            startAutoSlide();
        });
    }
});
