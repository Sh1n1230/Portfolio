import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Shutter.css';

gsap.registerPlugin(useGSAP);

const Shutter = () => {
    const panelRef = useRef(null);
    const messageRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // シャッターパネル全体を画面外（上）から降ろす
        tl.fromTo(panelRef.current,
            { y: '-100vh' },
            { y: 0, duration: 1.4, ease: 'power4.inOut' }
        )
            // メッセージをフェードイン
            .fromTo(messageRef.current,
                { autoAlpha: 0, y: 8 },
                { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                '-=0.15'
            );
    });

    return (
        <>
            {/* シャッターが収まる上部ボックス */}
            <div className="shutter-housing" />

            {/* シャッター本体（全高・画面外から降りてくる） */}
            <div className="shutter-panel" ref={panelRef}>
                {/* 降下する先端レール（パネル下端に固定） */}
                <div className="shutter-rail" />

                <p className="shutter-message" ref={messageRef}>
                    申し訳ありませんが、現在このあたりで改修工事が進んでいるようです。
                </p>
            </div>
        </>
    );
};

export default Shutter;
