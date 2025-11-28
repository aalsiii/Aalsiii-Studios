import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function Loader() {
    useEffect(() => {
        const tl = gsap.timeline();

        // Ensure initial state
        gsap.set(".loader-text span", { y: -100, opacity: 0 });

        tl.to(".loader-text span", {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.1,
            ease: "power4.out"
        })
            .to("#loader", {
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    const loader = document.getElementById('loader');
                    if (loader) loader.style.display = 'none';
                }
            });
    }, []);

    return (
        <div id="loader" className="fixed inset-0 bg-black z-[10000] flex justify-center items-center">
            <div className="loader-text font-display text-2xl text-gold-accent tracking-[0.5em]">
                {['A', 'A', 'L', 'S', 'I', 'I', 'I'].map((char, i) => (
                    <span key={i} className="inline-block opacity-0 translate-y-4">{char}</span>
                ))}
            </div>
        </div>
    );
}
