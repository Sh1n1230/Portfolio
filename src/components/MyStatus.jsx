import React, { useState, useEffect } from 'react';

const roles = ["Frontend Developer", "UI/UX Designer", "Game Creator"];

export const MyStatus = () => {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);

    useEffect(() => {
        const handleType = () => {
            const current = roles[index];
            setText(p => isDeleting ? current.substring(0, p.length - 1) : current.substring(0, p.length + 1));

            if (!isDeleting && text === current) {
                setSpeed(2000);
                setIsDeleting(true);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setIndex(p => (p + 1) % roles.length);
                setSpeed(500);
            } else {
                setSpeed(isDeleting ? 100 : 150);
            }
        };
        const timer = setTimeout(handleType, speed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, index, speed]);

    return (
        <>
            <style>{`.hero-status{font-family:'Courier New',monospace;font-size:clamp(1.1rem, 4vw, 2rem);font-weight:bold;line-height:1.4;margin:40px 0;color:#333;}.hl{color:#007bff;border-right:3px solid #007bff;padding-right:5px;animation:blink 0.75s step-end infinite;}@keyframes blink{from,to{border-color:transparent}50%{border-color:#007bff;}}.sub{font-size:clamp(0.9rem, 3vw, 1.2rem);color:#666;margin-top:10px;}`}</style>
            <div className="hero-status">
                <div>こんにちは、私は2028年卒の学生です。</div>
                <div>現在、<span className="hl">{text}</span></div>
                <div className="sub">のインターンシップに積極的に参加を希望しています。</div>
            </div>
        </>
    );
};