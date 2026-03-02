export default function WhyUs() {
  const reasons = [
    {
      num: '01',
      title: 'Multifactorial Approach',
      desc: 'Factors in demand, supply, market sentiment, volatility, liquidity, and hash rate — a holistic view of all market dynamics affecting token prices.',
    },
    {
      num: '02',
      title: 'Real-Time Adjustments',
      desc: 'Dynamic pricing adjusts based on real-time data from exchanges and market activity, reflecting current market conditions in a volatile environment.',
    },
    {
      num: '03',
      title: 'Sentiment Analysis',
      desc: 'Incorporates sentiment indices to account for market psychology, providing an accurate picture of how external factors influence trading behavior.',
    },
    {
      num: '04',
      title: 'Liquidity Consideration',
      desc: 'Inclusion of liquidity as a pricing factor recognizes that higher liquidity supports price stability and lower slippage — often overlooked in simpler models.',
    },
    {
      num: '05',
      title: 'Cross-Chain Integration',
      desc: 'Data aggregation across multiple blockchains and exchanges ensures prices reflect a wider market context rather than a single platform.',
    },
    {
      num: '06',
      title: 'Transparency & Security',
      desc: 'Blockchain-based security enhances data integrity and trust, minimizing manipulation and fraud that can affect traditional price reporting.',
    },
    {
      num: '07',
      title: 'Re-Pegging Protection',
      desc: 'In the event of a crypto de-pegging then re-pegging to USD, recalibration occurs automatically on the QBT network once integrated.',
    },
    {
      num: '08',
      title: 'Anti-Manipulation Shield',
      desc: 'Companies with manipulated market data can integrate with QBT Network to provide accurate market data and restore consumer trust.',
    },
  ]

  return (
    <section id="why-us" className="relative py-32 px-6 bg-navy-900/40">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-display text-gold-500 text-xs tracking-[0.4em] mb-4">ADVANTAGES</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
            Why Choose <span className="text-gold-gradient">QBT?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-body">
            Consumer protection and transparency is our #1 goal. 
            Integrate software and <span className="text-gold-400">Adopt Today!</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="flex gap-6 p-6 gold-border rounded-xl bg-navy-800/20 hover:bg-navy-800/40 transition-all duration-300 group"
            >
              <div className="font-display text-gold-500/30 text-3xl font-black shrink-0 group-hover:text-gold-500/60 transition-colors">
                {r.num}
              </div>
              <div>
                <h4 className="font-display text-white font-bold text-sm mb-2 tracking-wide group-hover:text-gold-400 transition-colors">
                  {r.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed font-body">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion box */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/30 text-center">
          <p className="font-display text-gold-400 text-lg font-bold mb-3">After integration is where the magic happens ✨</p>
          <p className="text-slate-400 font-body max-w-2xl mx-auto">
            This quantum blockchain pricing model is more accurate and effective than traditional methods — 
            multifactorial, real-time adaptable, and powered by sentiment and liquidity intelligence.
          </p>
        </div>
      </div>
    </section>
  )
}
