'use client'

import { useEffect, useRef } from 'react'

const galleryImages = [
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/e0/f8/c4/caption.jpg?w=1200&h=1200&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/e0/ed/b9/caption.jpg?w=1200&h=1200&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/db/3e/64/caption.jpg?w=1200&h=1200&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/c4/fb/8c/caption.jpg?w=200&h=200&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/cd/61/2d/caption.jpg?w=300&h=200&s=1',
]

const eventFeatures = [
  'Birthday Parties',
  'Business Lunches and Dinners',
  'Private Celebrations',
  'Family Gatherings',
  'Corporate Events',
]

export default function Events() {
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
    <section ref={sectionRef} id="events" className="flex flex-col lg:flex-row">
      {/* Left Column - Private Events */}
      <div
        className="lg:w-1/2 py-20 px-6 md:py-20 md:px-[60px] flex flex-col justify-center"
        style={{ backgroundColor: '#6B0F1A' }}
      >
        {/* Overline */}
        <span
          className="animate-ready stagger-1 block text-[11px] uppercase tracking-[0.22em] mb-4"
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}
        >
          GROUPS & PRIVATE EVENTS
        </span>

        {/* H2 */}
        <h2
          className="animate-ready stagger-2 text-[clamp(1.8rem,6vw,2.625rem)] leading-tight mb-6 text-white"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Space for Your Events
        </h2>

        {/* Gold Divider */}
        <div
          className="animate-ready stagger-2 w-[60px] h-[2px] my-6"
          style={{ backgroundColor: 'var(--gold)' }}
        />

        {/* Paragraphs */}
        <p
          className="animate-ready stagger-3 text-base leading-[1.8] mb-6"
          style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-inter)' }}
        >
          {"Whether it's a birthday party, a business lunch or a special celebration, our venue is the perfect setting. We offer personalized service to make every event truly unique and unforgettable."}
        </p>

        <p
          className="animate-ready stagger-4 text-base leading-[1.8] mb-8"
          style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-inter)' }}
        >
          Contact us to discuss availability, custom menus and group pricing. We accommodate groups of all sizes
          with tailored Peruvian dining experiences.
        </p>

        {/* Feature List */}
        <div className="animate-ready stagger-5 space-y-3.5 mb-10">
          {eventFeatures.map((feature) => (
            <div
              key={feature}
              className="border-l-2 pl-4 text-[15px] text-white"
              style={{ borderColor: 'var(--gold)', fontFamily: 'var(--font-inter)' }}
            >
              {feature}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="mailto:peruvianfoodsnc@hotmail.com"
          className="animate-ready stagger-6 inline-block text-[13px] uppercase tracking-[0.1em] px-9 py-3.5 border-2 border-white text-white rounded-[3px] bg-transparent hover:bg-white hover:text-[#6B0F1A] transition-colors duration-300 text-center w-fit"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Request a Quote
        </a>
      </div>

      {/* Right Column - Gallery Images */}
      <div className="lg:w-1/2 flex flex-col">
        {galleryImages.map((src, index) => (
          <div key={index} className="overflow-hidden">
            <div
              className={`animate-ready stagger-${index + 1} w-full h-[220px] lg:h-[260px] bg-cover bg-center transition-transform duration-[450ms] hover:scale-[1.03]`}
              style={{ backgroundImage: `url(${src})` }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
