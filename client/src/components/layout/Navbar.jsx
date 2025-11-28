import { Menu } from 'lucide-react';
import TextRoll from '../ui/TextRoll';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
            <div className="text-xl font-display font-bold tracking-[0.3em] cursor-pointer hover-trigger text-white">AALSIII</div>
            <div className="hidden md:flex space-x-16 font-sans text-xs tracking-[0.2em] uppercase text-white/80">
                <TextRoll href="#work" className="hover-trigger hover:text-gold-accent transition-colors" text="Work" />
                <TextRoll href="#about" className="hover-trigger hover:text-gold-accent transition-colors" text="Artist" />
                <TextRoll href="#contact" className="hover-trigger hover:text-gold-accent transition-colors" text="Contact" />
            </div>
            <button className="md:hidden hover-trigger text-white"><Menu className="w-6 h-6" /></button>
        </nav>
    )
}
