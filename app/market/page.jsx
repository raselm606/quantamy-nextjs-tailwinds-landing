"use client"

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calculator, Database, ExternalLink, Layers, RefreshCw, Search, TrendingDown, TrendingUp, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

// ── QBT static data ──
const QBT_DATA = {
  id: 'qbt', name: 'Quantum Blockchain Token', symbol: 'QBT',
  current_price: 5.00, market_cap: 100_000_000, volume_24h: 2_500_000,
  price_change_24h: 0, circulating_supply: 20_000_000, total_supply: 20_000_000,
  max_supply: 20_000_000, rank: 'N/A', isQBT: true,
  onchain: {
    total_supply: 20_000_000, circulating_supply: 20_000_000, max_supply: 20_000_000,
    minted_pct: '100.00', listed_pct: '100.00', liquidity_ratio_pct: '2.50',
    market_cap: 100_000_000, volume_24h: 2_500_000, fully_diluted_val: 100_000_000,
  },
  qbt_calc: null,
  exchanges: [
    { key: 'binance',      label: 'Binance',      logo: '🟡', url: 'https://www.binance.com',     available: false, price: null, volume: null },
    { key: 'coinbase',     label: 'Coinbase',      logo: '🔵', url: 'https://www.coinbase.com',    available: false, price: null, volume: null },
    { key: 'crypto_com',   label: 'Crypto.com',    logo: '🔷', url: 'https://crypto.com',          available: false, price: null, volume: null },
    { key: 'pancakeswap',  label: 'PancakeSwap',   logo: '🥞', url: 'https://pancakeswap.finance', available: false, price: null, volume: null },
    { key: 'uniswap',      label: 'Uniswap v3',    logo: '🦄', url: 'https://app.uniswap.org',     available: false, price: null, volume: null },
    { key: 'trust_wallet', label: 'Trust Wallet',  logo: '🛡️', url: 'https://trustwallet.com',     available: false, price: null, volume: null, isDex: true, dexSource: 'pancakeswap' },
    { key: 'metamask',     label: 'MetaMask',       logo: '🦊', url: 'https://metamask.io',         available: false, price: null, volume: null, isDex: true, dexSource: 'uniswap' },
    { key: 'kraken',       label: 'Kraken',          logo: '🐙', url: 'https://www.kraken.com',      available: false, price: null, volume: null },
    { key: 'kucoin',       label: 'KuCoin',          logo: '🟢', url: 'https://www.kucoin.com',      available: false, price: null, volume: null },
    { key: 'bybit',        label: 'Bybit',            logo: '⚫', url: 'https://www.bybit.com',       available: false, price: null, volume: null },
  ],
}

// ── Helpers ──
function fmt(num, digits = 2) {
  if (num == null) return '—'
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`
  if (num >= 1_000_000)     return `$${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000)         return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return `$${num.toFixed(digits)}`
}
function fmtNum(num) {
  if (num == null) return '—'
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`
  if (num >= 1_000_000)     return `${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000)         return num.toLocaleString('en-US')
  return num.toString()
}

function PriceChange({ value }) {
  if (value == null) return <span className="text-slate-500 text-xs">—</span>
  const up = value >= 0
  return (
    <span className={`flex items-center gap-1 text-xs font-semibold ${up ? 'text-emerald-400' : 'text-red-400'}`}>
      {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {Math.abs(value).toFixed(2)}%
    </span>
  )
}

// ── On-chain Data Panel ──
function OnchainPanel({ onchain, symbol }) {
  if (!onchain) return null
  const items = [
    { label: 'Total Minted',         value: fmtNum(onchain.total_supply),        sub: onchain.minted_pct ? `${onchain.minted_pct}% of max` : null, icon: '🪙' },
    { label: 'Circulating / Listed', value: fmtNum(onchain.circulating_supply),  sub: onchain.listed_pct ? `${onchain.listed_pct}% of total` : null, icon: '📊' },
    { label: 'Max Supply',           value: fmtNum(onchain.max_supply),           sub: 'Hard cap',             icon: '🔒' },
    { label: 'Available Liquidity',  value: onchain.liquidity_ratio_pct ? `${onchain.liquidity_ratio_pct}%` : '—', sub: 'Volume / Market Cap', icon: '💧' },
    { label: 'Market Cap',           value: fmt(onchain.market_cap),              sub: 'Total value',          icon: '📈' },
    { label: '24h Volume',           value: fmt(onchain.volume_24h),              sub: 'Trading activity',     icon: '⚡' },
    { label: 'Fully Diluted Val.',   value: fmt(onchain.fully_diluted_val),       sub: 'At max supply',        icon: '🌐' },
  ]

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2 mb-3">
        <Database size={12} className="text-gold-500/60" />
        <p className="font-display text-slate-500 text-[9px] tracking-widest">ON-CHAIN DATA</p>
        <Badge variant="navy" className="text-[8px] px-2 py-0.5">{symbol}</Badge>
      </div>

      <div className="rounded-xl border border-gold-500/15 overflow-hidden">
        {/* Supply bar */}
        {onchain.circulating_supply && onchain.total_supply && (
          <div className="px-4 py-3 bg-navy-950/40 border-b border-gold-500/10">
            <div className="flex justify-between text-[9px] font-display tracking-wider text-slate-500 mb-2">
              <span>CIRCULATING</span>
              <span>{onchain.listed_pct}% LISTED</span>
            </div>
            <div className="h-1.5 rounded-full bg-navy-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                style={{ width: `${Math.min(parseFloat(onchain.listed_pct) || 0, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-body text-slate-600 mt-1.5">
              <span>{fmtNum(onchain.circulating_supply)}</span>
              <span>{fmtNum(onchain.total_supply)}</span>
            </div>
          </div>
        )}

        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b border-gold-500/10 last:border-0 hover:bg-navy-800/20 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-sm leading-none">{item.icon}</span>
              <div>
                <p className="text-slate-400 text-[11px] font-body">{item.label}</p>
                {item.sub && <p className="text-slate-600 text-[9px] font-body">{item.sub}</p>}
              </div>
            </div>
            <span className="text-white text-xs font-semibold font-display">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── QBT Algorithm Panel ──
function QBTCalcPanel({ qbt_calc, symbol, current_price }) {
  if (!qbt_calc || !qbt_calc.inputs) return null
  const { inputs, formula_price } = qbt_calc

  const diff = formula_price && current_price
    ? ((formula_price - current_price) / current_price * 100)
    : null

  const isUndervalued = diff != null && diff > 0

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2 mb-3">
        <Calculator size={12} className="text-gold-500/60" />
        <p className="font-display text-slate-500 text-[9px] tracking-widest">QBT ALGORITHM ANALYSIS</p>
      </div>

      <div className="rounded-xl border border-gold-500/20 bg-gradient-to-br from-navy-900/60 to-navy-950/60 overflow-hidden">
        {/* Formula */}
        <div className="px-4 py-3 border-b border-gold-500/10 bg-navy-950/40">
          <p className="font-mono text-[9px] text-gold-500/60 overflow-x-auto whitespace-nowrap">
            TP = UR × (D÷S) × HR × SC × MAF × LF × (1+SI) × (1−VI) × UAM ÷ S
          </p>
        </div>

        {/* Inputs */}
        <div className="px-4 py-3 border-b border-gold-500/10">
          <p className="font-display text-[8px] tracking-widest text-slate-600 mb-2">INPUTS FROM MARKET DATA</p>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.entries(inputs).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2 rounded bg-navy-950/50 px-2 py-1">
                <span className="font-display text-gold-500/60 text-[9px]">{k}</span>
                <span className="text-slate-400 text-[9px] font-mono truncate max-w-[80px] text-right">{typeof v === 'number' && v > 1000 ? fmtNum(v) : v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="px-4 py-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-display text-[8px] tracking-widest text-slate-500 mb-1">MARKET PRICE ({symbol})</p>
              <p className="font-display text-white text-lg font-black">{fmt(current_price)}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-[8px] tracking-widest text-slate-500 mb-1">QBT FORMULA PRICE</p>
              <p className="font-display text-gold-400 text-lg font-black">
                {formula_price > 0 ? fmt(formula_price, 6) : 'N/A'}
              </p>
            </div>
          </div>

          {diff != null && (
            <div className={`rounded-lg px-4 py-3 border text-center ${
              isUndervalued
                ? 'bg-emerald-500/[0.08] border-emerald-500/20'
                : 'bg-red-500/[0.06] border-red-500/15'
            }`}>
              <p className={`font-display text-xs font-bold tracking-wider ${isUndervalued ? 'text-emerald-400' : 'text-red-400'}`}>
                {isUndervalued ? '📈 POTENTIALLY UNDERVALUED' : '📉 POTENTIALLY OVERVALUED'}
              </p>
              <p className={`text-[10px] font-body mt-1 ${isUndervalued ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
                QBT model suggests {Math.abs(diff).toFixed(2)}% {isUndervalued ? 'above' : 'below'} current market price
              </p>
            </div>
          )}

          <p className="text-slate-700 text-[9px] font-body mt-2 text-center">
            * Indicative only. Based on Quantum Blockchain pricing model.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Exchange Comparison ──
function ExchangeTable({ exchanges, coinSymbol, coinPrice }) {
  if (!exchanges?.length) return null

  const available   = exchanges.filter(e => e.available && e.price != null)
  const unavailable = exchanges.filter(e => !e.available || e.price == null)
  const prices      = available.map(e => e.price)
  const minPrice    = prices.length ? Math.min(...prices) : null
  const maxPrice    = prices.length ? Math.max(...prices) : null
  const avgPrice    = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : null

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2 mb-3">
        <Layers size={12} className="text-gold-500/60" />
        <p className="font-display text-slate-500 text-[9px] tracking-widest">EXCHANGE COMPARISON</p>
        {available.length > 0 && (
          <Badge variant="navy" className="text-[8px] px-2 py-0.5">{available.length} FOUND</Badge>
        )}
      </div>

      <div className="rounded-xl border border-gold-500/15 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-2 bg-navy-950/60 border-b border-gold-500/10">
          <span className="font-display text-[8px] tracking-widest text-slate-600">EXCHANGE / WALLET</span>
          <span className="font-display text-[8px] tracking-widest text-slate-600 text-right min-w-[80px]">PRICE (USD)</span>
          <span className="w-8" />
        </div>

        {/* QBT row */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center px-4 py-2.5 bg-gold-500/[0.06] border-b border-gold-500/15">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-gold-500/40 shrink-0">
              <Image src="/logo.jpeg" alt="QBT" width={20} height={20} className="object-cover" />
            </div>
            <div>
              <p className="text-gold-400 text-[11px] font-semibold font-body">QBT ICO Price</p>
              <p className="text-gold-500/50 text-[9px] font-display">LAUNCH</p>
            </div>
          </div>
          <span className="font-display text-gold-400 text-xs font-bold min-w-[80px] text-right">$5.00</span>
          <span className="w-8" />
        </div>

        {/* Available */}
        {available.map((ex) => {
          const isLowest  = ex.price === minPrice && prices.length > 1
          const isHighest = ex.price === maxPrice && prices.length > 1
          const diff      = avgPrice ? ((ex.price - avgPrice) / avgPrice * 100) : null
          return (
            <div key={ex.key} className={`grid grid-cols-[1fr_auto_auto] gap-2 items-center px-4 py-2.5 border-b border-gold-500/10 last:border-0 hover:bg-navy-800/30 transition-colors ${isLowest ? 'bg-emerald-500/[0.04]' : isHighest ? 'bg-red-500/[0.04]' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">{ex.logo}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-white text-[11px] font-semibold font-body">{ex.label}</p>
                    {ex.isDex && <span className="text-[8px] font-display text-slate-600 bg-navy-700/60 px-1 rounded">via {ex.dexSource}</span>}
                  </div>
                  {isLowest  && <p className="text-emerald-400 text-[8px] font-display tracking-wider">✓ LOWEST</p>}
                  {isHighest && <p className="text-red-400 text-[8px] font-display tracking-wider">↑ HIGHEST</p>}
                </div>
              </div>
              <div className="text-right min-w-[80px]">
                <p className="font-display text-white text-xs font-bold">{fmt(ex.price)}</p>
                {diff != null && (
                  <p className={`text-[9px] ${diff > 0 ? 'text-red-400' : diff < 0 ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(2)}% vs avg
                  </p>
                )}
              </div>
              <a href={ex.url} target="_blank" rel="noopener noreferrer"
                className="w-8 flex justify-end text-slate-600 hover:text-gold-400 transition-colors"
                onClick={e => e.stopPropagation()}>
                <ExternalLink size={11} />
              </a>
            </div>
          )
        })}

        {/* Unavailable */}
        {unavailable.map(ex => (
          <div key={ex.key} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center px-4 py-2.5 border-b border-gold-500/10 last:border-0 opacity-30">
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">{ex.logo}</span>
              <div>
                <p className="text-slate-500 text-[11px] font-body">{ex.label}</p>
                {ex.isDex && <p className="text-slate-600 text-[9px] font-display">wallet — uses {ex.dexSource}</p>}
              </div>
            </div>
            <span className="text-slate-600 text-[10px] font-display min-w-[80px] text-right">NOT LISTED</span>
            <a href={ex.url} target="_blank" rel="noopener noreferrer"
              className="w-8 flex justify-end text-slate-700 hover:text-slate-500 transition-colors"
              onClick={e => e.stopPropagation()}>
              <ExternalLink size={11} />
            </a>
          </div>
        ))}
      </div>

      {/* Best / Highest summary */}
      {available.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-emerald-500/[0.07] border border-emerald-500/20 px-3 py-2">
            <p className="text-emerald-400/60 text-[8px] font-display tracking-widest mb-0.5">BEST PRICE</p>
            <p className="text-emerald-400 text-xs font-bold font-display">{fmt(minPrice)}</p>
            <p className="text-emerald-400/50 text-[9px] font-body truncate">{available.find(e => e.price === minPrice)?.label}</p>
          </div>
          <div className="rounded-lg bg-navy-800/40 border border-gold-500/10 px-3 py-2">
            <p className="text-slate-500 text-[8px] font-display tracking-widest mb-0.5">AVG PRICE</p>
            <p className="text-gold-400 text-xs font-bold font-display">{fmt(avgPrice)}</p>
            <p className="text-slate-600 text-[9px] font-body">{available.length} exchanges</p>
          </div>
          <div className="rounded-lg bg-red-500/[0.05] border border-red-500/15 px-3 py-2">
            <p className="text-red-400/60 text-[8px] font-display tracking-widest mb-0.5">HIGHEST</p>
            <p className="text-red-400 text-xs font-bold font-display">{fmt(maxPrice)}</p>
            <p className="text-red-400/50 text-[9px] font-body truncate">{available.find(e => e.price === maxPrice)?.label}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── QBT Featured Card ──
function QBTCard() {
  return (
    <div className="rounded-2xl border border-gold-500/40 bg-gradient-to-br from-navy-800/80 to-navy-900/80 p-6 shadow-[0_0_40px_rgba(245,158,11,0.12)] backdrop-blur-sm">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500/50 shadow-[0_0_16px_rgba(245,158,11,0.4)] shrink-0">
            <Image src="/logo.jpeg" alt="QBT" width={48} height={48} className="object-cover" />
          </div>
          <div>
            <h3 className="font-display text-white font-bold text-sm tracking-wide">Quantum Blockchain Token</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="active" className="text-[9px] px-2 py-0.5">QBT</Badge>
              <span className="text-slate-600 text-[10px] font-display">BNB CHAIN</span>
            </div>
          </div>
        </div>
        <Badge className="text-[9px]">ICO LIVE</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-slate-500 text-[10px] font-display tracking-widest mb-1">LAUNCH PRICE</p>
          <p className="font-display text-gold-400 text-3xl font-black">$5.00</p>
          <p className="text-slate-600 text-[10px] font-body mt-0.5">USD per token</p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {[
            { label: 'TOTAL SUPPLY', value: '20,000,000 QBT' },
            { label: 'MARKET CAP',   value: '$100M' },
            { label: 'NETWORK',      value: 'BNB Chain' },
          ].map(item => (
            <div key={item.label} className="rounded-lg bg-navy-950/60 border border-gold-500/10 px-3 py-1.5">
              <p className="text-slate-600 text-[9px] font-display tracking-widest">{item.label}</p>
              <p className="text-gold-400/80 text-xs font-semibold font-body">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <Separator className="mb-4 opacity-30" />
      <p className="text-slate-600 text-[9px] font-display tracking-widest mb-2">QUANTUM PRICING MODEL</p>
      <div className="rounded-lg bg-navy-950/60 border border-gold-500/10 px-3 py-2 font-mono text-[10px] text-gold-500/70 overflow-x-auto whitespace-nowrap">
        TP = UR × (D÷S) × HR × SC × MAF × LF × (1+SI) × (1−VI) × UAM ÷ S
      </div>
      <p className="text-slate-600 text-[10px] font-body mt-2">Autonomous • Transparent • Fraud-resistant</p>
    </div>
  )
}

// ── Coin Row ──
function CoinRow({ coin, onClick, isSelected }) {
  return (
    <tr onClick={() => onClick(coin)} className={`border-b border-gold-500/10 cursor-pointer transition-colors duration-150 ${isSelected ? 'bg-gold-500/[0.07]' : 'hover:bg-navy-800/40'}`}>
      <td className="px-4 py-3 text-slate-500 text-xs font-display w-10">{coin.rank ?? '—'}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          {coin.image ? <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" /> : <div className="w-6 h-6 rounded-full bg-navy-700 border border-gold-500/20" />}
          <div>
            <p className="text-white text-xs font-semibold font-body">{coin.name}</p>
            <p className="text-slate-600 text-[10px] font-display">{coin.symbol}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-right"><p className="text-gold-400 text-xs font-semibold font-display">{fmt(coin.current_price)}</p></td>
      <td className="px-4 py-3 text-right"><PriceChange value={coin.price_change_24h} /></td>
      <td className="px-4 py-3 text-right text-slate-400 text-xs font-body hidden md:table-cell">{fmt(coin.market_cap)}</td>
      <td className="px-4 py-3 text-right text-slate-500 text-xs font-body hidden lg:table-cell">{fmt(coin.volume_24h)}</td>
    </tr>
  )
}

// ── Coin Detail Panel ──
function CoinDetail({ coin, onClose }) {
  if (!coin) return null
  return (
    <Card className="p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {coin.image
            ? <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full border border-gold-500/30" />
            : <div className="w-10 h-10 rounded-full bg-navy-700 border border-gold-500/20 flex items-center justify-center"><span className="font-display text-gold-500 text-xs">{coin.symbol?.[0]}</span></div>
          }
          <div>
            <h4 className="font-display text-white font-bold text-sm">{coin.name}</h4>
            <span className="text-slate-500 text-[10px] font-display">{coin.symbol}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-600 hover:text-gold-400 transition-colors"><X size={16} /></button>
      </div>

      {/* Price */}
      <div className="mb-4">
        <p className="font-display text-gold-400 text-2xl font-black">{fmt(coin.current_price)}</p>
        <div className="flex items-center gap-2 mt-1">
          <PriceChange value={coin.price_change_24h} />
          <span className="text-slate-600 text-[10px]">24h</span>
        </div>
      </div>

      <Separator className="mb-4 opacity-30" />

      {/* Market stats */}
      <div className="flex flex-col gap-2 mb-2">
        {[
          { label: 'Market Cap',        value: fmt(coin.market_cap) },
          { label: '24h Volume',         value: fmt(coin.volume_24h) },
          { label: '24h High',           value: fmt(coin.high_24h) },
          { label: '24h Low',            value: fmt(coin.low_24h) },
          { label: 'All Time High',      value: fmt(coin.ath) },
          { label: 'CMC Rank',           value: coin.rank ? `#${coin.rank}` : '—' },
        ].map(item => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-slate-500 text-xs font-body">{item.label}</span>
            <span className="text-white text-xs font-semibold font-body">{item.value}</span>
          </div>
        ))}
      </div>

      {/* vs QBT */}
      {!coin.isQBT && coin.current_price != null && (
        <>
          <Separator className="my-4 opacity-30" />
          <div className="rounded-lg bg-navy-950/60 border border-gold-500/20 p-4">
            <p className="font-display text-gold-500/70 text-[9px] tracking-widest mb-3">VS QBT ($5.00)</p>
            <div className="flex justify-between mb-2">
              <span className="text-slate-400 text-xs">{coin.symbol} price</span>
              <span className="text-white text-xs font-semibold">{fmt(coin.current_price)}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-slate-400 text-xs">QBT price</span>
              <span className="text-gold-400 text-xs font-semibold">$5.00</span>
            </div>
            <div className="h-px bg-gold-500/20 mb-3" />
            <div className="flex justify-between">
              <span className="text-slate-400 text-xs">Ratio ({coin.symbol}/QBT)</span>
              <span className="text-gold-400 text-xs font-bold">{(coin.current_price / 5.00).toFixed(4)}x</span>
            </div>
          </div>
        </>
      )}

      {/* On-chain data */}
      <OnchainPanel onchain={coin.onchain} symbol={coin.symbol} />

      {/* QBT Algorithm */}
      <QBTCalcPanel qbt_calc={coin.qbt_calc} symbol={coin.symbol} current_price={coin.current_price} />

      {/* Exchange comparison */}
      <ExchangeTable exchanges={coin.exchanges} coinSymbol={coin.symbol} coinPrice={coin.current_price} />
    </Card>
  )
}

// ── Main Page ──
export default function MarketPage() {
  const [topCoins, setTopCoins]           = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [selectedCoin, setSelectedCoin]   = useState(null)
  const [coinDetail, setCoinDetail]       = useState(null)
  const [query, setQuery]                 = useState('')
  const [loading, setLoading]             = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [refreshing, setRefreshing]       = useState(false)
  const [showDropdown, setShowDropdown]   = useState(false)
  const searchRef   = useRef(null)
  const debounceRef = useRef(null)

  const fetchTopCoins = useCallback(async () => {
    setRefreshing(true)
    try {
      const res  = await fetch('/api/market')
      const data = await res.json()
      setTopCoins(Array.isArray(data) ? data : [])
    } catch { /* silent */ }
    finally { setRefreshing(false) }
  }, [])

  useEffect(() => { fetchTopCoins() }, [fetchTopCoins])

  useEffect(() => {
    if (!query.trim()) { setSearchResults([]); setShowDropdown(false); return }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res  = await fetch(`/api/market?query=${encodeURIComponent(query)}`)
        const data = await res.json()
        setSearchResults(Array.isArray(data) ? data : [])
        setShowDropdown(true)
      } catch { /* silent */ }
      finally { setLoading(false) }
    }, 400)
  }, [query])

  const handleSelectCoin = useCallback(async (coin) => {
    setShowDropdown(false)
    setQuery('')
    if (coin.isQBT) { setSelectedCoin(QBT_DATA); setCoinDetail(QBT_DATA); return }
    setSelectedCoin(coin)
    setDetailLoading(true)
    try {
      const res  = await fetch(`/api/market?coinId=${coin.id}`)
      const data = await res.json()
      setCoinDetail(data)
    } catch { setCoinDetail(coin) }
    finally { setDetailLoading(false) }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (!searchRef.current?.contains(e.target)) setShowDropdown(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <main className="min-h-screen bg-navy-950 pt-[90px] pb-20">
      <Navbar />
      <div className="fixed inset-0 grid-pattern opacity-[0.15] pointer-events-none" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-gold-400 text-xs font-display tracking-wider transition-colors mb-4">
              <ArrowLeft size={14} /> BACK TO HOME
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full" />
              <h1 className="font-display text-3xl md:text-4xl font-black text-white">
                <span className="text-gold-gradient">Market</span> Research
              </h1>
            </div>
            <p className="text-slate-500 text-sm font-body ml-4">
              Live prices • Exchange comparison • On-chain data • QBT algorithm analysis
            </p>
          </div>
          <button onClick={fetchTopCoins} className="flex items-center gap-2 text-slate-500 hover:text-gold-400 text-xs font-display tracking-wider transition-colors self-start md:self-auto">
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            REFRESH
          </button>
        </div>

        {/* Search */}
        <div className="mb-8" ref={searchRef}>
          <div className="relative max-w-xl">
            <div className="relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/60" />
              <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search any coin — Bitcoin, Ethereum, BNB..."
                className="w-full bg-navy-800/60 border border-gold-500/25 rounded-xl pl-10 pr-10 py-3.5 font-body text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/60 focus:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all"
              />
              {query && (
                <button onClick={() => { setQuery(''); setSearchResults([]); setShowDropdown(false) }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-gold-400 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-gold-500/25 bg-navy-900/98 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                {searchResults.map(coin => (
                  <button key={coin.id} onClick={() => handleSelectCoin(coin)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-navy-800/60 transition-colors text-left border-b border-gold-500/10 last:border-0">
                    {coin.image ? <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" /> : <div className="w-7 h-7 rounded-full bg-navy-700 border border-gold-500/20" />}
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold font-body">{coin.name}</p>
                      <p className="text-slate-500 text-[10px] font-display">{coin.symbol}</p>
                    </div>
                    {coin.rank && <span className="text-slate-600 text-[10px] font-display">#{coin.rank}</span>}
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-gold-500/20 bg-navy-900/95 px-4 py-3 text-slate-500 text-xs font-display tracking-wider">
                SEARCHING...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-slate-600 text-[10px] font-display tracking-wider">QUICK:</span>
            <button onClick={() => handleSelectCoin(QBT_DATA)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-[10px] font-display tracking-wider hover:bg-gold-500/20 transition-colors">
              <div className="w-3.5 h-3.5 rounded-full overflow-hidden">
                <Image src="/logo.jpeg" alt="QBT" width={14} height={14} className="object-cover" />
              </div>
              QBT
            </button>
            {['bitcoin', 'ethereum', 'binancecoin', 'solana'].map(id => {
              const coin = topCoins.find(c => c.id === id)
              if (!coin) return null
              return (
                <button key={id} onClick={() => handleSelectCoin(coin)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/10 bg-navy-800/40 text-slate-400 text-[10px] font-display tracking-wider hover:border-gold-500/30 hover:text-gold-400 transition-colors">
                  {coin.image && <img src={coin.image} alt="" className="w-3.5 h-3.5 rounded-full" />}
                  {coin.symbol}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main grid */}
        <div className="grid xl:grid-cols-[1fr_380px] gap-6">

          {/* Left */}
          <div className="flex flex-col gap-6">
            <QBTCard />
            <Card className="overflow-hidden p-0">
              <div className="px-6 py-4 border-b border-gold-500/15 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-white font-bold text-sm tracking-wide">Top Cryptocurrencies</h2>
                  <p className="text-slate-600 text-[10px] font-body mt-0.5">Click any coin — see on-chain data, exchange prices & QBT analysis</p>
                </div>
                <Badge variant="navy" className="text-[9px]">LIVE</Badge>
              </div>

              {refreshing ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-6 h-6 border-2 border-gold-500/40 border-t-gold-500 rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-slate-600 text-xs font-display tracking-wider">LOADING MARKET DATA...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold-500/10">
                        <th className="px-4 py-3 text-left text-[9px] font-display tracking-widest text-slate-600">#</th>
                        <th className="px-4 py-3 text-left text-[9px] font-display tracking-widest text-slate-600">COIN</th>
                        <th className="px-4 py-3 text-right text-[9px] font-display tracking-widest text-slate-600">PRICE</th>
                        <th className="px-4 py-3 text-right text-[9px] font-display tracking-widest text-slate-600">24H</th>
                        <th className="px-4 py-3 text-right text-[9px] font-display tracking-widest text-slate-600 hidden md:table-cell">MARKET CAP</th>
                        <th className="px-4 py-3 text-right text-[9px] font-display tracking-widest text-slate-600 hidden lg:table-cell">VOLUME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCoins.map(coin => (
                        <CoinRow key={coin.id} coin={coin} onClick={handleSelectCoin} isSelected={selectedCoin?.id === coin.id} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>

          {/* Right — Detail */}
          <div>
            {detailLoading ? (
              <Card className="p-6">
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div className="w-6 h-6 border-2 border-gold-500/40 border-t-gold-500 rounded-full animate-spin" />
                  <p className="text-slate-600 text-xs font-display tracking-wider">FETCHING ALL DATA...</p>
                </div>
              </Card>
            ) : coinDetail ? (
              <CoinDetail coin={coinDetail} onClose={() => { setCoinDetail(null); setSelectedCoin(null) }} />
            ) : (
              <Card className="p-6">
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <div className="w-14 h-14 rounded-full border border-gold-500/20 flex items-center justify-center">
                    <Search size={22} className="text-gold-500/40" />
                  </div>
                  <div>
                    <p className="font-display text-white text-sm font-bold mb-2">Select a Coin</p>
                    <div className="flex flex-col gap-1.5 text-left">
                      {[
                        { icon: <Layers size={11} />, text: 'Exchange prices — Binance, Coinbase, Crypto.com, Trust Wallet, MetaMask' },
                        { icon: <Database size={11} />, text: 'On-chain data — minted, listed, liquidity, supply' },
                        { icon: <Calculator size={11} />, text: 'QBT algorithm analysis — undervalued/overvalued signal' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-slate-600 text-[11px] font-body">
                          <span className="text-gold-500/50 mt-0.5 shrink-0">{item.icon}</span>
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => handleSelectCoin(QBT_DATA)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-display tracking-wider hover:bg-gold-500/20 transition-colors">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image src="/logo.jpeg" alt="QBT" width={16} height={16} className="object-cover" />
                    </div>
                    VIEW QBT
                  </button>
                </div>
              </Card>
            )}
          </div>
        </div>

        <p className="text-center text-slate-700 text-[10px] font-body mt-10">
          Data via CoinGecko API • Updates every 60s • Trust Wallet uses PancakeSwap • MetaMask uses Uniswap prices
        </p>
      </div>
      <Footer />
    </main>
  )
}