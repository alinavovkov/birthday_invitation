document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Встановлення поточного року
    const y = new Date().getFullYear();
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = y;

    // 2. Плавна прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { 
                e.preventDefault(); 
                target.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
            }
        });
    });

    // 3. Безкінечний бігучий рядок (Marquee)
    const marquee = document.getElementById('marquee-content');
    if (marquee) {
        const containerHeight = marquee.parentElement.offsetHeight;
        let contentHeight = marquee.offsetHeight;

        // Клонуємо контент, щоб заповнити простір
        while (contentHeight < containerHeight * 2) {
            const clone = marquee.innerHTML;
            marquee.innerHTML += clone;
            contentHeight = marquee.offsetHeight;
        }
    }

    // 4. Анімація декору біля essentials при скролі
    const essentialsBlock = document.querySelector('.essentials-block');
    if (essentialsBlock && 'IntersectionObserver' in window) {
        const decorObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    essentialsBlock.classList.add('is-visible');
                    decorObserver.disconnect();
                }
            });
        }, { threshold: 0.35 });

        decorObserver.observe(essentialsBlock);
    } else if (essentialsBlock) {
        essentialsBlock.classList.add('is-visible');
    }
});