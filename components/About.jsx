import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'

const features = [
  { icon: '🔍', title: 'Blockchain Data Scan',        desc: 'Real-time scanning of coins minted, listed, and verified. Autonomous pricing through blockchain verification and algorithms every minute.' },
  { icon: '⚡', title: 'Quantum Blockchain Pricing',   desc: 'No more self-reporting. Automatic updates powered by on-chain data. Compare QBT price with Binance, Coinbase, MetaMask, PancakeSwap & Uniswap.' },
  { icon: '🌐', title: 'Multi-Network Integration',    desc: 'Fully integrable with all networks. Decentralized, seamless cross-chain compatibility. Increases visibility and trust among consumers.' },
  { icon: '🛡️', title: 'Consumer Protection',         desc: 'Cyber security, firewall protections, and full compliance with Consumer Protection laws governing company transparency.' },
  { icon: '💧', title: 'Full Liquidity Visibility',   desc: 'All available on-market liquidity recorded and visible. Blockchain prevents over-purchasing due to liquidity constraints.' },
  { icon: '📱', title: 'App Store Compatible',         desc: 'Compatible with App Store. Sleek interface with automatic updates ensuring latest features and security patches.' },
]

const highlights = [
  { label: 'Powered By',    value: 'BNB Chain'     },
  { label: 'Opening Price', value: '$1.00 USD'     },
  { label: 'Technology',    value: 'Quantum AI'    },
  { label: 'Model',         value: 'Decentralized' },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="section-divider absolute top-0 left-0" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">ABOUT THE PROJECT</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-5">
            What is <span className="text-gold-gradient">QBNT?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto font-body leading-relaxed">
            The Quantum Blockchain Network Token (QBNT) revolutionizes the cryptocurrency ecosystem by providing
            an autonomous pricing model, enhancing transaction security, and integrating seamlessly
            across different blockchain networks — the new standard in data transparency and pricing.
          </p>
        </div>

        {/* Vision card */}
        <Card className="p-0 mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-10">
              <h3 className="font-display text-gold-400 text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-300 font-body leading-relaxed mb-5">
                To create a decentralized, user-centric ecosystem that empowers individuals and businesses
                while ensuring fair, stable, and predictable token pricing through autonomous mechanisms.
              </p>
              <p className="text-slate-400 font-body leading-relaxed mb-5">
                Along with calculating a quantum blockchain price through algorithms that have been tested through ai to ensure metrics and calculus is correct to determine the market cap value based on factors that directly influence the price calculated by artificial intelligence.
              </p>

              <p className="text-slate-400 font-body leading-relaxed">
                Solving a over trillion dollar liquidity problem because cryptocurrency is ever evolving and growing and as time goes on we learn about these factors that affect cryptocurrency
              </p>
            </div>
            <div className="p-8 md:p-10 bg-navy-900/40 grid grid-cols-2 gap-4 content-center">
              {highlights.map(h => (
                <div key={h.label} className="rounded-lg border border-gold-500/15 bg-navy-950/60 p-4 text-center">
                  <div className="font-display text-gold-400 text-sm font-bold mb-1">{h.value}</div>
                  <div className="text-slate-600 text-xs tracking-wider font-body">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Card key={i} className="p-6 group cursor-default">
              <div className="text-3xl mb-4">{f.icon}</div>
              <CardTitle className="mb-2 group-hover:text-gold-400 transition-colors">{f.title}</CardTitle>
              <CardDescription>{f.desc}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
