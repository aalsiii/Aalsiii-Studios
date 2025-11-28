'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText);

const defaultSections = [
    {
        text: "Whispers of Radiance",
        img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img1.jpeg"
    },
    {
        text: "Ethereal Moments",
        img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img3.jpeg"
    },
    {
        text: "Silent Beauty",
        img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img5.jpeg"
    }
];

export default function Hero({
    sections = defaultSections,
    className = "",
}) {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const splitHeadingsRef = useRef([]);
    const currentIndexRef = useRef(-1);
    const sectionsRefs = useRef([]);
    const imagesRefs = useRef([]);
    const outerRefs = useRef([]);
    const innerRefs = useRef([]);
    const headingRefs = useRef([]);
    const counterCurrentRef = useRef(null);
    const counterNextRef = useRef(null);
    const counterCurrentSplitRef = useRef(null);
    const counterNextSplitRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoPlayTimerRef = useRef(null);

    useEffect(() => {
        let loaded = 0;
        sections.forEach((section) => {
            const img = new Image();
            img.src = section.img;
            img.onload = () => {
                loaded++;
                if (loaded === sections.length) {
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                loaded++;
                if (loaded === sections.length) {
                    setImagesLoaded(true);
                }
            };
        });
    }, [sections]);

    const gotoSection = useCallback((index, direction) => {
        // If we are already at the target index, do nothing
        if (index === currentIndexRef.current) return;

        const sectionsElements = sectionsRefs.current;
        const images = imagesRefs.current;
        const outerWrappers = outerRefs.current;
        const innerWrappers = innerRefs.current;

        const wrap = gsap.utils.wrap(0, sectionsElements.length);
        index = wrap(index);

        // If direction is not provided, calculate it based on index
        if (direction === undefined) {
            direction = index > currentIndexRef.current ? 1 : -1;
        }

        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;

        // Kill any existing timeline to prevent conflicts
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const tl = gsap.timeline({
            defaults: { duration: 1.25, ease: 'power1.inOut' }
        });

        timelineRef.current = tl;

        if (currentIndexRef.current >= 0) {
            gsap.set(sectionsElements[currentIndexRef.current], { zIndex: 0 });
            tl.to(images[currentIndexRef.current], { xPercent: -15 * dFactor })
                .set(sectionsElements[currentIndexRef.current], { autoAlpha: 0 });
        }

        gsap.set(sectionsElements[index], { autoAlpha: 1, zIndex: 1 });

        tl.fromTo(
            [outerWrappers[index], innerWrappers[index]],
            {
                xPercent: (i) => (i ? -100 * dFactor : 100 * dFactor)
            },
            { xPercent: 0 },
            0
        )
            .fromTo(
                images[index],
                { xPercent: 15 * dFactor },
                { xPercent: 0 },
                0
            );

        if (splitHeadingsRef.current[index] && splitHeadingsRef.current[index].lines) {
            const lines = splitHeadingsRef.current[index].lines;

            gsap.set(lines, {
                opacity: 0,
                yPercent: 100
            });

            tl.to(
                lines,
                {
                    opacity: 1,
                    yPercent: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    stagger: {
                        each: 0.1,
                        from: 'start'
                    }
                },
                0.4
            );
        }

        if (counterCurrentRef.current && counterNextRef.current) {
            if (!counterCurrentSplitRef.current) {
                counterCurrentSplitRef.current = new SplitText(counterCurrentRef.current, {
                    type: 'lines',
                    linesClass: 'line',
                    mask: 'lines'
                });
            }

            counterNextRef.current.textContent = String(index + 1);
            gsap.set(counterNextRef.current, { opacity: 1 });

            if (counterNextSplitRef.current) {
                counterNextSplitRef.current.revert();
                counterNextSplitRef.current = null;
            }
            counterNextSplitRef.current = new SplitText(counterNextRef.current, {
                type: 'lines',
                linesClass: 'line',
                mask: 'lines'
            });

            const currentLines = counterCurrentSplitRef.current?.lines || [];
            const nextLines = counterNextSplitRef.current?.lines || [];

            gsap.set(currentLines, { opacity: 1, yPercent: 0 });
            gsap.set(nextLines, { opacity: 1, yPercent: 100 * dFactor });

            tl.to(
                currentLines,
                {
                    yPercent: -100 * dFactor,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    stagger: { each: 0.1, from: 'start' }
                },
                0.4
            );
            tl.to(
                nextLines,
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    stagger: { each: 0.1, from: 'start' }
                },
                0.4
            ).add(() => {
                if (counterCurrentSplitRef.current) {
                    counterCurrentSplitRef.current.revert();
                    counterCurrentSplitRef.current = null;
                }
                if (counterNextSplitRef.current) {
                    counterNextSplitRef.current.revert();
                    counterNextSplitRef.current = null;
                }
                if (counterCurrentRef.current && counterNextRef.current) {
                    counterCurrentRef.current.textContent = counterNextRef.current.textContent;
                }
                gsap.set(counterNextRef.current, { opacity: 0, clearProps: 'all' });
            });
        }

        currentIndexRef.current = index;
        setCurrentIndex(index);
    }, []);

    // Auto-play logic
    const startAutoPlay = useCallback(() => {
        if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = setInterval(() => {
            const nextIndex = (currentIndexRef.current + 1) % sections.length;
            gotoSection(nextIndex, 1);
        }, 2000);
    }, [sections.length, gotoSection]);

    const stopAutoPlay = useCallback(() => {
        if (autoPlayTimerRef.current) {
            clearInterval(autoPlayTimerRef.current);
            autoPlayTimerRef.current = null;
        }
    }, []);

    const handleManualNavigation = (index) => {
        stopAutoPlay();
        const direction = index > currentIndexRef.current ? 1 : -1;
        gotoSection(index, direction);
        startAutoPlay(); // Restart timer after manual interaction
    };

    useGSAP(() => {
        if (!containerRef.current || !imagesLoaded) return;

        const headings = headingRefs.current;
        const outerWrappers = outerRefs.current;
        const innerWrappers = innerRefs.current;

        // Initialize SplitText
        splitHeadingsRef.current = headings.map(
            (heading) =>
                new SplitText(heading, {
                    type: 'lines',
                    linesClass: 'line',
                    mask: 'lines'
                })
        );

        // Initial positioning
        gsap.set(outerWrappers, { xPercent: 100 });
        gsap.set(innerWrappers, { xPercent: -100 });

        // Show first section
        gotoSection(0, 1);

        // Start auto-play
        startAutoPlay();

        return () => {
            stopAutoPlay();
            if (timelineRef.current) {
                timelineRef.current.kill();
                timelineRef.current = null;
            }
            splitHeadingsRef.current.forEach((split) => {
                if (split && typeof split.revert === 'function') {
                    split.revert();
                }
            });
            splitHeadingsRef.current = [];
            if (counterCurrentSplitRef.current && typeof counterCurrentSplitRef.current.revert === 'function') {
                counterCurrentSplitRef.current.revert();
                counterCurrentSplitRef.current = null;
            }
            if (counterNextSplitRef.current && typeof counterNextSplitRef.current.revert === 'function') {
                counterNextSplitRef.current.revert();
                counterNextSplitRef.current = null;
            }
        };
    }, { scope: containerRef, dependencies: [imagesLoaded] });

    return (
        <div
            ref={containerRef}
            className={`relative h-screen w-screen overflow-hidden bg-void text-white uppercase font-sans ${className}`}
        >
            {/* Section preview thumbnails */}
            <div className="absolute bottom-4 right-6 z-30 flex items-center gap-4">
                <div className="flex gap-2">
                    {sections.map((section, i) => (
                        <div
                            key={`thumb-${i}`}
                            className="w-12 h-8 rounded overflow-hidden relative cursor-pointer transition-transform duration-300 hover:scale-110"
                            onClick={() => handleManualNavigation(i)}
                        >
                            <img
                                src={section.img}
                                alt={`Section ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div
                                className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out ${currentIndex !== i ? 'opacity-50' : 'opacity-0'
                                    }`}
                            />
                        </div>
                    ))}
                </div>

                {/* Counter */}
                <div className="text-xs md:text-sm tracking-wider flex items-center gap-1 font-sans">
                    <div className="relative overflow-hidden h-[1em] leading-[1em] min-w-[0.8em]">
                        <span ref={counterCurrentRef} className="block">1</span>
                        <span ref={counterNextRef} className="block absolute left-0 top-0 opacity-0">2</span>
                    </div>
                    <span className="opacity-70">/ {sections.length}</span>
                </div>
            </div>

            {sections.map((section, i) => (
                <section
                    key={`section-${i}`}
                    className="absolute top-0 h-full w-full invisible"
                    ref={(el) => { if (el) sectionsRefs.current[i] = el; }}
                >
                    <div className="outer w-full h-full overflow-hidden" ref={(el) => { if (el) outerRefs.current[i] = el; }}>
                        <div className="inner w-full h-full overflow-hidden" ref={(el) => { if (el) innerRefs.current[i] = el; }}>
                            <div
                                className="bg flex items-center justify-center absolute top-0 h-full w-full bg-cover bg-center"
                                ref={(el) => { if (el) imagesRefs.current[i] = el; }}
                                style={{
                                    backgroundImage: `linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.6) 100%), url("${section.img}")`
                                }}
                            >
                                <h2 className="section-heading text-white text-center font-display font-bold w-[90vw] max-w-[1200px] text-[clamp(2rem,6vw,9rem)] normal-case leading-none z-10" ref={(el) => { if (el) headingRefs.current[i] = el; }}>
                                    {section.text}
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
