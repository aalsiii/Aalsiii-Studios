import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Lightbox({ src, onClose }) {
    if (!src) return null;

    return (
        <div id="lightbox" className={`fixed inset-0 z-[9000] bg-void/98 backdrop-blur-md flex justify-center items-center transition-opacity duration-500 opacity-100 pointer-events-auto`} onClick={onClose}>
            <div className="absolute top-8 right-8 text-white cursor-pointer hover:text-gold-accent transition-colors" onClick={onClose}>
                <X className="w-10 h-10" />
            </div>
            <img src={src} className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
    );
}
