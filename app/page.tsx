import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Menu from '@/components/Menu'
import Events from '@/components/Events'
import Reservation from '@/components/Reservation'
import Reviews from '@/components/Reviews'
import Info from '@/components/Info'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Events />
      <Reservation />
      <Reviews />
      <Info />
      <Footer />
    </main>
  )
}
