export default function Team() {
  const members = [
    {
      initials: 'JG',
      name: 'J.G.',
      location: 'Ohio, USA 🇺🇸',
      role: 'Co-Founder',
      desc: 'Visionary behind Quantumy\'s autonomous pricing model and blockchain transparency framework.',
    },
    {
      initials: 'WR',
      name: 'W.R.',
      location: 'France 🇫🇷',
      role: 'Co-Founder',
      desc: 'Expert in decentralized network architecture and cross-chain integration systems.',
    },
  ]

  return (
    <section id="team" className="relative py-32 px-6">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-display text-gold-500 text-xs tracking-[0.4em] mb-4">THE BUILDERS</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
            Meet the <span className="text-gold-gradient">Team</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-body">
            The visionaries behind the Quantum Blockchain Token — dedicated to consumer protection and transparency.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {members.map((member, i) => (
            <div
              key={i}
              className="flex-1 max-w-sm mx-auto gold-border rounded-2xl p-8 bg-navy-800/30 text-center hover:bg-navy-800/50 transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className="relative mx-auto w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-xl group-hover:bg-gold-500/30 transition-all" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center border-2 border-gold-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  <span className="font-display text-navy-950 text-2xl font-black">{member.initials}</span>
                </div>
              </div>

              <div className="font-display text-gold-400 text-xs tracking-widest mb-1">{member.role}</div>
              <h3 className="font-display text-white text-xl font-bold mb-2">{member.name}</h3>
              <div className="text-slate-500 text-sm mb-4 font-body">{member.location}</div>
              <p className="text-slate-400 text-sm leading-relaxed font-body">{member.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 text-xs font-body tracking-wider">
            All Rights to Intellectual Property Reserved © Quantumy / QBT
          </p>
        </div>
      </div>
    </section>
  )
}
