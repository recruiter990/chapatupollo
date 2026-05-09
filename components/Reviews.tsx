'use client'

import { useEffect, useRef } from 'react'

const reviewsData = [
  {
    quote: 'Peccato non poter dare 6 stelle anziche 5... Siamo stati felicissimi di conoscere anche lo chef, che ci ha chiesto personalmente come fosse andata.',
    name: 'Monica D.',
    date: 'November 2025',
  },
  {
    quote: 'Il migliore ristorante di cibo peruviano d\'Italia, tutto fatto come in casa. Il ristorante e molto carinissimo e accogliente.',
    name: 'Milagros P.',
    date: 'April 2025',
  },
  {
    quote: 'La papa rellena piu buona che abbia mai mangiato. Si percepisce alta qualita negli ingredienti e nelle preparazioni. Consigliatissimo.',
    name: 'Stefano G.',
    date: 'November 2025',
  },
  {
    quote: 'Ambiente curatissimo. Accoglienza strepitosa. Cibo eccezionale, soprattutto il pollo sia fritto che brasato.',
    name: 'Emilmarini',
    date: 'May 2025',
  },
  {
    quote: 'Veri sapori peruviani. Il cuoco esce spesso dalla cucina. Ottimi antipasti e buonissimi secondi. Da tornarci assolutamente.',
    name: 'Polo',
    date: 'July 2025',
  },
  {
    quote: 'Una vera scoperta. Personale gentilissimo ed estremamente disponibile. Cibo ottimo. Valore aggiunto l\'entusiasmo e la passione di chi ci lavora.',
    name: 'NaimaXY',
    date: 'June 2025',
  },
]

export default function Reviews() {
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
      id="reviews"
      className="py-20 md:py-24 px-5 md:px-10"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="animate-ready stagger-1 block text-[11px] uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}
          >
            WHAT OUR GUESTS SAY
          </span>
          <h2
            className="animate-ready stagger-2 text-[clamp(2rem,6vw,3rem)]"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}
          >
            Recensioni
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviewsData.map((review, index) => (
            <div
              key={index}
              className={`animate-ready stagger-${index + 1} p-7 rounded-[10px] transition-all duration-300 hover:-translate-y-1`}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--red)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Stars */}
              <div className="text-base mb-3" style={{ color: 'var(--gold)' }}>
                ★★★★★
              </div>

              {/* Quote */}
              <p
                className="text-base italic leading-[1.7] mb-4"
                style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}
              >
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Name */}
              <p
                className="text-[13px] font-semibold"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--red)' }}
              >
                {review.name}
              </p>

              {/* Date */}
              <p
                className="text-[11px]"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}
              >
                {review.date}
              </p>
            </div>
          ))}
        </div>

        {/* TripAdvisor Link */}
        <div className="text-center">
          <a
            href="https://www.tripadvisor.it/Restaurant_Review-g187795-d27500584-Reviews-Chapa_Tu_Pollo-Ancona_Province_of_Ancona_Marche.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[13px] uppercase tracking-[0.1em] px-8 py-3.5 rounded border-2 transition-colors hover:bg-[var(--red)] hover:text-white hover:border-[var(--red)]"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--red)',
              borderColor: 'var(--red)',
            }}
          >
            Read All Reviews on TripAdvisor
          </a>
        </div>
      </div>
    </section>
  )
}
