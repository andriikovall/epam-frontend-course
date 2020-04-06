export const lazyLoad = (target, intersectingCb) => {
    const intersectionObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                intersectingCb();
            }
        })

    });

    intersectionObserver.observe(target);
}