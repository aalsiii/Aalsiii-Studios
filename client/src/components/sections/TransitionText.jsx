import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TransitionText() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.to(".reveal-text", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            })
                .to(".reveal-sub", {
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.5");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="transition-text" ref={sectionRef} className="relative py-40 bg-void flex flex-col items-center justify-center overflow-hidden z-40">
            <div className="max-w-[80vw] text-center z-10">
                <h2 className="text-5xl md:text-8xl font-display leading-[1.1] text-white mix-blend-difference">
                    <div className="overflow-hidden"><span className="inline-block reveal-text translate-y-full opacity-0">VISUAL</span></div>
                    <div className="overflow-hidden"><span className="inline-block reveal-text translate-y-full opacity-0 text-gold-accent font-serif italic pr-4">Symphony</span></div>
                </h2>
                <div className="h-[1px] w-24 bg-gold-accent mx-auto mt-12 mb-6 reveal-sub opacity-0"></div>
            </div>
        </section>
    );
}
