'use client'

import { useState, useEffect } from 'react'

type StatusType = 'open' | 'opens-later' | 'closed'

interface OpenStatus {
  status: StatusType
  message: string
}

const OPENING_HOURS: Record<number, { lunch?: [number, number]; dinner?: [number, number] } | null> = {
  0: { lunch: [12, 15.5], dinner: [19, 23] }, // Sunday
  1: { dinner: [19, 23] }, // Monday
  2: { dinner: [19, 24] }, // Tuesday (midnight)
  3: null, // Wednesday - Closed
  4: { dinner: [19, 23] }, // Thursday
  5: { lunch: [12, 15.5], dinner: [19, 24] }, // Friday
  6: { lunch: [12, 15.5], dinner: [19, 24] }, // Saturday
}

function getOpenStatus(): OpenStatus {
  const now = new Date()
  const day = now.getDay()
  const hours = now.getHours() + now.getMinutes() / 60

  const todayHours = OPENING_HOURS[day]

  if (!todayHours) {
    return { status: 'closed', message: 'Closed Today' }
  }

  // Check if currently open
  if (todayHours.lunch) {
    const [start, end] = todayHours.lunch
    if (hours >= start && hours < end) {
      return { status: 'open', message: 'Open Now' }
    }
  }

  if (todayHours.dinner) {
    const [start, end] = todayHours.dinner
    if (hours >= start && (end === 24 ? hours < 24 : hours < end)) {
      return { status: 'open', message: 'Open Now' }
    }
  }

  // Check if opens later today
  if (todayHours.lunch && hours < todayHours.lunch[0]) {
    const openHour = Math.floor(todayHours.lunch[0])
    const openMin = (todayHours.lunch[0] % 1) * 60
    return {
      status: 'opens-later',
      message: `Opens ${openHour.toString().padStart(2, '0')}:${openMin.toString().padStart(2, '0')}`,
    }
  }

  if (todayHours.dinner && hours < todayHours.dinner[0]) {
    const openHour = Math.floor(todayHours.dinner[0])
    const openMin = (todayHours.dinner[0] % 1) * 60
    return {
      status: 'opens-later',
      message: `Opens ${openHour.toString().padStart(2, '0')}:${openMin.toString().padStart(2, '0')}`,
    }
  }

  return { status: 'closed', message: 'Closed Today' }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDayMode, setIsDayMode] = useState(true)
  const [openStatus, setOpenStatus] = useState<OpenStatus>({ status: 'closed', message: 'Closed Today' })

  useEffect(() => {
    // Set initial theme based on time
    const hour = new Date().getHours()
    const shouldBeDayMode = hour >= 6 && hour < 20
    setIsDayMode(shouldBeDayMode)
    document.body.classList.remove('day-mode', 'night-mode')
    document.body.classList.add(shouldBeDayMode ? 'day-mode' : 'night-mode')

    // Set initial open status
    setOpenStatus(getOpenStatus())

    // Update status every 60 seconds
    const statusInterval = setInterval(() => {
      setOpenStatus(getOpenStatus())
    }, 60000)

    // Handle scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(statusInterval)
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !isDayMode
    setIsDayMode(newMode)
    document.body.classList.remove('day-mode', 'night-mode')
    document.body.classList.add(newMode ? 'day-mode' : 'night-mode')
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#menu', label: 'Menu' },
    { href: '#events', label: 'Events' },
    { href: '#reserve', label: 'Reserve' },
    { href: '#contact', label: 'Contact' },
  ]

  const statusColors: Record<StatusType, { dot: string; border: string }> = {
    open: { dot: 'bg-[#4A7C59]', border: 'border-[#4A7C59]' },
    'opens-later': { dot: 'bg-gray-400', border: 'border-gray-400' },
    closed: { dot: 'bg-[var(--red)]', border: 'border-[var(--red)]' },
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-[350ms] ease-out ${
          scrolled ? 'backdrop-blur-[14px]' : ''
        }`}
        style={{
          height: 'clamp(60px, 10vw, 68px)',
          backgroundColor: scrolled ? 'var(--bg-nav)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex flex-col">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="font-playfair text-[22px]"
              style={{ color: 'var(--red)', fontFamily: 'var(--font-playfair)' }}
            >
              Chapa tu Pollo
            </a>
            <span
              className="text-[11px] uppercase tracking-[0.12em]"
              style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}
            >
              Ristorante Peruviano — Ancona
            </span>
          </div>

          {/* Center - Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[13px] uppercase tracking-[0.08em] hover:border-b-2 transition-colors"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-inter)',
                  borderColor: 'var(--red)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--red)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right - Status, Theme Toggle, CTA, Hamburger */}
          <div className="flex items-center gap-3">
            {/* Status Pill - Hidden on mobile */}
            <div
              className={`hidden md:flex items-center gap-2 px-[10px] py-1 rounded-[20px] border ${statusColors[openStatus.status].border}`}
              style={{ fontFamily: 'var(--font-inter)', fontSize: '11px' }}
            >
              <span className={`w-2 h-2 rounded-full ${statusColors[openStatus.status].dot}`} />
              <span style={{ color: 'var(--text-primary)' }}>{openStatus.message}</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ border: '1px solid var(--border)' }}
              aria-label={isDayMode ? 'Switch to night mode' : 'Switch to day mode'}
            >
              {isDayMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            {/* Prenota CTA */}
            <a
              href="#reserve"
              onClick={(e) => handleNavClick(e, '#reserve')}
              className="hidden sm:block text-[12px] uppercase px-6 py-3 rounded transition-colors"
              style={{
                backgroundColor: 'var(--red)',
                color: 'white',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Prenota
            </a>

            {/* Hamburger - Mobile */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-7 h-7"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-7 h-0.5 mb-1.5" style={{ backgroundColor: 'var(--text-primary)' }} />
              <span className="block w-7 h-0.5 mb-1.5" style={{ backgroundColor: 'var(--text-primary)' }} />
              <span className="block w-7 h-0.5" style={{ backgroundColor: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[1001] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <nav className="flex flex-col items-center gap-14">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[32px]"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
