"use client"

import CountdownTimer from '@/components/CountdownTimer'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { label: 'Launch Price', value: '$1.00',  unit: 'USD / token'  },
  { label: 'Total Supply', value: '20M',    unit: 'QBT tokens'   },
  { label: 'Network',      value: 'BNB',    unit: 'Chain'        },
  { label: 'Availability', value: 'Multi',  unit: 'DEX & Wallets'},
]

export default function Heroo() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-navy-950"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-navy-950" />
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: 'linear-gradient(115deg, #020B18 55%, #061529 55%)' }}
        />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="stars-bg absolute inset-0 pointer-events-none" />

      {/* Ambient glow behind logo */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gold-500/[0.09] blur-2xl pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent hidden lg:block" />

      {/* Main grid */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2 items-center max-w-[1400px] mx-auto px-6 md:px-12 pt-[100px] pb-16 gap-10 lg:gap-0">

        {/* LEFT — Content */}
        <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-12">

          {/* Badge */}
          {/* <div className="mb-6 animate-[fadeInUp_0.5s_ease_both]">
            <Badge variant="active" className="text-xs px-4 py-1.5 gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulseGold inline-block" />
              ICO LIVE — Opening at $5.00 USD
            </Badge>
          </div> */}

          {/* Title */}
          <div className="mb-6 animate-[fadeInUp_0.65s_ease_both]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold-500/60" />
              <span className="font-display text-gold-500/70 text-[10px] tracking-[0.5em]">QBT TOKEN</span>
            </div>
            <h1 className="font-display font-black leading-[0.9] tracking-tight">
              <span className="block text-xl md:text-3xl xl:text-3xl shimmer-text">QUANTUM BLOCKCHAIN <br/> NETWORK TOKEN </span>
               
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-[2px] w-24 bg-gradient-to-r from-gold-500 to-transparent" />
              <div className="h-[2px] w-6 bg-gold-500/30" />
            </div>
          </div>

          {/* Tagline */}
          <div className="mb-8 animate-[fadeInUp_0.8s_ease_both]">
            <p className="text-lg md:text-xl text-slate-300 font-body font-light leading-relaxed mb-2">
              Welcome to the{' '}
              <span className="text-gold-400 font-semibold">Golden Age of Crypto</span>
            </p>
            <p className="text-sm text-slate-500 font-body font-light max-w-md leading-relaxed">
              The network is designed to check prices across all exchanges to support blockchain networks on market cap to avoid self reporting discrepancies and ensures pricing is on par throughout all networks.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-10 animate-[fadeInUp_0.9s_ease_both]">
            <Button asChild size="sm" id="buy">
               
              <Link href="https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x81b70f2AeD1b7F10682Fc7D56c93483Afd8a141a">BUY QBNT — $1.00 USD</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link target="_blank" href="/whitepaper.pdf">Whitepaper</Link> 
            </Button>
          </div>

          {/* Countdown Timer */}
          <div className="flex w-100">
            <div className="animate-[fadeInUp_1s_ease_both]">
            <CountdownTimer />
          </div>
          </div>

          {/* Stats */}
          <div className="mt-10 animate-[fadeInUp_1.1s_ease_both]">
            <Separator className="mb-6 opacity-30" />
            <div className="grid grid-cols-4 gap-4">
              {stats.map(stat => (
                <div key={stat.label}>
                  <div className="font-display text-gold-400 text-lg md:text-xl font-black leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-gold-500/50 text-[10px] font-body mt-0.5">{stat.unit}</div>
                  <div className="text-slate-700 text-[9px] tracking-widest mt-0.5 font-display">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Logo visual */}
        <div className="flex items-center justify-center order-1 lg:order-2 animate-[fadeInUp_0.6s_ease_both]">
          <div className="relative flex items-center justify-center">

            {/* Orbit rings */}
            <div
              className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full animate-orbit-slow"
              style={{ border: '1px dashed rgba(245,158,11,0.18)' }}
            />
            <div
              className="absolute w-[280px] h-[280px] md:w-[370px] md:h-[370px] rounded-full animate-orbit-reverse"
              style={{ border: '1px solid rgba(245,158,11,0.12)' }}
            />

            {/* Orbit dots */}
            <div className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full animate-orbit">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            </div>
            <div className="absolute w-[280px] h-[280px] md:w-[370px] md:h-[370px] rounded-full animate-orbit-reverse">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-500/60 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            </div>

            {/* Hexagon glow shape */}
            <div
              className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] bg-gradient-to-br from-gold-500/[0.07] to-gold-700/[0.03] animate-pulseGold"
              style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }}
            />

            {/* Logo */}
            <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-gold-500/50 shadow-[0_0_80px_rgba(245,158,11,0.35),0_0_160px_rgba(245,158,11,0.12)] animate-float z-10">
              <Image  src="/logo.jpeg" alt="Quantumy QBT Token" fill className="object-cover bg-[#021125] p-6" priority />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(2,11,24,0.4)]" />
            </div>

            {/* Corner tick marks */}
            {[
              'top-6 left-6 border-t-2 border-l-2',
              'top-6 right-6 border-t-2 border-r-2',
              'bottom-6 left-6 border-b-2 border-l-2',
              'bottom-6 right-6 border-b-2 border-r-2',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-6 h-6 border-gold-500/40 ${cls}`} />
            ))}

            {/* Floating info chips */}
            <div className="absolute -right-2 md:right-2 top-12 bg-navy-900/90 border border-gold-500/30 rounded-lg px-3 py-2 backdrop-blur-sm shadow-[0_0_20px_rgba(245,158,11,0.1)]">
              <p className="font-display text-gold-400 text-xs font-bold">$5.00</p>
              <p className="font-body text-slate-500 text-[9px] tracking-wider">LAUNCH PRICE</p>
            </div>
            <div className="absolute -left-2 md:left-2 bottom-14 bg-navy-900/90 border border-gold-500/30 rounded-lg px-3 py-2 backdrop-blur-sm shadow-[0_0_20px_rgba(245,158,11,0.1)]">
              <p className="font-display text-gold-400 text-xs font-bold">20M QBT</p>
              <p className="font-body text-slate-500 text-[9px] tracking-wider">TOTAL SUPPLY</p>
            </div>

          </div>
        </div>

      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce z-10">
        <div className="w-px h-7 bg-gradient-to-b from-gold-500/40 to-transparent" />
        <span className="font-display text-gold-500/40 text-[9px] tracking-[0.4em]">SCROLL</span>
      </div>
    </section>
  )
}
