import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      q: 'What is cryptocurrency?',
      a: 'Cryptocurrency is a digital or virtual form of currency that uses cryptography for security and operates on a technology called blockchain.',
    },
    {
      q: 'How does blockchain technology work?',
      a: 'Blockchain is a decentralized ledger that records all transactions across a network of computers. Each transaction is grouped into blocks and linked in chronological order, forming a chain.',
    },
    {
      q: 'What are the different types of cryptocurrencies?',
      a: 'There are thousands of cryptocurrencies, but some of the most well-known include Bitcoin, Ethereum, Ripple, Litecoin, and Bitcoin Cash, each with unique features and use cases.',
    },
    {
      q: 'How can I buy QBT / cryptocurrency?',
      a: 'Cryptocurrencies can be purchased through exchanges using traditional currency or other cryptocurrencies. Most exchanges require users to create an account and complete verification. QBT will be available on major DEXs and wallets.',
    },
    {
      q: 'Is investing in cryptocurrency safe?',
      a: 'While cryptocurrencies can offer high returns, they are also subject to high volatility and risk. It\'s important to conduct thorough research and only invest what you can afford to lose.',
    },
    {
      q: 'What is a cryptocurrency wallet?',
      a: 'A cryptocurrency wallet is a digital tool that allows users to store, send, and receive cryptocurrencies. Wallets can be hardware-based or software-based and come in various forms.',
    },
    {
      q: 'What is mining in cryptocurrency?',
      a: 'Mining is the process of validating transactions on a blockchain and adding them to the public ledger. Miners use powerful computers to solve complex mathematical problems and are rewarded with new coins.',
    },
    {
      q: 'How do I keep my cryptocurrency safe?',
      a: 'To safeguard your cryptocurrency, use secure wallets, enable two-factor authentication, keep your private keys confidential, and be cautious of phishing scams.',
    },
    {
      q: 'What are altcoins?',
      a: 'Altcoins are any cryptocurrencies other than Bitcoin. They can vary widely in terms of technology, use cases, and market capitalization.',
    },
    {
      q: 'What are the tax implications of cryptocurrency trading?',
      a: 'Tax treatment of cryptocurrencies varies by jurisdiction. In many countries, cryptocurrencies are considered assets, and capital gains taxes may apply to profits from trading. Always consult a tax professional for guidance.',
    },
  ]

  return (
    <section id="faq" className="relative py-32 px-6 bg-navy-900/40">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-display text-gold-500 text-xs tracking-[0.4em] mb-4">QUESTIONS & ANSWERS</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
            <span className="text-gold-gradient">FAQ</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-body">
            Everything you need to know about QBT and cryptocurrency.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`gold-border rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'bg-navy-800/50 border-gold-500/50' : 'bg-navy-800/20'
              }`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-body font-semibold text-white text-sm md:text-base">{faq.q}</span>
                <span className={`font-display text-gold-500 text-lg shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <div className="h-px bg-gold-500/20 mb-4" />
                  <p className="text-slate-400 text-sm leading-relaxed font-body">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
