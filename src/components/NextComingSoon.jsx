import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const NextComingSoon = () => {
    const containerRef = useRef(null);
    const text = "NEXT COMING SOON?";

    useEffect(() => {
        if (!containerRef.current) return;
        const letters = containerRef.current.querySelectorAll('.letter');

        const baseAnim = animate(letters, {
            opacity: () => 0.2 + Math.random() * 0.3,
            translateX: () => (Math.random() - 0.5) * 5,
            translateY: () => (Math.random() - 0.5) * 5,
            ease: 'steps(2)',
            duration: () => 50 + Math.random() * 100,
            loop: true,
        });

        let glitchTimer;
        const triggerGlitch = () => {
            const targetCount = Math.floor(Math.random() * 5) + 1;
            const targetLetters = Array.from(letters).sort(() => 0.5 - Math.random()).slice(0, targetCount);

            animate(targetLetters, {
                keyframes: [
                    { scaleX: 1.5, scaleY: 0.5, skewX: 45, color: '#ff0000', textShadow: '4px 0px 0px rgba(255,0,0,0.8), -4px 0px 0px rgba(0,255,255,0.8)', duration: 40 },
                    { scaleX: 0.5, scaleY: 1.5, skewX: -45, opacity: 0, duration: 40 },
                    { scaleX: 1.2, scaleY: 0.8, skewX: 20, color: '#fff', textShadow: 'none', opacity: 1, duration: 40 },
                    { scaleX: 1, scaleY: 1, skewX: 0, color: '#333', duration: 40 }
                ],
                ease: 'linear'
            });

            glitchTimer = setTimeout(triggerGlitch, 500 + Math.random() * 4000);
        };

        triggerGlitch();

        return () => {
            baseAnim.pause();
            clearTimeout(glitchTimer);
        };
    }, []);

    return (
        <h2 style={{ margin: '5rem 0', textAlign: 'center' }} ref={containerRef}>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="letter"
                    style={{
                        display: 'inline-block',
                        fontFamily: 'serif',
                        fontSize: '40px',
                        fontStyle: 'italic',
                        color: '#333',
                        minWidth: char === ' ' ? '0.5em' : 'auto',
                        position: 'relative'
                    }}
                >
                    {char}
                </span>
            ))}
        </h2>
    );
};
export default NextComingSoon;