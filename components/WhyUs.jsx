import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const reasons = [
  { num: '01', title: 'Multifactorial Approach',    desc: 'Factors in demand, supply, market sentiment, volatility, liquidity, and hash rate — a holistic view of all market dynamics affecting token prices.' },
  { num: '02', title: 'Real-Time Adjustments',       desc: 'Dynamic pricing adjusts based on real-time exchange data and market activity, reflecting current conditions in a volatile environment.' },
  { num: '03', title: 'Sentiment Analysis',          desc: 'Incorporates sentiment indices to account for market psychology, providing an accurate picture of how external factors influence trading.' },
  { num: '04', title: 'Liquidity Consideration',     desc: 'Liquidity as a pricing factor recognizes that higher liquidity supports price stability and lower slippage — often overlooked in simpler models.' },
  { num: '05', title: 'Cross-Chain Integration',     desc: 'Data aggregation across multiple blockchains ensures prices reflect a wider market context, not confined to a single platform.' },
  { num: '06', title: 'Transparency & Security',     desc: 'Blockchain-based security enhances data integrity and trust, minimizing manipulation that can affect traditional price reporting.' },
  { num: '07', title: 'Re-Pegging Protection',       desc: 'In the event of a crypto de-pegging, automatic recalibration occurs on the QBT network once integrated — restoring stability.' },
  { num: '08', title: 'Anti-Manipulation Shield',    desc: 'Companies with manipulated market data can integrate QBT Network to provide accurate data and restore consumer trust immediately.' },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="relative z-1 py-28 px-6 bg-navy-900/40">
      <div className="absolute inset-0 -z-1">
        <div className="absolute inset-0 bg-navy-950" />
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: 'linear-gradient(215deg, #020B18 55%, #061529 55%)' }}
        />
      </div>

      <div className="section-divider absolute top-0 left-0" />
      <div className="section-divider absolute bottom-0 left-0" />

      

      <div className="max-w-7xl mx-auto z-99 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">ADVANTAGES</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-5">
            Why Choose <span className="text-gold-gradient">QBT?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-body">
            Consumer protection and transparency is our{' '}
            <span className="text-gold-400 font-semibold">#1 goal</span>.
            Integrate software and Adopt Today!
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {reasons.map((r, i) => (
            <Card key={i} className="flex gap-5 p-6 group cursor-default">
              <span className="font-display text-gold-500/25 text-3xl font-black shrink-0 group-hover:text-gold-500/50 transition-colors leading-none mt-0.5">
                {r.num}
              </span>
              <div>
                <h4 className="font-display text-white font-bold text-sm mb-2 tracking-wide group-hover:text-gold-400 transition-colors">
                  {r.title}
                </h4>
                <p className="text-slate-400 text-sm font-body leading-relaxed">{r.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Conclusion */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-gold-500/[0.08] to-gold-600/[0.04] border border-gold-500/25 text-center">
          <p className="font-display text-gold-400 text-lg font-bold mb-3">
            After integration is where the magic happens ✨
          </p>
          <p className="text-slate-400 font-body max-w-2xl mx-auto text-sm leading-relaxed">
            This quantum blockchain pricing model is more accurate and effective than traditional methods —
            multifactorial, real-time adaptable, and powered by sentiment and liquidity intelligence.
          </p>
        </div>
      </div>
    </section>
  )
}
