export default function Tokenomics() {
  const variables = [
    { key: 'TP', label: 'Token Price', desc: 'Final calculated token price' },
    { key: 'UR', label: 'USD Received', desc: 'USD received from trades' },
    { key: 'D', label: 'Demand', desc: 'User activity & transaction volume' },
    { key: 'S', label: 'Total Supply', desc: '20,000,000 QBT (capped)' },
    { key: 'HR', label: 'Hash Rate', desc: 'Network strength/security' },
    { key: 'SC', label: 'Scarcity', desc: 'Circulating supply factor' },
    { key: 'MAF', label: 'Market Adj. Factor', desc: 'Bullish 1.1 / Stable 1.0 / Bearish 0.9' },
    { key: 'LF', label: 'Liquidity Factor', desc: 'Trading volume ÷ Market Cap' },
    { key: 'SI', label: 'Sentiment Index', desc: 'Market mood score (-1 to +1)' },
    { key: 'VI', label: 'Volatility Index', desc: 'Std Dev of Prices ÷ Avg Price' },
    { key: 'UAM', label: 'User Activity', desc: '(Active Addresses + Transactions) ÷ Supply' },
  ]

  return (
    <section id="tokenomics" className="relative py-32 px-6">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-display text-gold-500 text-xs tracking-[0.4em] mb-4">TOKEN ECONOMICS</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
            <span className="text-gold-gradient">Tokenomics</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-body">
            Quantum Blockchain Pricing — the most advanced autonomous pricing model in crypto.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Total Supply', value: '20,000,000', unit: 'QBT' },
            { label: 'Launch Price', value: '$5.00', unit: 'USD per token' },
            { label: 'Network', value: 'BNB', unit: 'Powered by BNB Chain' },
            { label: 'Model', value: 'Quantum', unit: 'Autonomous Pricing' },
          ].map(stat => (
            <div key={stat.label} className="gold-border rounded-xl p-6 text-center bg-navy-800/30">
              <div className="font-display text-gold-400 text-2xl md:text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-gold-500/60 text-xs mb-1">{stat.unit}</div>
              <div className="text-slate-500 text-xs tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pricing Formula */}
        <div className="gold-border rounded-2xl p-8 md:p-12 bg-navy-800/30 mb-12">
          <h3 className="font-display text-gold-400 text-xl font-bold mb-6 text-center">Quantum Pricing Formula</h3>
          <div className="bg-navy-950/80 rounded-xl p-6 font-mono text-sm text-gold-300 text-center mb-8 border border-gold-500/20 overflow-x-auto">
            <div className="text-slate-400 text-xs mb-3 font-display tracking-wider">TOKEN PRICE (TP) =</div>
            <div className="text-gold-400 text-base md:text-lg leading-relaxed">
              UR × (D ÷ S) × HR × SC × MAF × LF × (1 + SI) × (1 − VI) × UAM
            </div>
            <div className="text-slate-400 text-xs mt-3">÷ S (Total Supply)</div>
          </div>

          {/* Variables */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {variables.map(v => (
              <div key={v.key} className="flex gap-3 items-start p-3 rounded-lg bg-navy-900/40 border border-gold-500/10">
                <span className="font-display text-gold-500 text-xs font-bold w-10 shrink-0 mt-0.5">{v.key}</span>
                <div>
                  <div className="text-white text-xs font-semibold mb-0.5">{v.label}</div>
                  <div className="text-slate-500 text-xs">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution info */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🔄',
              title: 'Full Market Distribution',
              desc: 'All liquidity available on exchanges and in wallets. On-market liquidity recorded and visible in real-time.',
            },
            {
              icon: '🔒',
              title: 'Liquidity Protection',
              desc: 'Blockchain prevents over-purchasing. Consumer protection built directly into the smart contract layer.',
            },
            {
              icon: '📊',
              title: 'Transparent Pricing',
              desc: 'Compare QBT price across Crypto.com, Binance, Coinbase, TrustWallet, MetaMask, PancakeSwap & Uniswap.',
            },
          ].map((item, i) => (
            <div key={i} className="gold-border rounded-xl p-6 bg-navy-800/20 text-center">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h4 className="font-display text-white text-sm font-bold mb-3">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
