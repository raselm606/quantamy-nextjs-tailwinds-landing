import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden stars-bg grid-pattern mt-[60px]">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-gold-500/10 blur-2xl" />
      </div>

      {/* Animated orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="orbit-ring w-[500px] h-[500px] rounded-full border border-gold-500/30 absolute" />
        <div className="orbit-ring w-[700px] h-[700px] rounded-full border border-gold-500/20 absolute" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
        <div className="orbit-ring w-[900px] h-[900px] rounded-full border border-gold-500/10 absolute" style={{ animationDuration: '25s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-2xl scale-150 animate-pulse" />
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-gold-500/60 shadow-[0_0_60px_rgba(245,158,11,0.5)] animate-[float_6s_ease-in-out_infinite]">
              <Image src="/logo.jpeg" alt="Quantumy QBT" fill className="object-cover" priority />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="fade-in-up">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider mb-4">
            <span className="text-gold-gradient">QUANTUMY</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold-500/60" />
            <span className="font-display text-gold-400/80 text-xs tracking-[0.4em]">QBT TOKEN</span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gold-500/60" />
          </div>
        </div>

        {/* Tagline */}
        <div className="fade-in-up delay-200">
          <p className="text-xl md:text-2xl text-slate-300 font-body font-light mb-4 leading-relaxed">
            Welcome to the <span className="text-gold-400 font-semibold">Golden Age of Crypto</span>
          </p>
          <p className="text-base md:text-lg text-slate-400 font-body font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Quantum Blockchain Token — Autonomous pricing, full transparency, and next-generation 
            consumer protection for the decentralized future.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            id="buy"
            href="#about"
            className="group relative bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-display font-black text-sm px-10 py-4 rounded tracking-widest shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">BUY QBT — $5.00 USD</span>
          </a>
          <a
            href="#tokenomics"
            className="gold-border bg-navy-800/50 text-gold-400 font-display font-bold text-sm px-10 py-4 rounded tracking-widest transition-all duration-300 hover:scale-105 hover:bg-navy-700/50"
          >
            VIEW TOKENOMICS
          </a>
        </div>

        {/* Stats bar */}
        <div className="fade-in-up delay-400 flex flex-wrap justify-center gap-8 md:gap-12">
          {[
            { label: 'Launch Price', value: '$5.00 USD' },
            { label: 'Total Supply', value: '20M QBT' },
            { label: 'Network', value: 'BNB Chain' },
            { label: 'Exchanges', value: 'Multi-DEX' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-gold-400 text-lg md:text-xl font-bold">{stat.value}</div>
              <div className="text-slate-500 text-xs tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-gradient-to-b from-gold-500/60 to-transparent" />
        <span className="text-gold-500/60 text-xs tracking-widest">SCROLL</span>
      </div>
    </section>
  )
}
