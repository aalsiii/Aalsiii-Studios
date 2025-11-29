export default function QuoteSection() {
    return (
        <section className="relative min-h-[40vh] flex flex-col items-center justify-center text-center px-6 bg-void z-20 mt-16 md:mt-[120px]">
            <div className="max-w-5xl">
                <h3 className="text-3xl md:text-5xl font-display leading-relaxed text-white/90">
                    <span className="font-serif italic text-gold-accent mr-4">"</span>Photography is the art of<br />
                    <span className="text-white">frozen time.</span><span className="font-serif italic text-gold-accent ml-4">"</span>
                </h3>
            </div>
        </section>
    );
}
