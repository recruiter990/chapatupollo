'use client'

import { useState, useEffect, useRef } from 'react'

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const OPENING_HOURS: Record<number, { lunch?: boolean; dinner: boolean } | null> = {
  0: { lunch: true, dinner: true }, // Sunday
  1: { dinner: true }, // Monday
  2: { dinner: true }, // Tuesday
  3: null, // Wednesday - Closed
  4: { dinner: true }, // Thursday
  5: { lunch: true, dinner: true }, // Friday
  6: { lunch: true, dinner: true }, // Saturday
}

const LUNCH_SLOTS = ['12:00', '12:30', '13:00', '13:30']
const DINNER_SLOTS = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  guests: string
  specialRequests: string
}

export default function Reservation() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: '2',
    specialRequests: '',
  })
  const [submitted, setSubmitted] = useState(false)
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    let startingDay = firstDay.getDay() - 1 // Monday = 0
    if (startingDay < 0) startingDay = 6

    return { daysInMonth, startingDay }
  }

  const isDateValid = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Past dates
    if (date < today) return false

    // Wednesday
    if (date.getDay() === 3) return false

    return true
  }

  const isPastDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isWednesday = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date.getDay() === 3
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    )
  }

  const handleDateSelect = (day: number) => {
    if (!isDateValid(day)) return
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const getAvailableSlots = () => {
    if (!selectedDate) return { lunch: [], dinner: [] }
    const dayOfWeek = selectedDate.getDay()
    const hours = OPENING_HOURS[dayOfWeek]

    if (!hours) return { lunch: [], dinner: [] }

    return {
      lunch: hours.lunch ? LUNCH_SLOTS : [],
      dinner: hours.dinner ? DINNER_SLOTS : [],
    }
  }

  const formatSelectedDateTime = () => {
    if (!selectedDate || !selectedTime) return 'Please select a date and time'
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return `${selectedDate.toLocaleDateString('en-US', options)} at ${selectedTime}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time')
      return
    }
    setSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate)
  const slots = getAvailableSlots()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  return (
    <section
      ref={sectionRef}
      id="reserve"
      className="py-20 md:py-24 px-5 md:px-10"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="animate-ready stagger-1 block text-[11px] uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}
          >
            BOOK YOUR TABLE
          </span>
          <h2
            className="animate-ready stagger-2 text-[clamp(2rem,6vw,3rem)] mb-4"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}
          >
            Prenota il Tuo Tavolo
          </h2>
          <p
            className="animate-ready stagger-3 text-base"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
          >
            Book online or call us:{' '}
            <a href="tel:+390712366800" className="hover:underline" style={{ color: 'var(--text-primary)' }}>
              +39 071 236 6800
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div
            className="animate-ready stagger-4 p-6 md:p-8 rounded-xl"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--border)] transition-colors"
                aria-label="Previous month"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <h3
                className="text-xl"
                style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}
              >
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={nextMonth}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--border)] transition-colors"
                aria-label="Next month"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS_OF_WEEK.map((day) => (
                <div
                  key={day}
                  className="text-center text-[11px] uppercase tracking-wider py-2"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for starting day */}
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-11" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const valid = isDateValid(day)
                const past = isPastDate(day)
                const wed = isWednesday(day)
                const today = isToday(day)
                const selected = isSelected(day)

                return (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    disabled={!valid}
                    className={`h-11 w-11 md:h-11 md:w-full flex items-center justify-center rounded-full text-sm transition-colors ${
                      selected
                        ? 'text-white'
                        : valid
                          ? 'hover:bg-[rgba(201,160,80,0.15)]'
                          : past
                            ? 'opacity-35'
                            : wed
                              ? 'line-through cursor-not-allowed'
                              : ''
                    }`}
                    style={{
                      fontFamily: 'var(--font-inter)',
                      backgroundColor: selected ? 'var(--red)' : 'transparent',
                      color: selected ? 'white' : valid ? 'var(--text-primary)' : 'var(--text-muted)',
                      textDecoration: today && !selected ? 'underline' : wed ? 'line-through' : 'none',
                    }}
                    aria-label={`${day} ${currentDate.toLocaleDateString('en-US', { month: 'long' })}`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                {selectedDate.getDay() === 3 ? (
                  <p className="text-center" style={{ color: 'var(--red)', fontFamily: 'var(--font-inter)' }}>
                    We are closed on Wednesdays
                  </p>
                ) : (
                  <>
                    {slots.lunch.length > 0 && (
                      <div className="mb-4">
                        <p
                          className="text-[11px] uppercase tracking-wider mb-3"
                          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                        >
                          Lunch
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {slots.lunch.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className="px-4 py-2 rounded text-sm transition-colors"
                              style={{
                                fontFamily: 'var(--font-inter)',
                                backgroundColor: selectedTime === time ? 'var(--red)' : 'transparent',
                                color: selectedTime === time ? 'white' : 'var(--text-primary)',
                                border: `1px solid ${selectedTime === time ? 'var(--red)' : 'var(--border)'}`,
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {slots.dinner.length > 0 && (
                      <div>
                        <p
                          className="text-[11px] uppercase tracking-wider mb-3"
                          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                        >
                          Dinner
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {slots.dinner.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className="px-4 py-2 rounded text-sm transition-colors"
                              style={{
                                fontFamily: 'var(--font-inter)',
                                backgroundColor: selectedTime === time ? 'var(--red)' : 'transparent',
                                color: selectedTime === time ? 'white' : 'var(--text-primary)',
                                border: `1px solid ${selectedTime === time ? 'var(--red)' : 'var(--border)'}`,
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Form */}
          <div
            className="animate-ready stagger-5 p-6 md:p-8 rounded-xl"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(74, 124, 89, 0.15)' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4A7C59" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className="text-2xl mb-4"
                  style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}
                >
                  Thank you!
                </h3>
                <p
                  className="text-base leading-relaxed max-w-md"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  Your reservation request has been received. We will confirm shortly at your email. For immediate
                  assistance call{' '}
                  <a href="tel:+390712366800" className="underline" style={{ color: 'var(--text-primary)' }}>
                    +39 071 236 6800
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-[12px] uppercase tracking-[0.08em] mb-1.5"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 rounded-md text-base"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-inter)',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[12px] uppercase tracking-[0.08em] mb-1.5"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 rounded-md text-base"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-inter)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-[12px] uppercase tracking-[0.08em] mb-1.5"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3.5 rounded-md text-base"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[12px] uppercase tracking-[0.08em] mb-1.5"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3.5 rounded-md text-base"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[12px] uppercase tracking-[0.08em] mb-1.5"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3.5 rounded-md text-base"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block text-[12px] uppercase tracking-[0.08em] mb-1.5"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    Selected Date & Time
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formatSelectedDateTime()}
                    className="w-full px-4 py-3.5 rounded-md text-base cursor-not-allowed"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[12px] uppercase tracking-[0.08em] mb-1.5"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-md text-base resize-none"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[52px] rounded-md text-[14px] uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#A00D24]"
                  style={{
                    backgroundColor: 'var(--red)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  Confirm Reservation
                </button>

                <p
                  className="text-[12px] text-center"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  For groups larger than 10 or private events, please use the Events section above.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
