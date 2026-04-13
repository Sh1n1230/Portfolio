import { useState, useEffect } from 'react'
import './App.css'
import LastUpdated from './components/LastUpdated'
import Title from './components/Title'
import FadeIn from './components/FadeIn'
import NextComingSoon from './components/NextComingSoon';

const projectsData = [
  {
    id: 1,
    title: "トレーニングセンターからの脱出",
    description: "Java Swingを用いて開発した脱出ゲーム。独自の当たり判定やインベントリシステムを実装。",
    image: "./images/escapegym/escapegym_3.png",
    repoUrl: "https://github.com/MuscleEscaper/EscapeFromGym"
  }
]

const ProjectCard = ({ project }) => (
  <article className="project-card">
    <img src={project.image} alt={project.title} className="project-image" />
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    {project.repoUrl && (
      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-link">
        GitHubで見る
      </a>
    )}
  </article>
)

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  // メニューの開閉状態を管理するState
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const images = ["./images/escapegym/escapegym_1.png", "./images/escapegym/escapegym_2.png", "./images/escapegym/escapegym_3.png"]

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % images.length), 3000)
    return () => clearInterval(timer)
  }, [images.length])

  const goToSlide = (index) => setCurrentSlide(index)

  // メニューの開閉を切り替える関数
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  // メニューを閉じる関数（リンククリック時に使用）
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      {/* 右上のハンバーガーボタン */}
      <button
        className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="メニューを開閉する"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* 目次メニュー（オーバーレイ） */}
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
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <NextComingSoon />
        </FadeIn>

        <FadeIn>
          <section id="about" className="content-section">
            <h2>Shin Nakamura</h2>
            <ul>
              <li>電気通信大学メディア情報学専攻2028年卒業予定</li>
              <li>X680x0同好会にてUnityやJavaを用いたゲーム制作、チームリーダーに従事</li>
              <li>「初見のプレイヤー視点」を追求した直感的なUI/UX設計へのこだわり</li>
              <li>基本情報技術者試験、実用英語技能検定準1級 保持</li>
            </ul>
          </section>
        </FadeIn>

      </main>

      <FadeIn>
        <div><LastUpdated /></div>
      </FadeIn>
    </>
  )
}

export default App