// scroll-animation.js

class ScrollAnimator {
    constructor() {
        this.items = document.querySelectorAll('.animate-on-scroll');

        this.observer = new IntersectionObserver(
            this.handleIntersect.bind(this),
            {
                threshold: 0.15,
            }
        );

        this.init();
    }

    init() {
        this.items.forEach((item) => {
            this.observer.observe(item);
        });
    }

    handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Remove this line if you want repeat animations
                this.observer.unobserve(entry.target);
            }
        });
    }
}

new ScrollAnimator();