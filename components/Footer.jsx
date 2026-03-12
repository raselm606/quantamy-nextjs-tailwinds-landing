import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

const quickLinks = ['About', 'Why Us', 'Tokenomics', 'Roadmap', 'Team', 'FAQ']
const tokenInfo  = [
  { label: 'Symbol',       value: 'QBT' },
  { label: 'Launch Price', value: '$1.00 USD' },
  { label: 'Total Supply', value: '20,000,000' },
  { label: 'Network',      value: 'BNB Chain' },
  { label: 'Type',         value: 'Utility Token' },
]

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10 px-6 border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold-500/40">
                <Image src="/logo.jpeg" alt="Quantumy" fill className="object-cover" />
              </div>
              <span className="font-display text-gold-400 font-bold tracking-wider">QUANTUMY</span>
            </div>
            <p className="text-slate-500 text-sm font-body leading-relaxed mb-4">
              Welcome to the Golden Age of Crypto. Autonomous pricing, full transparency, consumer protection.
            </p>
            <Link href="">Twitter </Link>
            <Link href="">Telegram </Link>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-display text-gold-500/60 text-[10px] tracking-[0.4em] mb-5">QUICK LINKS</p>
            <div className="flex flex-col gap-2.5">
              {quickLinks.map(link => (
                <a
                  key={link}
                  href={`/#${link.toLowerCase().replace(' ', '-')}`}
                  className="text-slate-500 hover:text-gold-400 text-sm font-body transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Token Info */}
          <div>
            <p className="font-display text-gold-500/60 text-[10px] tracking-[0.4em] mb-5">TOKEN INFO</p>
            <div className="flex flex-col gap-3">
              {tokenInfo.map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-slate-600 font-body">{item.label}</span>
                  <span className="text-gold-400 font-body font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-700 text-xs font-body text-center md:text-left">
            © 2026 Quantumy / QBT. All Rights to Intellectual Property Reserved.
          </p>
          <p className="text-slate-800 text-xs font-body text-center">
            ⚠️ Investing in cryptocurrency involves risk. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
