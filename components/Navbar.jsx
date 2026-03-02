"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Why Us',     href: '#why-us' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Roadmap',    href: '#roadmap' },
  { label: 'Team',       href: '#team' },
  { label: 'FAQ',        href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-navy-950/95 backdrop-blur-md border-b border-gold-500/20 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-shadow">
            <Image src="/logo.jpeg" alt="Quantumy" fill className="object-cover" />
          </div>
          <span className="font-display text-gold-400 font-bold text-base tracking-wider hidden sm:block">
            QUANTUMY
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-slate-400 hover:text-gold-400 tracking-wide transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href="#buy">BUY QBT</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gold-400 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-gold-500/20 px-6 py-5 flex flex-col gap-4">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-slate-300 hover:text-gold-400 tracking-wide transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="mt-2">
            <a href="#buy" onClick={() => setMenuOpen(false)}>BUY QBT</a>
          </Button>
        </div>
      )}
    </nav>
  )
}
