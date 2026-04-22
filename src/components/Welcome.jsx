import { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';
import './Welcome.css';

const Welcome = ({ onFinished }) => {
    const textRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const timeline = createTimeline({ onComplete: onFinished });
        timeline
            .add(textRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 800, ease: 'outExpo' })
            .add(textRef.current, { opacity: 0, duration: 500, delay: 1000, ease: 'inExpo' })
            .add(overlayRef.current, { opacity: 0, duration: 600, ease: 'inOutQuad' }, '-=300');
    }, [onFinished]);

    return (
        <div className="welcome-overlay" ref={overlayRef}>
            <h1 className="welcome-text" ref={textRef}>Welcome</h1>
        </div>
    );
};
export default Welcome;