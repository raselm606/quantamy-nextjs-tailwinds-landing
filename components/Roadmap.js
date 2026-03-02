export default function Roadmap() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Research & Development',
      status: 'completed',
      items: [
        'Research on multiple platforms — 30 days of discrepancies documented',
        'Inaccurate reporting identified and companies contacted',
        'Consumer protections compliance letter sent',
        'Smart contract development initiated',
        'Governance autonomous through QBT Network',
        'Machine Learning integration for pricing',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Initial Token Launch',
      status: 'active',
      items: [
        'Full distribution on market',
        'Listing on major exchanges',
        'Market entry at $5.00 USD per token',
        'Liquidity availability on-chain and in wallets',
        'Full transparency and real-time visibility',
        'Consumer protection mechanisms active',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Ecosystem Expansion',
      status: 'upcoming',
      items: [
        'Integration with additional DEXs',
        'Strategic partnerships development',
        'Supporting data verification networks',
        'Advanced pricing network expansion',
        'Cross-chain integrations',
        'After integration — the magic happens ✨',
      ],
    },
  ]

  return (
    <section id="roadmap" className="relative py-32 px-6 bg-navy-900/40">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-display text-gold-500 text-xs tracking-[0.4em] mb-4">THE JOURNEY</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
            <span className="text-gold-gradient">Roadmap</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-body">
            Our strategic path to revolutionizing cryptocurrency pricing and transparency.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/60 via-gold-500/30 to-gold-500/10 -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {phases.map((phase, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-5 h-5 rounded-full items-center justify-center z-10">
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    phase.status === 'completed' ? 'bg-gold-500 border-gold-400 shadow-[0_0_15px_rgba(245,158,11,0.8)]' :
                    phase.status === 'active' ? 'bg-gold-500/50 border-gold-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse' :
                    'bg-navy-800 border-gold-500/30'
                  }`} />
                </div>

                {/* Content */}
                <div className={`md:w-[calc(50%-2.5rem)] ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                  <div className={`gold-border rounded-2xl p-6 md:p-8 bg-navy-800/30 hover:bg-navy-800/50 transition-all duration-300 ${
                    phase.status === 'active' ? 'border-gold-500/60 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : ''
                  }`}>
                    {/* Phase badge */}
                    <div className={`inline-block font-display text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest ${
                      phase.status === 'completed' ? 'bg-gold-500/20 text-gold-400' :
                      phase.status === 'active' ? 'bg-gold-500/30 text-gold-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]' :
                      'bg-navy-700/60 text-slate-400'
                    }`}>
                      {phase.status === 'completed' ? '✓ COMPLETED' :
                       phase.status === 'active' ? '⚡ IN PROGRESS' : '◯ UPCOMING'}
                    </div>

                    <div className="font-display text-gold-400/60 text-sm mb-1">{phase.phase}</div>
                    <h3 className="font-display text-white text-xl font-black mb-5">{phase.title}</h3>

                    <ul className={`flex flex-col gap-2 ${i % 2 === 1 ? 'md:items-end' : ''}`}>
                      {phase.items.map((item, j) => (
                        <li key={j} className={`flex items-start gap-2 text-sm text-slate-400 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                          <span className="text-gold-500 mt-1 shrink-0 text-xs">▸</span>
                          <span className="font-body">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
