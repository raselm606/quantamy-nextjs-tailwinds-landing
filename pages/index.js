import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import WhyUs from '../components/WhyUs'
import Tokenomics from '../components/Tokenomics'
import Roadmap from '../components/Roadmap'
import Team from '../components/Team'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Quantumy — QBT Token | Quantum Blockchain Pricing</title>
        <meta name="description" content="Quantum Blockchain Token (QBT) — Autonomous pricing, full transparency, and next-generation consumer protection. Opening launch price $5.00 USD. Powered by BNB Chain." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpeg" />
        <meta property="og:title" content="Quantumy — QBT Token" />
        <meta property="og:description" content="Welcome to the Golden Age of Crypto. Quantum Blockchain Pricing." />
      </Head>

      <Navbar />
      <main className="bg-navy-950">
        <Hero />
        <About />
        <WhyUs />
        <Tokenomics />
        <Roadmap />
        <Team />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
