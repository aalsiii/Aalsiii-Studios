import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextRoll from '../ui/TextRoll';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-img-reveal", {
                y: 50, opacity: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: ".about-img-reveal", start: "top 80%" }
            });

            gsap.from(".about-text-reveal", {
                y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: ".about-text-reveal", start: "top 80%" }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="relative py-20 md:py-32 bg-charcoal overflow-hidden border-t border-white/5 z-50">


            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-16 md:mb-24 flex justify-between items-end">
                    <h2 className="text-4xl md:text-6xl font-display text-white">About<br /><span className="font-serif italic text-gold-accent">Me</span></h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="relative group perspective-container">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-void about-img-reveal">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200" alt="Artist Portrait" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out scale-100 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="mb-8 about-text-reveal">
                            <span className="inline-block w-12 h-[1px] bg-gold-accent mb-1 align-middle mr-4"></span>
                            <span className="font-mono text-gold-accent text-xs tracking-widest uppercase">The Artist</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display text-white mb-8 leading-tight about-text-reveal">Crafting <span className="italic font-serif text-gold-accent">Silence</span> <br /> in a Loud World.</h2>
                        <div className="space-y-6 about-text-reveal">
                            <p className="font-sans text-gray-300 leading-relaxed text-lg">"I don't just take photographs; I capture the feeling of a moment before it fades."</p>
                            <p className="font-sans text-gray-500 leading-relaxed text-sm">Based in Tokyo, working globally. Featured in major publications.</p>
                        </div>

                        <div className="mt-12 space-y-6 border-t border-white/10 pt-8 about-text-reveal">
                            <div className="flex justify-between items-center group cursor-pointer border-b border-transparent hover:border-white/10 pb-2 transition-colors">
                                <TextRoll href="#contact" className="font-display text-xl text-white group-hover:text-gold-accent transition-colors" text="Trusted By Brands" />
                                <span className="font-mono text-xs text-gray-500">Worldwide</span>
                            </div>
                            <div className="flex justify-between items-center group cursor-pointer border-b border-transparent hover:border-white/10 pb-2 transition-colors">
                                <TextRoll href="#work" className="font-display text-xl text-white group-hover:text-gold-accent transition-colors" text="Featured Editorially" />
                                <span className="font-mono text-xs text-gray-500">Print & Digital</span>
                            </div>
                            <div className="flex justify-between items-center group cursor-pointer border-b border-transparent hover:border-white/10 pb-2 transition-colors">
                                <TextRoll href="#about" className="font-display text-xl text-white group-hover:text-gold-accent transition-colors" text="Exhibited Globally" />
                                <span className="font-mono text-xs text-gray-500">Galleries</span>
                            </div>
                        </div>
                        <div className="mt-12 about-text-reveal">
                            <span className="font-serif italic text-4xl text-white/20 select-none">Aalsiii.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
