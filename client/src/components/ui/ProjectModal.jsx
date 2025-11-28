import { useEffect, useRef } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { gsap } from 'gsap';

export default function ProjectModal({ project, onClose, onOpenLightbox }) {
    const modalRef = useRef(null);
    const heroImgRef = useRef(null);

    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
            const tl = gsap.timeline();

            tl.fromTo(modalRef.current, { opacity: 0, visibility: 'hidden' }, { opacity: 1, visibility: 'visible', duration: 0.6, ease: "power3.out" })
                .fromTo(heroImgRef.current, { scale: 1.1 }, { scale: 1, duration: 1.5, ease: "power3.out" }, "-=0.6")
                .fromTo(".modal-anim", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }, "-=1");

        } else {
            document.body.style.overflow = '';
        }
    }, [project]);

    if (!project) return null;

    return (
        <div ref={modalRef} id="project-modal" className="fixed inset-0 z-[8000] bg-void overflow-y-auto scroll-behavior-smooth opacity-0 invisible">
            <div className="modal-close-btn hover-trigger p-4 flex items-center gap-2 group sticky top-8 right-8 z-50 self-end float-right cursor-pointer" onClick={onClose}>
                <span className="font-mono text-xs text-white group-hover:text-gold-accent transition-colors bg-black/50 px-2 py-1 rounded backdrop-blur-sm">CLOSE</span>
                <div className="bg-black/50 p-2 rounded-full backdrop-blur-sm">
                    <X className="w-6 h-6 text-white group-hover:text-gold-accent transition-colors" />
                </div>
            </div>

            <div className="relative w-full bg-void pb-32">
                <div className="h-[80vh] w-full relative overflow-hidden">
                    <img ref={heroImgRef} src={project.cover} className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent"></div>
                    <div className="absolute bottom-16 left-6 md:left-24 max-w-4xl">
                        <h2 className="modal-anim text-5xl md:text-8xl font-display text-white mb-4 leading-none drop-shadow-2xl">{project.title}</h2>
                        <p className="modal-anim font-serif text-gold-accent italic text-2xl drop-shadow-lg">{project.desc}</p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-6 py-24 text-center">
                    <div className="w-[1px] h-24 bg-gold-accent/50 mx-auto mb-12 modal-anim"></div>
                    <p className="modal-anim font-serif text-xl md:text-2xl text-gray-300 leading-relaxed">{project.longDesc}</p>
                    <div className="w-[1px] h-24 bg-gold-accent/50 mx-auto mt-12 modal-anim"></div>
                </div>

                <div className="px-4 md:px-24 max-w-[1920px] mx-auto">
                    <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                        {project.gallery.map((src, i) => (
                            <div key={i} className={`relative w-full ${i % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "col-span-1 aspect-[3/4]"} overflow-hidden rounded-sm bg-charcoal mb-8 border border-white/5 group cursor-zoom-in modal-anim`} onClick={() => onOpenLightbox(src)}>
                                <img src={src} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                    <Maximize2 className="text-white w-8 h-8 opacity-80" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
