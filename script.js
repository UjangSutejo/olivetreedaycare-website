document.addEventListener('DOMContentLoaded', () => {
    const facilityCards = document.querySelectorAll('.facility-card');

    facilityCards.forEach(card => {
        card.addEventListener('click', () => {
            const page = card.getAttribute('data-page');
            if (page) {
                window.location.href = page;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function initFacilitySwipeSlider() {
        document.querySelectorAll('.facility-detail-image').forEach(slider => {
            const images = Array.from(slider.querySelectorAll('img'));
            const dots = Array.from(slider.querySelectorAll('.slider-indicators .dot'));
            if (!images.length || !dots.length) return;
            let current = images.findIndex(img => img.classList.contains('active'));
            if (current === -1) current = 0;
            let startX = 0, endX = 0;
            let autoSlideTimer = null;
            let userInteracting = false;

            function showSlide(idx) {
                images.forEach((img, i) => img.classList.toggle('active', i === idx));
                dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
            }
            function startAutoSlide() {
                if (autoSlideTimer) clearInterval(autoSlideTimer);
                autoSlideTimer = setInterval(() => {
                    if (!userInteracting) {
                        current = (current + 1) % images.length;
                        showSlide(current);
                    }
                }, 2000); // 2 detik
            }
            function stopAutoSlide() {
                if (autoSlideTimer) clearInterval(autoSlideTimer);
            }
            showSlide(current);
            startAutoSlide();

            slider.addEventListener('touchstart', e => {
                startX = e.touches[0].clientX;
                userInteracting = true;
                stopAutoSlide();
            });
            slider.addEventListener('touchmove', e => {
                endX = e.touches[0].clientX;
            });
            slider.addEventListener('touchend', () => {
                if (startX && endX) {
                    if (startX - endX > 40) { // swipe left
                        current = (current + 1) % images.length;
                        showSlide(current);
                    } else if (endX - startX > 40) { // swipe right
                        current = (current - 1 + images.length) % images.length;
                        showSlide(current);
                    }
                }
                startX = endX = 0;
                userInteracting = false;
                startAutoSlide();
            });

            // Dot click (optional)
            dots.forEach((dot, idx) => {
                dot.onclick = () => {
                    current = idx;
                    showSlide(current);
                    userInteracting = true;
                    stopAutoSlide();
                    setTimeout(() => {
                        userInteracting = false;
                        startAutoSlide();
                    }, 1000);
                };
            });
        });
    }

    function setupSliderOnMobile() {
        if (window.innerWidth <= 600) {
            initFacilitySwipeSlider();
        }
    }

    setupSliderOnMobile();
    window.addEventListener('resize', setupSliderOnMobile);
});

// Sidebar toggle (mobile)
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.style.display === 'flex') {
        sidebar.classList.remove('show');
        setTimeout(() => {
            sidebar.style.display = 'none';
        }, 300);
    } else {
        sidebar.style.display = 'flex';
        setTimeout(() => {
            sidebar.classList.add('show');
        }, 10);
    }
}
function hideMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('show');
    setTimeout(() => {
        sidebar.style.display = 'none';
    }, 300);
} 