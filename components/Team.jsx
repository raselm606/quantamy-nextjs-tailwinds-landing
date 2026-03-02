import { Badge } from '@/components/ui/badge'
import { Card, CardDescription } from '@/components/ui/card'

const members = [
  {
    initials: 'JG',
    name: 'J.G.',
    location: 'Ohio, USA 🇺🇸',
    role: 'Co-Founder',
    desc: "Visionary behind Quantumy's autonomous pricing model and blockchain transparency framework.",
  },
  {
    initials: 'WR',
    name: 'W.R.',
    location: 'France 🇫🇷',
    role: 'Co-Founder',
    desc: 'Expert in decentralized network architecture and cross-chain integration systems.',
  },
]

export default function Team() {
  return (
    <section id="team" className="relative z-1 py-28 px-6">
      <div className="absolute inset-0 -z-1">
        <div className="absolute inset-0 bg-navy-950" />
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: 'linear-gradient(500deg, #020B18 55%, #061529 55%)' }}
        />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="section-divider absolute top-0 left-0" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">THE BUILDERS</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-5">
            Meet the <span className="text-gold-gradient">Team</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-body">
            The visionaries behind the Quantum Blockchain Token.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {members.map((m, i) => (
            <Card key={i} className="flex-1 max-w-sm mx-auto p-8 text-center group cursor-default">
              {/* Avatar */}
              <div className="relative mx-auto w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full bg-gold-500/15 blur-xl group-hover:bg-gold-500/25 transition-all" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center border-2 border-gold-500/50 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                  <span className="font-display text-navy-950 text-2xl font-black">{m.initials}</span>
                </div>
              </div>

              <p className="font-display text-gold-500/70 text-[10px] tracking-widest mb-1">{m.role}</p>
              <h3 className="font-display text-white text-xl font-bold mb-1">{m.name}</h3>
              <p className="text-slate-500 text-sm font-body mb-4">{m.location}</p>
              <CardDescription>{m.desc}</CardDescription>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center text-slate-700 text-xs font-body tracking-wider">
          All Rights to Intellectual Property Reserved © Quantumy / QBT
        </p>
      </div>
    </section>
  )
}
