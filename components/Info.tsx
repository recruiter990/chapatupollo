'use client'

import { useEffect, useRef, useState } from 'react'

const openingHours = [
  { day: 'Monday', hours: '19:00 - 23:00', dayIndex: 1 },
  { day: 'Tuesday', hours: '19:00 - 00:00', dayIndex: 2 },
  { day: 'Wednesday', hours: 'Closed', dayIndex: 3, isClosed: true },
  { day: 'Thursday', hours: '19:00 - 23:00', dayIndex: 4 },
  { day: 'Friday', hours: '12:00 - 15:30, 19:00 - 00:00', dayIndex: 5 },
  { day: 'Saturday', hours: '12:00 - 15:30, 19:00 - 00:00', dayIndex: 6 },
  { day: 'Sunday', hours: '12:00 - 15:30, 19:00 - 23:00', dayIndex: 0 },
]

const paymentMethods = ['Visa', 'Mastercard', 'American Express', 'Bancomat', 'Cash']

export default function Info() {
  const sectionRef = useRef<HTMLElement>(null)
  const [todayIndex, setTodayIndex] = useState(0)

  useEffect(() => {
    setTodayIndex(new Date().getDay())

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
      id="contact"
      className="py-20 md:py-24 px-5 md:px-10"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Opening Hours */}
          <div className="animate-ready stagger-1">
            {/* Overline */}
            <span
              className="block text-[11px] uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}
            >
              OPENING HOURS
            </span>

            {/* H3 */}
            <h3
              className="text-[clamp(1.5rem,5vw,2rem)] mb-8"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}
            >
              Orari di Apertura
            </h3>

            {/* Hours Table */}
            <div className="space-y-3 mb-10">
              {openingHours.map((item) => (
                <div
                  key={item.day}
                  className={`flex justify-between py-2 ${
                    item.dayIndex === todayIndex ? 'border-l-[3px] pl-4' : 'pl-0'
                  }`}
                  style={{
                    borderColor: item.dayIndex === todayIndex ? 'var(--gold)' : 'transparent',
                  }}
                >
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: item.isClosed ? 'var(--red)' : 'var(--text-primary)',
                    }}
                  >
                    {item.day}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: item.isClosed ? 'var(--red)' : 'var(--text-muted)',
                    }}
                  >
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Address Block */}
            <div className="space-y-3 mb-8">
              <p
                className="text-sm"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-primary)' }}
              >
                Via Santo Spiridione 2, 60122 Ancona AN
              </p>
              <a
                href="tel:+390712366800"
                className="block text-sm hover:underline"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-primary)' }}
              >
                +39 071 236 6800
              </a>
              <a
                href="mailto:peruvianfoodsnc@hotmail.com"
                className="block text-sm hover:underline"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-primary)' }}
              >
                peruvianfoodsnc@hotmail.com
              </a>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="text-[11px] px-3 py-1.5 rounded"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Google Map */}
          <div className="animate-ready stagger-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d744.0!2d13.510041!3d43.617030!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132d7f6ae411c8d7%3A0x4ad24f79c7310095!2sChapa%20Tu%20Pollo!5e0!3m2!1sen!2sit!4v1"
              width="100%"
              height="420"
              className="rounded-lg h-[280px] lg:h-[420px]"
              style={{ border: '1px solid var(--border)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chapa tu Pollo Location"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
