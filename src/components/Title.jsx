import { useEffect, useRef } from 'react'

const AnimatedText = () => {
    const textRef = useRef(null)

    useEffect(() => {
        if (!textRef.current) return
        let animationInstance = null
        const startAnimation = () => {
            animationInstance = window.anime({
                targets: textRef.current,
                loop: false,
                strokeDashoffset: [1000, 0],
                easing: 'easeInOutSine',
                duration: 3000
            })
        }
        if (window.anime) {
            startAnimation()
        } else {
            const scriptId = 'animejs-cdn'
            let script = document.getElementById(scriptId)
            if (!script) {
                script = document.createElement('script')
                script.id = scriptId
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js'
                document.head.appendChild(script)
            }
            script.addEventListener('load', startAnimation)
            return () => {
                script.removeEventListener('load', startAnimation)
                if (animationInstance) animationInstance.pause()
            }
        }
        return () => {
            if (animationInstance) animationInstance.pause()
        }
    }, [])

    return (
        <h3 style={{ margin: 0 }}>
            <svg viewBox="0 0 1000 150" width="100%" height="auto">
                <text ref={textRef} x="500" y="100" fontFamily="serif" fontSize="70" fontWeight="bold" fontStyle="italic" textAnchor="middle" fill="transparent" stroke="#000" strokeWidth="2" strokeDasharray="1000">Shin Nakamura Products</text>
            </svg>
        </h3>
    )
}

export default AnimatedText