import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const Title = () => {
    const containerRef = useRef(null);
    const text = "Shin Nakamura Products";
    useEffect(() => {
        if (!containerRef.current) return;
        const chars = containerRef.current.querySelectorAll('.char');
        const entranceAnim = animate(chars, {
            translateY: [40, 0],
            opacity: [0, 1],
            filter: ['blur(8px)', 'blur(0px)'],
            duration: 1200,
            delay: (el, i) => i * 40 + 200,
            ease: 'outQuart'
        });
        return () => entranceAnim.pause();
    }, []);
    const handleHover = (e, isEnter) => {
        animate(e.target, {
            translateY: isEnter ? -12 : 0,
            color: isEnter ? '#007bff' : '#333',
            textShadow: isEnter ? '0 8px 16px rgba(0,123,255,0.4)' : '0 0px 0px rgba(0,0,0,0)',
            scale: isEnter ? 1.15 : 1,
            duration: isEnter ? 250 : 500,
            ease: isEnter ? 'outBack' : 'outElastic'
        });
    };
    return (
        <h3 ref={containerRef} style={{ margin: 0, textAlign: 'center', padding: '3rem' }}>
            <style>{`.title-box{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:4.5rem;font-weight:900;letter-spacing:-0.03em;color:#333;}.char{display:inline-block;transform-origin:center bottom;cursor:pointer;will-change:transform,filter,opacity;}`}</style>
            <div className="title-box">
                {text.split('').map((char, i) => (
                    <span key={i} className="char" style={{ minWidth: char === ' ' ? '1.5rem' : 'auto', opacity: 0 }} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
                        {char}
                    </span>
                ))}
            </div>
        </h3>
    );
};
export default Title;