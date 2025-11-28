import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection({ onOpenProject }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = document.querySelectorAll('.masonry-item');
            items.forEach((item, i) => {
                gsap.fromTo(item,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1, delay: i * 0.1, ease: "power3.out",
                        scrollTrigger: { trigger: item, start: "top 90%" }
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={sectionRef} className="relative py-32 bg-void z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto mb-24 px-6 md:px-12 flex justify-between items-end">
                <h2 className="text-4xl md:text-6xl font-display text-white">Selected<br /><span className="font-serif italic text-gold-accent">Works</span></h2>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <div className="masonry-grid">
                    {projectsData.map((project, i) => (
                        <div key={i} className="masonry-item group hover-trigger cursor-pointer" onClick={() => onOpenProject(project)}>
                            <div className="relative overflow-hidden rounded-sm border border-white/5 bg-charcoal">
                                <img src={project.cover} alt={project.title} className="w-full block transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent/50 opacity-0 transition-opacity duration-400 flex flex-col justify-end p-8 group-hover:opacity-100">
                                    <div className="transform translate-y-5 transition-transform duration-400 delay-100 group-hover:translate-y-0">
                                        <p className="font-mono text-gold-accent text-xs tracking-widest mb-2">0{i + 1}</p>
                                        <h3 className="font-display text-white text-2xl leading-none mb-1">{project.title}</h3>
                                        <p className="font-serif text-gray-400 text-sm italic">{project.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
