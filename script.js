/**
 * Grace Community Church - Main JavaScript
 * Handles: Light/Dark Theme Toggling, and Directory Search/Filter
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LIGHT / DARK MODE TOGGLE
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const toggleIcon = themeToggleBtn.querySelector('i');

    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggleIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

// ==========================================
    // 2. INTERACTIVE COLUMNS accordion EXPAND ENGINE
    // ==========================================
    const level2Cards = document.querySelectorAll('.org-column .level-2-node');
    const allColumns = document.querySelectorAll('.org-column');

    level2Cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentColumn = card.closest('.org-column');
            
            if (parentColumn.classList.contains('active')) {
                parentColumn.classList.remove('active');
            } else {
                // Instantly closes all other departments open on screen
                allColumns.forEach(col => col.classList.remove('active'));
                parentColumn.classList.add('active');
            }
        });
    });

    // ==========================================
    // 2. MEMBER DIRECTORY SEARCH & FILTER
    // ==========================================
    const searchInput = document.getElementById('directory-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const directoryCards = document.querySelectorAll('.dir-item-card');

    function filterDirectory() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        directoryCards.forEach(card => {
            const name = card.querySelector('h4').textContent.toLowerCase();
            const title = card.querySelector('.dir-title').textContent.toLowerCase();
            const category = card.getAttribute('data-category');

            const matchesSearch = name.includes(searchTerm) || title.includes(searchTerm);
            const matchesCategory = (activeFilter === 'all') || (category === activeFilter);

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterDirectory);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterDirectory();
        });
    });


    // ==========================================
    // 3. CONTACT FORM SUBMISSION INTERCEPT
    // ==========================================
    const contactForm = document.getElementById('church-contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! A ministry administrator will contact you shortly.');
        contactForm.reset();
    });
});
// Paste this at the very bottom of your script.js file
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const expandableCards = document.querySelectorAll('.expandable-pillar');

        expandableCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent collapsing card if clicking directly on a nested node
                if (e.target.closest('.personnel-node')) return;

                // Toggle active expansion states
                card.classList.toggle('is-expanded');
            });
        });
    });
})();