import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

const faqs = [
  { q: 'What is cryptocurrency?',                          a: 'Cryptocurrency is a digital or virtual form of currency that uses cryptography for security and operates on a technology called blockchain.' },
  { q: 'How does blockchain technology work?',             a: 'Blockchain is a decentralized ledger that records all transactions across a network of computers. Each transaction is grouped into blocks and linked in chronological order, forming a chain.' },
  { q: 'What are the different types of cryptocurrencies?', a: 'There are thousands of cryptocurrencies, but some of the most well-known include Bitcoin, Ethereum, Ripple, Litecoin, and Bitcoin Cash, each with unique features and use cases.' },
  { q: 'How can I buy QBT?',                               a: 'QBT will be available on major DEXs and wallets listed at launch. Cryptocurrencies can generally be purchased through exchanges using traditional currency or other cryptocurrencies after completing account verification.' },
  { q: 'Is investing in cryptocurrency safe?',             a: "While cryptocurrencies can offer high returns, they are also subject to high volatility and risk. It's important to conduct thorough research and only invest what you can afford to lose." },
  { q: 'What is a cryptocurrency wallet?',                 a: 'A cryptocurrency wallet is a digital tool that allows users to store, send, and receive cryptocurrencies. Wallets can be hardware-based or software-based and come in various forms including mobile and desktop apps.' },
  { q: 'What is mining in cryptocurrency?',                a: 'Mining is the process of validating transactions on a blockchain and adding them to the public ledger. Miners use powerful computers to solve complex mathematical problems and are rewarded with new coins.' },
  { q: 'How do I keep my cryptocurrency safe?',            a: 'To safeguard your cryptocurrency, use secure wallets, enable two-factor authentication, keep your private keys confidential, and be cautious of phishing scams.' },
  { q: 'What are altcoins?',                               a: 'Altcoins are any cryptocurrencies other than Bitcoin. They can vary widely in terms of technology, use cases, and market capitalization.' },
  { q: 'What are the tax implications of crypto trading?', a: 'Tax treatment of cryptocurrencies varies by jurisdiction. In many countries, cryptocurrencies are considered assets and capital gains taxes may apply to profits. Always consult a tax professional for guidance.' },
]

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28 px-6 bg-navy-900/40">
      <div className="section-divider absolute top-0 left-0" />
      <div className="section-divider absolute bottom-0 left-0" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">QUESTIONS & ANSWERS</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-5">
            <span className="text-gold-gradient">FAQ</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-body">
            Everything you need to know about QBT and cryptocurrency.
          </p>
        </div>

        {/* Accordion */}
        <div className="rounded-2xl border border-gold-500/20 bg-navy-800/20 overflow-hidden">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="last:border-b-0"
              >
                <AccordionTrigger className="hover:bg-navy-800/30 transition-colors px-6 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 bg-navy-900/20">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
