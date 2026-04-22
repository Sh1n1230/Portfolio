import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const Title = () => {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;
        const animation = animate(textRef.current, {
            strokeDashoffset: [1000, 0],
            ease: 'inOutSine',
            duration: 3000,
            loop: false
        });
        return () => animation.pause();
    }, []);

    return (
        <h3 style={{ margin: 0 }}>
            <svg viewBox="0 0 1000 150" width="100%" height="auto">
                <text ref={textRef} x="500" y="100" fontFamily="serif" fontSize="70" fontWeight="bold" fontStyle="italic" textAnchor="middle" fill="transparent" stroke="#000" strokeWidth="2" strokeDasharray="1000">Shin Nakamura Products</text>
            </svg>
        </h3>
    );
};
export default Title;