import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import TextRoll from '../ui/TextRoll';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const menuItemsRef = useRef([]);
    const tlRef = useRef(null);

    useGSAP(() => {
        gsap.set(menuRef.current, { xPercent: 100 });
        
        tlRef.current = gsap.timeline({ paused: true })
            .to(menuRef.current, {
                xPercent: 0,
                duration: 0.8,
                ease: "power3.inOut"
            })
            .from(menuItemsRef.current, {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.4");

    }, { scope: menuRef });

    useEffect(() => {
        if (tlRef.current) {
            if (isMenuOpen) {
                tlRef.current.play();
                document.body.style.overflow = 'hidden';
            } else {
                tlRef.current.reverse();
                document.body.style.overflow = '';
            }
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <nav className="fixed top-0 w-full p-6 md:p-8 z-50 flex justify-between items-center mix-blend-difference">
                <div className="text-xl font-display font-bold tracking-[0.3em] cursor-pointer hover-trigger text-white z-50 relative">AALSIII</div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-16 font-sans text-xs tracking-[0.2em] uppercase text-white/80">
                    <TextRoll href="#work" className="hover-trigger hover:text-gold-accent transition-colors" text="Work" />
                    <TextRoll href="#about" className="hover-trigger hover:text-gold-accent transition-colors" text="Artist" />
                    <TextRoll href="#contact" className="hover-trigger hover:text-gold-accent transition-colors" text="Contact" />
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={toggleMenu}
                    className="md:hidden hover-trigger text-white z-50 relative focus:outline-none"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                ref={menuRef}
                className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center md:hidden"
            >
                <div className="flex flex-col space-y-8 text-center">
                    <div ref={el => menuItemsRef.current[0] = el}>
                        <a 
                            href="#work" 
                            onClick={closeMenu}
                            className="font-display text-4xl text-white hover:text-gold-accent transition-colors"
                        >
                            Work
                        </a>
                    </div>
                    <div ref={el => menuItemsRef.current[1] = el}>
                        <a 
                            href="#about" 
                            onClick={closeMenu}
                            className="font-display text-4xl text-white hover:text-gold-accent transition-colors"
                        >
                            Artist
                        </a>
                    </div>
                    <div ref={el => menuItemsRef.current[2] = el}>
                        <a 
                            href="#contact" 
                            onClick={closeMenu}
                            className="font-display text-4xl text-white hover:text-gold-accent transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </div>
                
                <div className="absolute bottom-12 text-white/30 text-xs tracking-widest uppercase">
                    Aalsiii Studios
                </div>
            </div>
        </>
    )
}
