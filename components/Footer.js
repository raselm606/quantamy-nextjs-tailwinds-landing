import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold-500/50">
                <Image src="/logo.jpeg" alt="Quantumy" fill className="object-cover" />
              </div>
              <span className="font-display text-gold-400 font-bold text-lg tracking-wider">QUANTUMY</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-body mb-4">
              Welcome to the Golden Age of Crypto. Autonomous pricing, full transparency, consumer protection.
            </p>
            <p className="text-slate-600 text-xs font-body">Powered by BNB Chain</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-gold-400 text-xs tracking-widest mb-4">QUICK LINKS</h4>
            <div className="flex flex-col gap-2">
              {['About', 'Why Us', 'Tokenomics', 'Roadmap', 'Team', 'FAQ'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="text-slate-500 hover:text-gold-400 text-sm font-body transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Token Info */}
          <div>
            <h4 className="font-display text-gold-400 text-xs tracking-widest mb-4">TOKEN INFO</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Symbol', value: 'QBT' },
                { label: 'Launch Price', value: '$5.00 USD' },
                { label: 'Total Supply', value: '20,000,000' },
                { label: 'Network', value: 'BNB Chain' },
                { label: 'Type', value: 'Utility Token' },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-slate-600 font-body">{item.label}</span>
                  <span className="text-gold-400 font-body font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-500/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs font-body text-center md:text-left">
            © 2026 Quantumy / QBT. All Rights to Intellectual Property Reserved.
          </p>
          <p className="text-slate-700 text-xs font-body text-center">
            ⚠️ Investing in cryptocurrency involves risk. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
