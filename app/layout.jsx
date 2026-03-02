import './globals.css'

export const metadata = {
  title: 'Quantumy — QBT Token | Quantum Blockchain Pricing',
  description: 'Quantum Blockchain Token (QBT) — Autonomous pricing, full transparency, and next-generation consumer protection. Opening launch price $5.00 USD. Powered by BNB Chain.',
  icons: { icon: '/logo.jpeg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
