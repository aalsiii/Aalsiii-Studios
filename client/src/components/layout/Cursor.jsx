import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
    useEffect(() => {
        const dot = document.getElementById('cursor-dot');
        const outline = document.getElementById('cursor-outline');

        // Use quickTo for better performance
        const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
        const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

        const xOutline = gsap.quickTo(outline, "x", { duration: 0.25, ease: "power3.out" });
        const yOutline = gsap.quickTo(outline, "y", { duration: 0.25, ease: "power3.out" });

        const moveCursor = (e) => {
            xDot(e.clientX);
            yDot(e.clientY);
            xOutline(e.clientX);
            yOutline(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        const addHover = () => document.body.classList.add('hovering');
        const removeHover = () => document.body.classList.remove('hovering');

        const handleMouseOver = (e) => {
            if (e.target.closest('.hover-trigger')) {
                addHover();
            } else {
                removeHover();
            }
        };

        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        }
    }, []);

    return (
        <>
            <div id="cursor-dot" className="fixed top-0 left-0 w-2 h-2 bg-gold-accent rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
            <div id="cursor-outline" className="fixed top-0 left-0 w-10 h-10 border border-gold-accent/40 rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-200"></div>
        </>
    );
}
