'use client'

import { useEffect, useState, useRef } from 'react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setLoaded(true), 100)

    // Parallax effect
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY
        const bgElement = heroRef.current.querySelector('.parallax-bg') as HTMLElement
        if (bgElement && window.innerWidth > 768) {
          bgElement.style.transform = `translateY(${scrolled * 0.4}px)`
        }
        // Hide scroll indicator after scroll
        if (scrolled > 50) {
          setScrollIndicatorVisible(false)
        } else {
          setScrollIndicatorVisible(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/da/38/6d/se-puoi-sognarlo-puoi.jpg?w=900&h=500&s=1)',
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 text-center">
        {/* Overline */}
        <span
          className={`hero-animate ${loaded ? 'loaded' : ''} hero-delay-1 text-[11px] uppercase tracking-[0.25em] mb-4`}
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}
        >
          ANCONA • SINCE 2024 • PERUVIAN CUISINE
        </span>

        {/* H1 with Gold Shimmer */}
        <h1
          className={`hero-animate ${loaded ? 'loaded' : ''} hero-delay-2 gold-shimmer text-[clamp(2.4rem,9vw,5rem)] md:text-[80px] leading-tight mb-4`}
          style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700 }}
        >
          Chapa tu Pollo
        </h1>

        {/* Subheading */}
        <p
          className={`hero-animate ${loaded ? 'loaded' : ''} hero-delay-3 text-[clamp(1rem,4vw,1.5rem)] md:text-2xl italic mb-6`}
          style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-playfair)' }}
        >
          Il Primo Ristorante Peruviano di Ancona
        </p>

        {/* Tagline */}
        <p
          className={`hero-animate ${loaded ? 'loaded' : ''} hero-delay-4 text-base max-w-[560px] mb-10`}
          style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)', lineHeight: 1.7 }}
        >
          Each dish is born from the encounter between the freshness of ingredients, artisanal attention to detail
          and love for our work.
        </p>

        {/* Buttons */}
        <div
          className={`hero-animate ${loaded ? 'loaded' : ''} hero-delay-5 flex flex-col md:flex-row gap-4 w-full md:w-auto`}
        >
          <a
            href="#reserve"
            onClick={(e) => handleNavClick(e, '#reserve')}
            className="text-base uppercase px-10 py-4 rounded transition-colors text-center"
            style={{
              backgroundColor: 'var(--red)',
              color: 'white',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Prenota un Tavolo
          </a>
          <a
            href="#menu"
            onClick={(e) => handleNavClick(e, '#menu')}
            className="text-base uppercase px-10 py-4 rounded border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#1C1C1C] transition-colors text-center"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Scopri il Menu
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          scrollIndicatorVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg
          className="bounce-animation"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
