export default function About() {
  const features = [
    {
      icon: '🔍',
      title: 'Blockchain Data Scan',
      desc: 'Real-time scanning of coins minted, listed, and verified. Autonomous pricing through blockchain verification every minute.',
    },
    {
      icon: '⚡',
      title: 'Quantum Blockchain Pricing',
      desc: 'No more self-reporting. Automatic price updates powered by algorithms and on-chain data. War on Fraud.',
    },
    {
      icon: '🌐',
      title: 'Multi-Network Integration',
      desc: 'Fully integrable with all networks. Compare QBT price with Binance, Coinbase, MetaMask, PancakeSwap, Uniswap, and more.',
    },
    {
      icon: '🛡️',
      title: 'Consumer Protection',
      desc: 'Cyber security, firewall protections, and full compliance with Consumer Protection laws governing transparency.',
    },
    {
      icon: '💧',
      title: 'Full Liquidity Visibility',
      desc: 'All available on-market liquidity is recorded and visible. Blockchain prevents over-purchasing due to liquidity constraints.',
    },
    {
      icon: '📱',
      title: 'App Store Compatible',
      desc: 'Available on App Store. Sleek, automatic updates ensure you always have the latest features and security patches.',
    },
  ]

  return (
    <section id="about" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-display text-gold-500 text-xs tracking-[0.4em] mb-4">ABOUT THE PROJECT</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
            What is <span className="text-gold-gradient">QBT?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed font-body">
            The Quantum Blockchain Token (QBT) revolutionizes the cryptocurrency ecosystem by providing 
            an autonomous pricing model, enhancing transaction security, and integrating seamlessly across 
            different blockchain networks — becoming the new standard in data transparency and pricing.
          </p>
        </div>

        {/* Vision Block */}
        <div className="gold-border rounded-2xl p-8 md:p-12 mb-16 bg-navy-800/30 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-display text-gold-400 text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed font-body mb-6">
                To create a decentralized, user-centric ecosystem that empowers individuals and businesses 
                while ensuring fair, stable, and predictable token pricing through autonomous mechanisms.
              </p>
              <p className="text-slate-400 leading-relaxed font-body">
                We facilitate seamless transactions across multiple blockchains while maintaining trust 
                and security in the pricing model — powered by BNB network.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Powered By', value: 'BNB Chain' },
                { label: 'Opening Price', value: '$5.00 USD' },
                { label: 'Technology', value: 'Quantum AI' },
                { label: 'Standard', value: 'Fully Decentralized' },
              ].map(item => (
                <div key={item.label} className="gold-border rounded-xl p-4 bg-navy-900/50 text-center">
                  <div className="font-display text-gold-400 text-sm font-bold mb-1">{item.value}</div>
                  <div className="text-slate-500 text-xs tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="gold-border rounded-xl p-6 bg-navy-800/20 backdrop-blur-sm hover:bg-navy-800/40 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h4 className="font-display text-white font-bold text-sm mb-3 tracking-wide group-hover:text-gold-400 transition-colors">
                {f.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed font-body">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
