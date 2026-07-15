document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Встановлення поточного року
    const y = new Date().getFullYear();
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = y;

    // 2. Плавна прокрутка (як на main; працює разом зі scroll-snap)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = href && document.querySelector(href);
            if (!target) {
                return;
            }

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // 3. Безкінечний бігучий рядок (Marquee)
    // Дублюємо контент рівно один раз: CSS-анімація зсуває на -50%,
    // тож двох однакових копій достатньо для безшовного циклу.
    const marquee = document.getElementById('marquee-content');
    if (marquee) {
        marquee.innerHTML += marquee.innerHTML;
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