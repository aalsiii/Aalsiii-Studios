import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection({ onImageClick }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = document.querySelectorAll('.masonry-item');
            items.forEach((item, i) => {
                gsap.fromTo(item,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1, delay: i * 0.05, ease: "power3.out",
                        scrollTrigger: { trigger: item, start: "top 95%" }
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={sectionRef} className="relative py-20 md:py-32 bg-void z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto mb-16 md:mb-24 px-6 md:px-12 flex justify-between items-end">
                <h2 className="text-4xl md:text-6xl font-display text-white">Selected<br /><span className="font-serif italic text-gold-accent">Works</span></h2>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <div className="masonry-grid">
                    {projectsData.map((imgSrc, i) => (
                        <div key={i} className="masonry-item group cursor-pointer mb-4" onClick={() => onImageClick(imgSrc)}>
                            <div className="relative overflow-hidden rounded-sm border border-white/5 bg-charcoal">
                                <img src={imgSrc} alt={`Work ${i + 1}`} className="w-full block transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
