import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const phases = [
  {
    phase: 'Phase 1',
    title: 'Research & Development',
    status: 'completed',
    badgeLabel: '✓ COMPLETED',
    badgeVariant: 'completed',
    items: [
      'Research on multiple platforms — 30 days of discrepancies documented',
      'Inaccurate reporting identified and companies contacted',
      'Consumer protections compliance letter sent',
      'Smart contract development initiated',
      'Governance autonomous through QBT Network',
      'Machine Learning integration for pricing algorithms',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Initial Token Launch',
    status: 'active',
    badgeLabel: '⚡ IN PROGRESS',
    badgeVariant: 'active',
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
    badgeLabel: '◯ UPCOMING',
    badgeVariant: 'upcoming',
    items: [
      'Integration with additional DEXs',
      'Strategic partnerships development',
      'Supporting data verification networks',
      'Advanced pricing network expansion',
      'Cross-chain integrations at scale',
      'After integration — the magic happens ✨',
    ],
  },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative z-1 py-28 px-6 bg-navy-900/40">
      
      
      <div className="section-divider absolute top-0 left-0" />
      <div className="section-divider absolute bottom-0 left-0" />

      <div className="max-w-7xl mx-auto z-1 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">THE JOURNEY</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-5">
            <span className="text-gold-gradient">Roadmap</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-body">
            Our strategic path to revolutionizing cryptocurrency pricing and transparency.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — desktop only */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent" />

          <div className="flex flex-col gap-12">
            {phases.map((phase, i) => (
              <div
                key={i}
                className={cn(
                  'relative flex flex-col md:flex-row gap-6 items-start',
                  i % 2 === 1 && 'md:flex-row-reverse'
                )}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-10">
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border-2',
                      phase.status === 'completed' && 'bg-gold-500 border-gold-400 shadow-[0_0_14px_rgba(245,158,11,0.8)]',
                      phase.status === 'active'    && 'bg-gold-400/60 border-gold-400 shadow-[0_0_14px_rgba(245,158,11,0.5)] animate-pulseGold',
                      phase.status === 'upcoming'  && 'bg-navy-800 border-gold-500/30',
                    )}
                  />
                </div>

                {/* Card */}
                <div className={cn('md:w-[calc(50%-2rem)]', i % 2 === 1 && 'md:text-right')}>
                  <Card
                    className={cn(
                      'p-7',
                      phase.status === 'active' && 'border-gold-500/50 shadow-[0_0_30px_rgba(245,158,11,0.12)]'
                    )}
                  >
                    <Badge variant={phase.badgeVariant} className="mb-4">{phase.badgeLabel}</Badge>
                    <p className="font-display text-gold-500/50 text-xs mb-1 tracking-widest">{phase.phase}</p>
                    <h3 className="font-display text-white text-xl font-black mb-5">{phase.title}</h3>
                    <ul className={cn('flex flex-col gap-2', i % 2 === 1 && 'md:items-end')}>
                      {phase.items.map((item, j) => (
                        <li
                          key={j}
                          className={cn(
                            'flex items-start gap-2 text-sm text-slate-400 font-body',
                            i % 2 === 1 && 'md:flex-row-reverse'
                          )}
                        >
                          <span className="text-gold-500 mt-1 shrink-0 text-[10px]">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
