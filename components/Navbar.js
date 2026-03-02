import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Tokenomics', href: '#tokenomics' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Team', href: '#team' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-navy-950/95 backdrop-blur-md border-b border-gold-500/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold-500/50">
            <Image src="/logo.jpeg" alt="Quantumy" fill className="object-cover" />
          </div>
          <span className="font-display text-gold-400 font-bold text-lg tracking-wider">QUANTUMY</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-gold-400 font-body text-sm tracking-wide transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#buy"
            className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-display font-bold text-sm px-5 py-2 rounded tracking-wider hover:from-gold-400 hover:to-gold-500 transition-all duration-200 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
          >
            BUY QBT
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gold-400 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-gold-500/20 px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 hover:text-gold-400 font-body text-sm tracking-wide transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#buy"
            onClick={() => setMenuOpen(false)}
            className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-display font-bold text-sm px-5 py-2 rounded tracking-wider text-center"
          >
            BUY QBT
          </a>
        </div>
      )}
    </nav>
  )
}
