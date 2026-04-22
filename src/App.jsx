import { useState, useEffect } from 'react'
import './App.css'
import LastUpdated from './components/LastUpdated'
import Title from './components/Title'
import FadeIn from './components/FadeIn'
import NextComingSoon from './components/NextComingSoon'
import Welcome from './components/Welcome'
import { ProjectCard } from './components/ProjectCard'
import { projectsData } from './data/projects'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showMain, setShowMain] = useState(false)

  const images = ["./images/escapegym/escapegym_1.png", "./images/escapegym/escapegym_2.png", "./images/escapegym/escapegym_3.png"]

  useEffect(() => {
    if (!showMain) return;
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % images.length), 3000)
    return () => clearInterval(timer)
  }, [images.length, showMain])

  const goToSlide = (index) => setCurrentSlide(index)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      {!showMain && <Welcome onFinished={() => setShowMain(true)} />}

      {showMain && (
        <>
          <button
            className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="メニューを開閉する"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`toc-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#top" onClick={closeMenu}>Top</a></li>
              <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
              <li><a href="#about" onClick={closeMenu}>About</a></li>
            </ul>
          </nav>

          <header id="top">
            <Title />
          </header>

          <main>
            <FadeIn>
              <section className="carousel-container">
                <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {images.map((src, index) => <img key={index} src={src} className="carousel-slide" alt={`Slide ${index}`} />)}
                </div>
                <div className="carousel-dots">
                  {images.map((_, index) => <span key={index} className={`dot ${currentSlide === index ? 'active' : ''}`} onClick={() => goToSlide(index)}></span>)}
                </div>
              </section>
            </FadeIn>

            <FadeIn>
              <section id="projects" className="content-section">
                <h2>Projects</h2>
                <div className="project-grid">
                  {projectsData.map(project => <ProjectCard key={project.id} project={project} />)}
                  <NextComingSoon />
                </div>
              </section>
            </FadeIn>

            <FadeIn>
              <section id="about" className="content-section">
                <h2>About Me</h2>
                <div className="editor-window">
                  <div className="editor-header">
                    <div className="window-controls"><span className="control close"></span><span className="control minimize"></span><span className="control maximize"></span></div>
                    <div className="tabs"><div className="tab active">profile.js</div></div>
                  </div>
                  <div className="editor-body">
                    <div className="line-numbers">{Array.from({ length: 10 }).map((_, i) => <span key={i}>{i + 1}</span>)}</div>
                    <div className="code-content typing-animation">
                      <pre><code>
                        <div className="line pre-typed"><span className="keyword">const</span> <span className="variable">developer</span> <span className="operator">=</span> {'{'}</div>
                        <div className="line pre-typed">{'  '}<span className="property">name</span>: <span className="string">"Shin Nakamura"</span>,</div>
                        <div className="line pre-typed">{'  '}<span className="property">education</span>: <span className="string">"電気通信大学 メディア情報学専攻 (2028卒)"</span>,</div>
                        <div className="line pre-typed">{'  '}<span className="property">guild</span>: <span className="string">"X680x0同好会 (チームリーダー / Unity・Java)"</span>,</div>
                        <div className="line" style={{ "--i": 0 }}>{'  '}<span className="property">focus</span>: <span className="string">"初見のプレイヤー視点を追求した直感的なUI/UX設計"</span>,</div>
                        <div className="line" style={{ "--i": 1 }}>{'  '}<span className="property">licenses</span>: [<span className="string">"基本情報技術者試験"</span>, <span className="string">"実用英語技能検定準1級"</span>],</div>
                        <div className="line" style={{ "--i": 2 }}>{'  '}<span className="property">routines</span>: [<span className="string">"映画鑑賞"</span>, <span className="string">"ウェイトトレーニング"</span>]</div>
                        <div className="line" style={{ "--i": 3 }}>{'}'};</div>
                        <div className="line" style={{ "--i": 4 }}><span className="keyword">export default</span> <span className="variable">developer</span>;</div>
                      </code></pre>
                    </div>
                  </div>
                </div>
              </section>
            </FadeIn>
          </main>

          <FadeIn>
            <footer className="site-footer">
              <div className="footer-credits">
                <span>Produced by: </span>
                <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                  <img src={viteLogo} className="logo vite" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <div className="last-updated-container">
                <LastUpdated />
              </div>
            </footer>
          </FadeIn>
        </>
      )}
    </>
  )
}

export default App