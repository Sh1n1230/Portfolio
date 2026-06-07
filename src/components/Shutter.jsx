import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Shutter.css";

gsap.registerPlugin(useGSAP);

// 何回叩いたらシャッターが開くか
const KNOCK_TO_OPEN = 3;

const Shutter = ({ onOpened }) => {
  const panelRef = useRef(null);
  const messageRef = useRef(null);
  const hintRef = useRef(null);
  const railRef = useRef(null);
  // 'intro'（降下中） | 'idle'（叩ける） | 'opening'（巻き上げ中）
  const stateRef = useRef("intro");

  const [knockCount, setKnockCount] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        stateRef.current = "idle";
      },
    });

    // シャッターパネル全体を画面外（上）から降ろす
    tl.fromTo(
      panelRef.current,
      { y: "-100vh" },
      { y: 0, duration: 1.4, ease: "power4.inOut" },
    )
      // メッセージをフェードイン
      .fromTo(
        messageRef.current,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.15",
      )
      // 「叩いてみて」のヒントを少し遅れてフェードイン
      // （上下の動きは CSS の shutter-hint-pulse に任せるので opacity のみ）
      .fromTo(
        hintRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
        "+=0.2",
      );
  });

  const openShutter = () => {
    stateRef.current = "opening";

    const tl = gsap.timeline({
      onComplete: () => onOpened?.(),
    });

    // メッセージ／ヒントを消してから一気に巻き上げる
    tl.to([messageRef.current, hintRef.current], {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power1.in",
    })
      // 少し沈ませて「溜め」を作る
      .to(
        panelRef.current,
        {
          y: 14,
          duration: 0.18,
          ease: "power2.out",
        },
        "<",
      )
      // 上へ巻き上げ
      .to(panelRef.current, {
        y: "-100vh",
        duration: 1.2,
        ease: "power4.in",
      })
      // ハウジングも一緒に退避
      .to(
        ".shutter-housing",
        {
          y: "-100%",
          duration: 0.4,
          ease: "power2.in",
        },
        "<0.3",
      );
  };

  const handleKnock = () => {
    if (stateRef.current !== "idle") return;

    // ガタッと縦に揺れるノックフィードバック
    gsap.fromTo(
      panelRef.current,
      { y: 0 },
      { y: 6, duration: 0.06, yoyo: true, repeat: 3, ease: "power1.inOut" },
    );
    // 先端レールを瞬間的に明るくフラッシュ
    gsap.fromTo(
      railRef.current,
      { filter: "brightness(2.2)" },
      { filter: "brightness(1)", duration: 0.3, ease: "power2.out" },
    );

    const next = knockCount + 1;
    setKnockCount(next);

    if (next >= KNOCK_TO_OPEN) {
      openShutter();
    }
  };

  const remaining = Math.max(KNOCK_TO_OPEN - knockCount, 0);
  const hintText =
    knockCount === 0
      ? "旧ポートフォリオを見たいですか？シャッターを叩いてください。"
      : `${remaining}`;

  return (
    <>
      {/* シャッターが収まる上部ボックス */}
      <div className="shutter-housing" />

      {/* シャッター本体（全高・画面外から降りてくる） */}
      <div
        className="shutter-panel"
        ref={panelRef}
        onClick={handleKnock}
        role="button"
        tabIndex={0}
        aria-label="シャッターを叩く"
      >
        {/* 降下する先端レール（パネル下端に固定） */}
        <div className="shutter-rail" ref={railRef} />

        <p className="shutter-message" ref={messageRef}>
          申し訳ありませんが、現在このあたりで改修工事が進んでいるようです。
        </p>

        <p className="shutter-hint" ref={hintRef}>
          {hintText}
        </p>
      </div>
    </>
  );
};

export default Shutter;
