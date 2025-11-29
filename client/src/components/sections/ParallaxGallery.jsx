import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxGallery() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const columns = document.querySelectorAll('.parallax-col');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: 1
                }
            });

            columns.forEach(col => {
                const offset = col.getAttribute('data-offset');
                tl.fromTo(col, {
                    y: offset
                }, {
                    y: -offset,
                    ease: "none"
                }, 0);
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const images = [
        ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500", "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=500"],
        ["https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=500", "https://images.unsplash.com/photo-1615715757401-f30e7b27b912?q=80&w=500"],
        ["https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=500", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500"],
        ["https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=500", "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=500"]
    ];
    const offsets = [-250, 150, -100, 300];

    return (
        <div className="bg-void relative overflow-hidden z-20 border-t border-white/5">
            <section id="parallax-gallery" ref={sectionRef} className="relative flex h-screen gap-4 md:gap-6 px-4 md:px-12 items-center justify-center overflow-hidden">
                {images.map((colImages, i) => (
                    <div key={i} className={`parallax-col w-1/2 md:w-1/4 min-w-[150px] md:min-w-[200px] flex flex-col gap-4 md:gap-8 ${i >= 2 ? 'hidden md:flex' : ''}`} data-offset={offsets[i]}>
                        {colImages.map((src, j) => (
                            <div key={j} className="w-full aspect-[3/4] rounded-[2px] overflow-hidden border border-white/10">
                                <img src={src} className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-1000" />
                            </div>
                        ))}
                    </div>
                ))}
            </section>
        </div>
    );
}
