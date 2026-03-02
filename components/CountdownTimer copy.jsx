"use client"

import { useEffect, useState } from 'react'

// ✅ ICO শেষ হওয়ার তারিখ এখানে সেট করুন
const ICO_END_DATE = new Date('2026-05-31T23:59:59Z')

function getTimeLeft() {
  const diff = ICO_END_DATE - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended:   false,
  }
}

function TimeBlock({ value, label }) {
  const display = String(value).padStart(2, '0')
  const digits  = display.split('')

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Digit card pair */}
      <div className="flex gap-1.5">
        {digits.map((digit, i) => (
          <div
            key={i}
            className="
              relative w-14 h-16 md:w-20 md:h-24
              flex items-center justify-center
              rounded-lg
              bg-gradient-to-b from-navy-800 to-navy-900
              border border-gold-500/30
              shadow-[0_0_20px_rgba(245,158,11,0.08),inset_0_1px_0_rgba(245,158,11,0.15)]
              overflow-hidden
            "
          >
            {/* Top gloss line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
            {/* Middle split line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-navy-950/80 z-10" />
            {/* Top half */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-navy-800/60" />
            {/* Digit */}
            <span className="font-display font-black text-2xl md:text-4xl text-gold-400 relative z-20 leading-none drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]">
              {digit}
            </span>
          </div>
        ))}
      </div>

      {/* Label */}
      <span className="font-display text-[9px] md:text-[10px] tracking-[0.35em] text-gold-500/60 uppercase">
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <div className="flex flex-col gap-2 pb-6 pt-1">
      <div className="w-1.5 h-1.5 rounded-full bg-gold-500/50 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
      <div className="w-1.5 h-1.5 rounded-full bg-gold-500/50 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
    </div>
  )
}

export default function CountdownTimer() {
  const [time, setTime]       = useState(getTimeLeft)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(getTimeLeft()), 1_000)
    return () => clearInterval(id)
  }, [])

  // Hydration guard — server & client match on first render
  if (!mounted) return null

  return (
    <div className="w-full animate-[fadeInUp_1.05s_ease_forwards]">
      {/* Header label */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-gold-500/30" />
        <span className="font-display text-[10px] tracking-[0.45em] text-gold-500/70">
          {time.ended ? 'ICO ENDED' : 'ICO ENDS IN'}
        </span>
        <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-gold-500/30" />
      </div>

      {time.ended ? (
        <p className="font-display text-gold-400 text-center tracking-widest text-sm">
          🎉 ICO HAS ENDED
        </p>
      ) : (
        <>
          {/* Timer blocks */}
          <div className="flex items-end justify-center gap-3 md:gap-4">
            <TimeBlock value={time.days}    label="Days"    />
            <Colon />
            <TimeBlock value={time.hours}   label="Hours"   />
            <Colon />
            <TimeBlock value={time.minutes} label="Minutes" />
            <Colon />
            <TimeBlock value={time.seconds} label="Seconds" />
          </div>

          {/* Progress bar — visual only, decorative */}
          <div className="mt-6 max-w-xs mx-auto">
            <div className="flex justify-between text-[9px] font-display tracking-widest text-slate-600 mb-1.5">
              <span>ICO START</span>
              <span>ICO END</span>
            </div>
            <div className="h-1 rounded-full bg-navy-800 border border-gold-500/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                style={{ width: '62%' }}
              />
            </div>
            <p className="text-center text-[9px] font-display tracking-widest text-gold-500/50 mt-1.5">
              62% COMPLETE
            </p>
          </div>
        </>
      )}
    </div>
  )
}
