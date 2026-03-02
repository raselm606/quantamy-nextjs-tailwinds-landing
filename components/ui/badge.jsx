import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-display font-bold tracking-widest transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gold-500/20 text-gold-400 border border-gold-500/30",
        completed: "bg-gold-500/20 text-gold-400 border border-gold-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]",
        active: "bg-gold-500/30 text-gold-300 border border-gold-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
        upcoming: "bg-navy-700/60 text-slate-400 border border-slate-600/30",
        navy: "bg-navy-700/80 text-slate-300 border border-navy-600/50",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
