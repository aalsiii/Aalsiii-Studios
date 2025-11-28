import { useEffect, useRef, useState } from 'react';
import { InfiniteGridMenu } from '../utils/webgl';
import { projectsData } from '../data/projects';

export default function useWebGLHero(canvasRef) {
    const [activeItem, setActiveItem] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const menu = new InfiniteGridMenu(
            canvasRef.current,
            projectsData,
            (index) => setActiveItem(index),
            (moving) => setIsMoving(moving)
        );

        menu.onLoad = () => setIsLoaded(true);
        menuRef.current = menu;

        const handleResize = () => menu.resize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            menu.destroy();
        };
    }, [canvasRef]);

    return { activeItem, isMoving, isLoaded };
}
