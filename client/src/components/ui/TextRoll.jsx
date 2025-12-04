import React from 'react';

export default function TextRoll({ text, href, className }) {
    const Tag = href ? 'a' : 'div';
    return (
        <Tag href={href} className={`group inline-flex overflow-hidden relative ${className}`}>
            {text.split('').map((char, i) => (
                <span key={i} className="relative inline-block overflow-hidden">
                    <span
                        className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
                        style={{ transitionDelay: `${i * 0.02}s` }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    <span
                        className="inline-block absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0 text-gold-accent"
                        style={{ transitionDelay: `${i * 0.02}s` }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </Tag>
    );
}
