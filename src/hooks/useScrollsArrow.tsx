import { useState, useEffect, type RefObject } from 'react';

export const useScrollArrows = (scrollContainerRef: RefObject<HTMLDivElement>) => {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        const container = scrollContainerRef.current;
        const isDesktop = window.innerWidth >= 1024;

        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setShowLeftArrow(scrollLeft > 0 && isDesktop);
            setShowRightArrow(Math.ceil(scrollLeft) + clientWidth < scrollWidth && isDesktop);
        } else {
            setShowLeftArrow(false);
            setShowRightArrow(false);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    return { showLeftArrow, showRightArrow, checkScroll };
};
