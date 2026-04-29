import { useEffect, useRef } from 'react';

export const GlobalBackground = () => {
    const bgRef = useRef(null);
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!bgRef.current) return;
            bgRef.current.style.setProperty('--x', `${e.clientX}px`);
            bgRef.current.style.setProperty('--y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return (
        <div ref={bgRef} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', backgroundColor: '#fafafa' }}>
            <style>{`.global-grid{position:absolute;inset:0;background-image:radial-gradient(#a0a0a0 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(circle 500px at var(--x, 50vw) var(--y, 50vh),black 0%,transparent 100%);-webkit-mask-image:radial-gradient(circle 500px at var(--x, 50vw) var(--y, 50vh),black 0%,transparent 100%);}`}</style>
            <div className="global-grid"></div>
        </div>
    );
};