import About from '@/components/About'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Roadmap from '@/components/Roadmap'
import Team from '@/components/Team'
import Tokenomics from '@/components/Tokenomics'
import WhyUs from '@/components/WhyUs'

export default function Page() {
  return (
    <main className="bg-navy-950 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <WhyUs />
      <Tokenomics />
      <Roadmap />
      <Team />
      <FAQ />
      <Footer />
    </main>
  )
}
