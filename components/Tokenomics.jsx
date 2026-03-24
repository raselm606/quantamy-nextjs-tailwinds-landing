import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const variables = [
  { key: 'TP',  label: 'Token Price',         desc: 'Final calculated token price' },
  { key: 'UR',  label: 'USD Received',        desc: 'USD received from trades' },
  { key: 'D',   label: 'Demand',              desc: 'User activity & transaction volume' },
  { key: 'S',   label: 'Total Supply',        desc: '20,000,000 QBT (hard cap)' },
  { key: 'HR',  label: 'Hash Rate',           desc: 'Network strength & security' },
  { key: 'SC',  label: 'Scarcity',            desc: 'Circulating supply factor' },
  { key: 'MAF', label: 'Market Adj. Factor',  desc: 'Bullish 1.1 / Stable 1.0 / Bearish 0.9' },
  { key: 'LF',  label: 'Liquidity Factor',    desc: 'Trading volume ÷ Market Cap' },
  { key: 'SI',  label: 'Sentiment Index',     desc: 'Market mood score (−1 to +1)' },
  { key: 'VI',  label: 'Volatility Index',    desc: 'Std Dev of Prices ÷ Avg Price' },
  { key: 'UAM', label: 'User Activity',       desc: '(Active Addresses + Transactions) ÷ Supply' },
]

const keyStats = [
  { label: 'Total Supply',  value: '20,000,000', unit: 'QBT' },
  { label: 'Launch Price',  value: '$1.00',       unit: 'USD per token' },
  { label: 'Network',       value: 'BNB',         unit: 'Powered by BNB Chain', href:'https://bscscan.com/address/0x15867ADaf8F756a4031B637c883E1734EFB687D5' },
  { label: 'Model',         value: 'Quantum',     unit: 'Autonomous Pricing' },
]

const distItems = [
  { icon: '🔄', title: 'Full Market Distribution',   desc: 'All liquidity available on exchanges and wallets. On-market liquidity recorded and visible in real-time.' },
  { icon: '🔒', title: 'Liquidity Protection',        desc: 'Blockchain prevents over-purchasing. Consumer protection built directly into the smart contract layer.' },
  { icon: '📊', title: 'Transparent Pricing',         desc: 'Compare across Crypto.com, Binance, Coinbase, TrustWallet, MetaMask, PancakeSwap & Uniswap live.' },
]

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="relative z-1 py-28 px-6">

      

      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="section-divider absolute top-0 left-0" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">TOKEN ECONOMICS</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-5">
            <span className="text-gold-gradient">Tokenomics</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-body">
            Quantum Blockchain Network Token (QBNT) Pricing — the most advanced autonomous pricing model in crypto.
          </p>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {keyStats.map(s => (
            <Card key={s.label} className="p-6 text-center">
              <div className="font-display text-gold-400 text-2xl md:text-3xl font-black mb-1">{s.value}</div>
              <div className="text-gold-500/60 text-xs font-body mb-1">{s.unit}</div>
              <div className="text-slate-600 text-[10px] tracking-widest font-display">{s.label}</div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center flex-wrap mb-10 max-w-xl mx-auto animate-[fadeInUp_0.9s_ease_both]">
                    <Button asChild size="sm" id="buy">
                      <Link href="https://bscscan.com/token/0x81b70f2AeD1b7F10682Fc7D56c93483Afd8a141a" target="_blank" rel="noopener noreferrer">
                        QBNT BScScan Explorer
                      </Link>
                    </Button>
                    {/* <Button asChild variant="outline" size="sm">
                      <a href="#tokenomics">VIEW TOKENOMICS</a>
                    </Button> */}
                  </div>
        
        {/* Token Distribution */}
<div className="mb-10">
  <h3 className="font-display text-gold-400 text-lg font-bold mb-6 text-center tracking-wide">
    Token Distribution
  </h3>

  <div className="flex justify-center">
    <div className="w-full md:w-1/2 space-y-3">
      {[
        { label: 'Liquidity Pool',         amount: '10,000,000', pct: 50,  color: 'bg-emerald-500' },
        { label: 'Public Sale / ICO',       amount: '5,000,000',  pct: 25,  color: 'bg-blue-500'    },
        { label: 'Community Dev Fund',      amount: '2,400,000',  pct: 12,  color: 'bg-violet-500'  },
        { label: 'Reserves',                amount: '1,400,000',  pct: 7,   color: 'bg-amber-500'   },
        { label: 'Marketing',               amount: '500,000',    pct: 2.5, color: 'bg-orange-500'  },
        { label: 'Advisors & Partnerships', amount: '500,000',    pct: 2.5, color: 'bg-pink-500'    },
        { label: 'Development Team',        amount: '200,000',    pct: 1,   color: 'bg-slate-500'   },
      ].map(item => (
        <div key={item.label}>
          <div className="flex justify-between text-xs font-body mb-1">
            <span className="text-slate-300">{item.label}</span>
            <span className="text-slate-400">{item.amount} QBNT · {item.pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-navy-900/60 overflow-hidden">
            <div
              className={`h-full rounded-full ${item.color}`}
              style={{ width: `${item.pct * 2}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        {/* Formula card */}
        <Card className="p-8 md:p-10 mb-10">
          <h3 className="font-display text-gold-400 text-lg font-bold mb-6 text-center tracking-wide">
            Quantum Pricing Formula
          </h3>
          <div className="rounded-xl bg-navy-950/80 border border-gold-500/15 p-6 text-center mb-8 overflow-x-auto">
            <p className="font-display text-slate-500 text-[10px] tracking-[0.3em] mb-3">TOKEN PRICE (TP) =</p>
            <p className="font-mono text-gold-400 text-sm md:text-base leading-relaxed whitespace-nowrap">
              UR × (D ÷ S) × HR × SC × MAF × LF × (1 + SI) × (1 − VI) × UAM
            </p>
            <p className="font-display text-slate-500 text-[10px] tracking-widest mt-3">÷ S (Total Supply)</p>
          </div>

          <Separator className="mb-6" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {variables.map(v => (
              <div
                key={v.key}
                className="flex gap-3 items-start rounded-lg border border-gold-500/10 bg-navy-900/40 p-3"
              >
                <span className="font-display text-gold-500 text-[11px] font-bold w-10 shrink-0 mt-0.5">{v.key}</span>
                <div>
                  <p className="text-white text-xs font-semibold font-body mb-0.5">{v.label}</p>
                  <p className="text-slate-500 text-xs font-body">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        

        {/* Distribution */}
        <div className="grid md:grid-cols-3 gap-5">
          {distItems.map((item, i) => (
            <Card key={i} className="p-6 text-center group cursor-default">
              <div className="text-3xl mb-4">{item.icon}</div>
              <CardTitle className="mb-2 group-hover:text-gold-400 transition-colors text-center">{item.title}</CardTitle>
              <CardDescription className="text-center">{item.desc}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
