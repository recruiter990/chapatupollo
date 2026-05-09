'use client'

import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-ready').forEach((el) => {
              el.classList.add('animate-in')
            })
          }
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left - Image */}
        <div className="lg:w-1/2 h-[400px] lg:h-auto overflow-hidden">
          <div
            className="animate-ready stagger-1 w-full h-full min-h-[400px] lg:min-h-[600px] bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
            style={{
              backgroundImage:
                'url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/da/38/a4/la-semplicita.jpg?w=900&h=500&s=1)',
            }}
          />
        </div>

        {/* Right - Content */}
        <div className="lg:w-1/2 py-20 px-6 md:py-20 md:px-[60px]">
          {/* Overline */}
          <span
            className="animate-ready stagger-1 block text-[11px] uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}
          >
            LA NOSTRA STORIA
          </span>

          {/* H2 */}
          <h2
            className="animate-ready stagger-2 text-[clamp(1.8rem,6vw,2.5rem)] leading-tight mb-6"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}
          >
            Il Primo Ristorante Peruviano di Ancona
          </h2>

          {/* Gold Divider */}
          <div
            className="animate-ready stagger-2 w-[60px] h-[2px] my-6"
            style={{ backgroundColor: 'var(--gold)' }}
          />

          {/* Body Paragraphs */}
          <p
            className="animate-ready stagger-3 text-base leading-[1.8] mb-6"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
          >
            Born from a passion for authentic Peruvian cuisine, Chapa tu Pollo brings to Ancona genuine flavors
            made with heart, care, and the freshest ingredients. Ideal for birthdays, business lunches, and
            private events in a warm, well-kept environment.
          </p>

          <p
            className="animate-ready stagger-4 text-base leading-[1.8] mb-8"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
          >
            Our kitchen blends the rich traditions of Peru with a Nikkei fusion touch — where Peruvian and
            Japanese techniques meet to create something truly unique in the heart of the Marche region.
          </p>

          {/* TripAdvisor Badge */}
          <a
            href="https://www.tripadvisor.it/Restaurant_Review-g187795-d27500584-Reviews-Chapa_Tu_Pollo-Ancona_Province_of_Ancona_Marche.html"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-ready stagger-5 inline-flex items-center gap-2 text-[13px] mb-6 hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <span style={{ color: 'var(--gold)' }}>★★★★★</span>
            <span style={{ color: 'var(--text-muted)' }}>{"Travellers' Choice 2025 — TripAdvisor"}</span>
          </a>

          {/* Quote */}
          <blockquote
            className="animate-ready stagger-6 text-lg italic mt-6"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-playfair)' }}
          >
            &ldquo;Il migliore ristorante di cibo peruviano d&apos;Italia, tutto fatto come in casa.&rdquo;
            <span className="block text-sm not-italic mt-2" style={{ color: 'var(--text-muted)' }}>
              — Milagros P.
            </span>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
