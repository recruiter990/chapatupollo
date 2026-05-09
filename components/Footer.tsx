'use client'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#events', label: 'Events' },
  { href: '#reserve', label: 'Reserve' },
  { href: '#contact', label: 'Contact' },
]

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/chapatupollo/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61567284410216',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'TripAdvisor',
    url: 'https://www.tripadvisor.it/Restaurant_Review-g187795-d27500584-Reviews-Chapa_Tu_Pollo-Ancona_Province_of_Ancona_Marche.html',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="12" r="2" />
        <circle cx="15" cy="12" r="2" />
        <path d="M12 8c-3 0-5 1.5-5 4s2 4 5 4 5-1.5 5-4-2-4-5-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'Google Maps',
    url: 'https://www.google.com/maps/place/data=!4m2!3m1!1s0x132d7f6ae411c8d7:0x4ad24f79c7310095',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="py-16 md:py-[60px] px-6 md:px-20" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          {/* Column 1 - Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h4
              className="text-[26px] mb-2"
              style={{ fontFamily: 'var(--font-playfair)', color: 'var(--red)' }}
            >
              Chapa tu Pollo
            </h4>
            <p
              className="text-[13px] mb-6"
              style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.6)' }}
            >
              Autentica Cucina Peruviana — Ancona, Italia
            </p>
            <a
              href="https://www.tripadvisor.it/Restaurant_Review-g187795-d27500584-Reviews-Chapa_Tu_Pollo-Ancona_Province_of_Ancona_Marche.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span style={{ color: 'var(--gold)' }}>★★★★★</span>
              <span
                className="text-[12px]"
                style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.6)' }}
              >
                {"Travellers' Choice 2025"}
              </span>
            </a>
          </div>

          {/* Column 2 - Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h5
              className="text-[11px] uppercase tracking-[0.15em] mb-6"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--gold)' }}
            >
              Navigation
            </h5>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.7)' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 - Contact & Social */}
          <div className="flex flex-col items-center md:items-start">
            <h5
              className="text-[11px] uppercase tracking-[0.15em] mb-6"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--gold)' }}
            >
              Contacts
            </h5>
            <div className="flex flex-col gap-3 mb-6">
              <p
                className="text-sm"
                style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.7)' }}
              >
                Via Santo Spiridione 2, 60122 Ancona
              </p>
              <a
                href="tel:+390712366800"
                className="text-sm hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.7)' }}
              >
                +39 071 236 6800
              </a>
              <a
                href="mailto:peruvianfoodsnc@hotmail.com"
                className="text-sm hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.7)' }}
              >
                peruvianfoodsnc@hotmail.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p
            className="text-[12px] text-center"
            style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.4)' }}
          >
            © 2026 Chapa tu Pollo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
