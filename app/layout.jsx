import './globals.css'

export const metadata = {
  title: 'Quantum Blockchain Network Token — QBNT Token | Quantum Blockchain Network Token ',
  description: 'Quantum Blockchain Network Token (QBNT) — Autonomous pricing, full transparency, and next-generation consumer protection. Opening launch price $5.00 USD. Powered by BNB Chain.',
  icons: { icon: '/logo.jpeg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
