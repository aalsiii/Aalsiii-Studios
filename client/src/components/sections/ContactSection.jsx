import TextRoll from '../ui/TextRoll';

export default function ContactSection() {
    return (
        <section id="contact" className="py-20 md:py-32 px-6 bg-charcoal relative">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-gold-accent font-sans tracking-[0.3em] text-xs mb-6">INQUIRIES</p>
                <h2 className="text-5xl md:text-7xl font-display mb-12 hover-trigger cursor-none text-white">Let's Create <br /> <span className="italic font-serif text-gray-500">Something Timeless</span></h2>

                <div className="flex flex-col items-center justify-center mt-16 space-y-12">
                    <TextRoll href="mailto:bijalwanakshat@gmail.com" className="text-2xl sm:text-4xl md:text-7xl font-sans font-light lowercase text-white hover:text-gold-accent transition-colors leading-tight break-all md:break-normal" text="bijalwanakshat@gmail.com" />

                    <div className="flex gap-8 md:gap-16 font-sans text-sm tracking-widest text-gray-400">
                        <TextRoll href="https://www.instagram.com/akxhatzzz/" className="py-2 border-b border-white/10 hover:border-gold-accent transition-colors" text="Instagram" />
                        <TextRoll href="https://www.linkedin.com/in/akshat-bijalwan-2910a7378/" className="py-2 border-b border-white/10 hover:border-gold-accent transition-colors" text="LinkedIn" />
                    </div>
                </div>
                <footer className="mt-32 text-gray-600 text-xs font-sans tracking-wider">
                    &copy; 2025 AALSIII PHOTOGRAPHY. ALL RIGHTS RESERVED.
                </footer>
            </div>
        </section>
    );
}
