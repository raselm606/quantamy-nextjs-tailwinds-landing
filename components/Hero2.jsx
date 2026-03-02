import CountdownTimer from '@/components/CountdownTimer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

export default function Hero() {
  const stats = [
    { label: 'Launch Price',  value: '$5.00',    unit: 'USD per token' },
    { label: 'Total Supply',  value: '20M',       unit: 'QBT tokens'   },
    { label: 'Network',       value: 'BNB',       unit: 'Chain'        },
    { label: 'Availability',  value: 'Multi',     unit: 'DEX & Wallets'},
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden stars-bg grid-pattern"
      /* pt-[120px] ensures content clears fixed navbar even at 125% Windows scaling */
    >
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[700px] h-[700px] rounded-full bg-gold-500/[0.04] blur-3xl" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-gold-500/[0.07] blur-2xl" />
      </div>

      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[420px] h-[420px] rounded-full border border-gold-500/[0.12] animate-orbit absolute" />
        <div className="w-[620px] h-[620px] rounded-full border border-gold-500/[0.07] animate-orbit-reverse absolute" />
        <div className="w-[820px] h-[820px] rounded-full border border-gold-500/[0.04] animate-orbit-slow absolute" />
      </div>

      {/* Main content — pt-[120px] pb-20 gives breathing room at any zoom level */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-[120px] pb-20 flex flex-col items-center">

        {/* Badge */}
        <div className="mb-8 animate-[fadeInUp_0.6s_ease_forwards]">
          <Badge variant="active" className="text-xs px-4 py-1.5">
            ⚡ QBT LIVE — Opening at $5.00 USD
          </Badge>
        </div>

        {/* Floating logo */}
        <div className="mb-10 animate-[fadeInUp_0.7s_ease_forwards]">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-3xl scale-150 animate-pulseGold" />
            <div
              className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-gold-500/60 shadow-[0_0_60px_rgba(245,158,11,0.45)] animate-float"
            >
              <Image
                src="/logo.jpeg"
                alt="Quantumy QBT Token"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="animate-[fadeInUp_0.8s_ease_forwards]">
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-wider mb-3">
            <span className="shimmer-text">QUANTUMY</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="font-display text-gold-400/70 text-[10px] tracking-[0.5em]">QBT TOKEN</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
        </div>

        {/* Tagline */}
        <div className="animate-[fadeInUp_0.9s_ease_forwards]">
          <p className="text-xl md:text-2xl text-slate-300 font-body font-light mb-3 leading-relaxed">
            Welcome to the{' '}
            <span className="text-gold-400 font-semibold">Golden Age of Crypto</span>
          </p>
          <p className="text-base text-slate-400 font-body font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Quantum Blockchain Token — Autonomous pricing, full transparency,
            and next-generation consumer protection for the decentralized future.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-[fadeInUp_1s_ease_forwards]">
          <Button asChild size="lg" id="buy">
            <a href="#about">BUY QBT — $5.00 USD</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#tokenomics">VIEW TOKENOMICS</a>
          </Button>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12 w-full">
          <CountdownTimer />
        </div>

        {/* Stats */}
        <div className="animate-[fadeInUp_1.1s_ease_forwards] w-full">
          <Separator className="mb-8 opacity-40" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-gold-400 text-2xl md:text-3xl font-black leading-tight">
                  {stat.value}
                </div>
                <div className="text-gold-500/60 text-xs font-body mt-0.5">{stat.unit}</div>
                <div className="text-slate-600 text-[10px] tracking-widest mt-1 font-display">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-gold-500/50 to-transparent" />
        <span className="font-display text-gold-500/50 text-[9px] tracking-[0.4em]">SCROLL</span>
      </div>
    </section>
  )
}
