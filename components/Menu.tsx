'use client'

import { useState, useEffect, useRef } from 'react'

interface MenuItem {
  name: string
  description?: string
  price: string
  tags?: string[]
  isHeader?: boolean
}

interface MenuCategory {
  id: string
  label: string
  items: MenuItem[]
}

const menuData: MenuCategory[] = [
  {
    id: 'appetizers',
    label: 'Appetizers',
    items: [
      { name: 'Potatoes with Huancaina sauce', description: 'Potatoes dipped in typical huancayo sauce made with aji amarillo', price: '€8.00', tags: ['Mild'] },
      { name: 'Potatoes with Ocopa sauce', description: 'Typical Arequipa sauce with aji amarillo, roasted peanuts and huacatay', price: '€8.00', tags: ['Mild'] },
      { name: 'Potatoes with Mediterranean sauce', description: 'Mediterranean vegetable sauce', price: '€8.00', tags: ['Vegan'] },
      { name: 'Chicharron sandwich', description: 'Homemade purple corn bread with low-temperature suckling pig, salsa criolla and fried camote chips', price: '€10.00' },
      { name: 'Empanadas', description: 'Crumbly crescents stuffed with mince, vegetables and raisins', price: '€10.00' },
      { name: 'Papa rellena', description: 'Potato croquette stuffed with mince, raisins and vegetables; criolla tartar sauce', price: '€10.00' },
      { name: 'Rocoto relleno', description: 'Rocoto stuffed with minced meat sauce, roasted peanuts and caciotta', price: '€10.00' },
    ],
  },
  {
    id: 'firsts',
    label: 'Firsts',
    items: [
      { name: 'Arroz con chancho', description: 'Wok rice with carrots, peas, bell pepper and bacon, annato infusion, red onion brunoise, lime, mint and rocoto', price: '€15.00' },
      { name: 'Arroz con pollo', description: 'Wok rice with carrots, peas, peppers, cilantro sauce and beer-marinated chicken', price: '€15.00' },
      { name: 'Arroz Chaufa', description: 'Nikkei wok rice with bell peppers, scrambled eggs, spring onion, soybean sprouts, garlic-ginger infusion', price: '€14.00' },
      { name: 'Arroz tapado', description: 'White rice with minced meat sauce', price: '€15.00' },
      { name: 'Seafood Chaufa rice', description: 'Nikkei wok rice with seafood seasoned in Chinese cinnamon and sea base', price: '€16.00' },
      { name: 'Extra first', description: '150g of extra rice', price: '€3.00' },
    ],
  },
  {
    id: 'seconds',
    label: 'Seconds',
    items: [
      { name: 'Lomo saltado', description: 'Wok-fried Argentine rump with red onion, aji amarillo and tomato; brown stock and plain rice', price: '€18.00' },
      { name: 'Aji de pollo', description: 'Cumin-scented aji amarillo sauce with frayed chicken and plain rice', price: '€16.00' },
      { name: 'Fried chicken', description: 'Chicken marinated minimum 12 hours in citrus mix', price: '€14.00' },
      { name: 'Chicken a la brasa', description: 'Chicken marinated 36 hours in spice mix and beer, homemade fries and house salad', price: 'Whole €40 / Half €25 / Quarter €15' },
      { name: 'Anticuchos', description: 'Traditionally marinated beef heart with potatoes and corn', price: '€18.00' },
    ],
  },
  {
    id: 'sides',
    label: 'Sides',
    items: [
      { name: 'French fries', description: 'Homemade', price: '€6.00' },
      { name: 'Spiced fries', description: 'With oregano, garlic and smoked paprika', price: '€7.00' },
      { name: 'House salad with Peruvian vinagreta', description: 'White cabbage, julienned carrots and vinagreta', price: '€4.00' },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    items: [
      { name: "Chef's Suspiro", description: 'Pisco-flavored milk and egg yolk cream with mulled wine reduction, maracuya puree and malbec baked meringue', price: '€8.00' },
      { name: 'Tiramisu revisited', description: 'Peruvian fruit decomposed tiramisu with sable cookie', price: '€8.00' },
      { name: 'Carrot cake', description: 'Served with berry reduction', price: '€6.00' },
      { name: 'Cookies with dulce de leche', description: '3 cookies filled with milk cream', price: '€5.00' },
      { name: 'Iced cheese', description: 'Typical Arequipa dessert with milk, coconut and cinnamon', price: '€6.00' },
      { name: 'Mango mousse', price: '€6.00' },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    items: [
      { name: 'COCKTAILS', isHeader: true, price: '' },
      { name: 'Pisco Sour', description: 'Traditional Peruvian cocktail with Pisco, egg white, cane sugar syrup, lime', price: '€9.00' },
      { name: 'Chilcano', description: 'Traditional Peruvian cocktail with Pisco, lime, sugar syrup and ginger ale', price: '€9.00' },
      { name: 'Macchupicchu', description: 'Peruvian cocktail on 3 densities with grenadine, orange juice and mint-infused Pisco', price: '€9.00' },
      { name: 'Sin Nombre', description: 'House cocktail with maracuya, mango, basil, Pisco and algarrobina', price: '€9.00' },
      { name: 'Algarrobina', description: 'Traditional Peruvian cocktail with Pisco, egg yolk, milk, cinnamon and algarrobina', price: '€9.00' },
      { name: 'Pisco Collins', description: 'Pisco, lime, syrup and sparkling water', price: '€9.00' },
      { name: 'Pisco Sunrise', description: '3-density cocktail with grenadine, orange juice and Pisco', price: '€9.00' },
      { name: 'Pisco Quebranta e Acholado', description: "Peru's signature distillate (acquavite)", price: '€4.00' },
      { name: 'WINES', isHeader: true, price: '' },
      { name: 'Intipalka Peruvian Wine', description: 'Sauvignon, Malbec, Syrah', price: 'glass €7.00' },
      { name: 'Bianco Moscato', price: '€20.00' },
      { name: 'Juistina', description: 'White wine', price: '€21.00' },
      { name: 'Manyari', description: 'Rose', price: '€17.00' },
      { name: 'Rosso Conero', description: 'Red wine', price: '€17.00' },
      { name: 'Missianer', description: 'Red wine', price: '€18.00' },
      { name: 'Guzzo', description: 'Verdicchio', price: '€18.00' },
      { name: 'La Valle del Sole', description: 'Passerina', price: '€18.00' },
      { name: 'Masottina', description: 'Sparkling white and rose', price: '€17.00' },
      { name: 'Ronco Calino', description: 'Franciacorta', price: '€35.00' },
      { name: 'Champagne A&J Demiere', description: 'Champagne Brut', price: '€72.00' },
      { name: 'BEERS', isHeader: true, price: '' },
      { name: 'Bavarian craft beers', description: 'Double malt blonde, double malt dark, weisse, blonde, unfiltered blonde', price: '€6.00' },
      { name: 'Italian craft beers', description: 'Red IPA, White IPA, gluten-free, blanche, oyster beer, salty beer, raspberry beer', price: '€6.00' },
      { name: 'SOFT DRINKS', isHeader: true, price: '' },
      { name: 'Smoothies with Peruvian pulps', description: 'Papaya, lulo, guava, guanabana, maracuya, mango, coconut, tamarind, blackberry', price: '€10.00' },
      { name: 'Coca Cola / Fanta 0.33L', price: '€3.00' },
      { name: 'Acqua Minerale', price: '€2.50' },
      { name: 'Caffe', description: 'Selection of 3 varieties', price: '€2.50' },
    ],
  },
]

function MenuCard({ item, onMouseMove, onMouseLeave }: { item: MenuItem; onMouseMove: (e: React.MouseEvent) => void; onMouseLeave: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)

  if (item.isHeader) {
    return (
      <div className="col-span-1 md:col-span-2 py-4 px-6 mt-4 first:mt-0">
        <h4
          className="text-sm uppercase tracking-[0.15em] font-semibold"
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}
        >
          {item.name}
        </h4>
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      className="tilt-card p-5 md:px-6 border-l-[3px] border-transparent hover:border-l-[var(--red)] transition-all duration-[250ms] cursor-default"
      style={{ backgroundColor: 'var(--bg-card)' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h4
            className="text-[17px] mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}
          >
            {item.name}
          </h4>
          {item.description && (
            <p
              className="text-[13px] leading-relaxed mb-2"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              {item.description}
            </p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase px-2 py-0.5 rounded"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    backgroundColor:
                      tag === 'Vegan'
                        ? 'rgba(74, 124, 89, 0.15)'
                        : tag === 'Gluten-free'
                          ? 'rgba(201, 160, 80, 0.15)'
                          : 'rgba(128, 128, 128, 0.15)',
                    color:
                      tag === 'Vegan' ? '#4A7C59' : tag === 'Gluten-free' ? 'var(--gold)' : 'var(--text-muted)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <span
          className="text-lg font-bold whitespace-nowrap"
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-playfair)' }}
        >
          {item.price}
        </span>
      </div>
    </div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('appetizers')
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

  const handleTilt = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return
    const card = e.currentTarget as HTMLElement
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleTiltReset = (e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)'
  }

  const activeCategory = menuData.find((cat) => cat.id === activeTab) || menuData[0]

  return (
    <section
      ref={sectionRef}
      id="menu"
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
            AUTENTICA CUCINA PERUVIANA
          </span>
          <h2
            className="animate-ready stagger-2 text-[clamp(2rem,6vw,3rem)]"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-playfair)' }}
          >
            Il Nostro Menu
          </h2>
        </div>

        {/* Tabs */}
        <div className="menu-tabs flex gap-2 overflow-x-auto pb-4 mb-8 -mx-5 px-5">
          {menuData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className="text-[13px] uppercase tracking-[0.1em] px-6 py-2.5 rounded whitespace-nowrap transition-colors"
              style={{
                fontFamily: 'var(--font-inter)',
                backgroundColor: activeTab === category.id ? 'var(--red)' : 'transparent',
                color: activeTab === category.id ? 'white' : 'var(--text-primary)',
                border: activeTab === category.id ? 'none' : '1px solid var(--border)',
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border)' }}>
          {activeCategory.items.map((item, index) => (
            <MenuCard
              key={`${activeCategory.id}-${index}`}
              item={item}
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltReset}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
