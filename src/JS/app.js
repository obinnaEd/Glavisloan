
// Enhanced JavaScript for better UX and accessibility
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let mobileMenuOpen = false;

    mobileMenuButton.addEventListener('click', function () {
        mobileMenuOpen = !mobileMenuOpen;

        if (mobileMenuOpen) {
            mobileMenu.style.maxHeight = '100vh'; // full height of viewport
            mobileMenu.style.opacity = '1';
            mobileMenuButton.setAttribute('aria-expanded', 'true');
            mobileMenuButton.classList.add('hamburger-active');
        } else {
            mobileMenu.style.maxHeight = '0';
            mobileMenu.style.opacity = '0';
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.classList.remove('hamburger-active');
        }

    });

    // Desktop dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        const dropdown = toggle.nextElementSibling;
        let dropdownOpen = false;

        // Click event
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Close other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherDropdown = otherToggle.nextElementSibling;
                    otherDropdown.classList.add('hidden');
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.classList.remove('dropdown-open');
                }
            });

            dropdownOpen = !dropdownOpen;

            if (dropdownOpen) {
                dropdown.classList.remove('hidden');
                toggle.setAttribute('aria-expanded', 'true');
                toggle.classList.add('dropdown-open');
                dropdown.focus();
            } else {
                dropdown.classList.add('hidden');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('dropdown-open');
            }
        });


        // Keyboard navigation
        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            } else if (e.key === 'Escape') {
                dropdown.classList.add('hidden');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('dropdown-open');
                dropdownOpen = false;
            }
        });
    });

    // Mobile dropdown functionality
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    mobileDropdownToggles.forEach(toggle => {
        const content = toggle.nextElementSibling;
        let isOpen = false;

        toggle.addEventListener('click', function () {
            isOpen = !isOpen;

            if (isOpen) {
                content.style.maxHeight = content.scrollHeight + 'px';
                toggle.setAttribute('aria-expanded', 'true');
                toggle.querySelector('.fa-chevron-down').style.transform = 'rotate(180deg)';
            } else {
                content.style.maxHeight = '0';
                toggle.setAttribute('aria-expanded', 'false');
                toggle.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.nextElementSibling;
            const isClickInsideToggle = toggle.contains(e.target);
            const isClickInsideDropdown = dropdown.contains(e.target);

            if (!isClickInsideToggle && !isClickInsideDropdown) {
                // close dropdown
                dropdown.classList.add('hidden');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('dropdown-open');
            }
        });
    });


    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('#mobile-menu') && !e.target.closest('#mobile-menu-button') && mobileMenuOpen) {
            mobileMenu.style.maxHeight = '0';
            mobileMenu.style.opacity = '0';
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.classList.remove('hamburger-active');
            mobileMenuOpen = false;
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            // Reset mobile menu on desktop
            mobileMenu.style.maxHeight = '0';
            mobileMenu.style.opacity = '0';
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.classList.remove('hamburger-active'); // ✅ fixed
            mobileMenuOpen = false;
        }
    });

    // Add smooth scrolling for anchor links
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



});