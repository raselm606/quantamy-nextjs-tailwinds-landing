"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Search, TrendingUp, TrendingDown, ArrowLeft, RefreshCw, X } from 'lucide-react'

// ── QBT static data ──
const QBT_DATA = {
  id:            'qbt',
  name:          'Quantum Blockchain Token',
  symbol:        'QBT',
  current_price: 5.00,
  market_cap:    100_000_000,
  volume_24h:    2_500_000,
  price_change_24h: 0,
  circulating_supply: 20_000_000,
  total_supply:  20_000_000,
  rank:          'N/A',
  isQBT:         true,
}

// ── Helpers ──
function fmt(num, digits = 2) {
  if (num == null) return '—'
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`
  if (num >= 1_000_000)     return `$${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000)         return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return `$${num.toFixed(digits)}`
}

function fmtSupply(num) {
  if (num == null) return '—'
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`
  if (num >= 1_000_000)     return `${(num / 1_000_000).toFixed(2)}M`
  return num.toLocaleString('en-US')
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

// ── QBT Price Card ──
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
            { label: 'TOTAL SUPPLY',  value: '20,000,000 QBT' },
            { label: 'MARKET CAP',    value: '$100M' },
            { label: 'NETWORK',       value: 'BNB Chain' },
          ].map(item => (
            <div key={item.label} className="rounded-lg bg-navy-950/60 border border-gold-500/10 px-3 py-1.5">
              <p className="text-slate-600 text-[9px] font-display tracking-widest">{item.label}</p>
              <p className="text-gold-400/80 text-xs font-semibold font-body">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <Separator className="mb-4 opacity-30" />

      <div className="flex flex-col gap-1.5">
        <p className="text-slate-600 text-[9px] font-display tracking-widest mb-1">QUANTUM PRICING MODEL</p>
        <div className="rounded-lg bg-navy-950/60 border border-gold-500/10 px-3 py-2 font-mono text-[10px] text-gold-500/70 overflow-x-auto whitespace-nowrap">
          TP = UR × (D÷S) × HR × SC × MAF × LF × (1+SI) × (1−VI) × UAM ÷ S
        </div>
        <p className="text-slate-600 text-[10px] font-body">Autonomous • Transparent • Fraud-resistant</p>
      </div>
    </div>
  )
}

// ── Coin Row in table ──
function CoinRow({ coin, onClick, isSelected }) {
  return (
    <tr
      onClick={() => onClick(coin)}
      className={`border-b border-gold-500/10 cursor-pointer transition-colors duration-150 ${
        isSelected ? 'bg-gold-500/[0.07]' : 'hover:bg-navy-800/40'
      }`}
    >
      <td className="px-4 py-3 text-slate-500 text-xs font-display w-10">{coin.rank ?? '—'}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          {coin.image ? (
            <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-navy-700 border border-gold-500/20" />
          )}
          <div>
            <p className="text-white text-xs font-semibold font-body">{coin.name}</p>
            <p className="text-slate-600 text-[10px] font-display">{coin.symbol}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <p className="text-gold-400 text-xs font-semibold font-display">{fmt(coin.current_price)}</p>
      </td>
      <td className="px-4 py-3 text-right">
        <PriceChange value={coin.price_change_24h} />
      </td>
      <td className="px-4 py-3 text-right text-slate-400 text-xs font-body hidden md:table-cell">
        {fmt(coin.market_cap)}
      </td>
      <td className="px-4 py-3 text-right text-slate-500 text-xs font-body hidden lg:table-cell">
        {fmt(coin.volume_24h)}
      </td>
    </tr>
  )
}

// ── Coin Detail Panel ──
function CoinDetail({ coin, onClose }) {
  if (!coin) return null

  return (
    <Card className="p-6 sticky top-24">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          {coin.image ? (
            <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full border border-gold-500/30" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-navy-700 border border-gold-500/20 flex items-center justify-center">
              <span className="font-display text-gold-500 text-xs">{coin.symbol?.[0]}</span>
            </div>
          )}
          <div>
            <h4 className="font-display text-white font-bold text-sm">{coin.name}</h4>
            <span className="text-slate-500 text-[10px] font-display">{coin.symbol}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-600 hover:text-gold-400 transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Price */}
      <div className="mb-5">
        <p className="font-display text-gold-400 text-2xl font-black">{fmt(coin.current_price)}</p>
        <div className="flex items-center gap-2 mt-1">
          <PriceChange value={coin.price_change_24h} />
          <span className="text-slate-600 text-[10px]">24h</span>
        </div>
      </div>

      <Separator className="mb-4 opacity-30" />

      {/* Stats */}
      <div className="flex flex-col gap-3 mb-5">
        {[
          { label: 'Market Cap',         value: fmt(coin.market_cap) },
          { label: '24h Volume',          value: fmt(coin.volume_24h) },
          { label: '24h High',            value: fmt(coin.high_24h) },
          { label: '24h Low',             value: fmt(coin.low_24h) },
          { label: 'Circulating Supply',  value: fmtSupply(coin.circulating_supply) },
          { label: 'Total Supply',        value: fmtSupply(coin.total_supply) },
          { label: 'All Time High',       value: fmt(coin.ath) },
          { label: 'CMC Rank',            value: coin.rank ? `#${coin.rank}` : '—' },
        ].map(item => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-slate-500 text-xs font-body">{item.label}</span>
            <span className="text-white text-xs font-semibold font-body">{item.value}</span>
          </div>
        ))}
      </div>

      {/* vs QBT comparison */}
      {!coin.isQBT && coin.current_price != null && (
        <>
          <Separator className="mb-4 opacity-30" />
          <div className="rounded-lg bg-navy-950/60 border border-gold-500/20 p-4">
            <p className="font-display text-gold-500/70 text-[9px] tracking-widest mb-3">VS QBT ($5.00)</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-xs">{coin.symbol} price</span>
              <span className="text-white text-xs font-semibold">{fmt(coin.current_price)}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-400 text-xs">QBT price</span>
              <span className="text-gold-400 text-xs font-semibold">$5.00</span>
            </div>
            <div className="h-px bg-gold-500/20 mb-3" />
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs">Ratio ({coin.symbol}/QBT)</span>
              <span className="text-gold-400 text-xs font-bold">
                {(coin.current_price / 5.00).toFixed(4)}x
              </span>
            </div>
          </div>
        </>
      )}

      {/* Exchange tickers */}
      {coin.tickers?.length > 0 && (
        <>
          <Separator className="my-4 opacity-30" />
          <p className="font-display text-slate-500 text-[9px] tracking-widest mb-3">EXCHANGE PRICES</p>
          <div className="flex flex-col gap-2">
            {coin.tickers.map((t, i) => (
              <div key={i} className="flex justify-between items-center rounded bg-navy-900/50 px-3 py-1.5">
                <span className="text-slate-400 text-[11px] font-body truncate max-w-[120px]">{t.exchange}</span>
                <span className="text-gold-400/80 text-[11px] font-semibold font-body">{fmt(t.price)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  )
}

// ── Main Page ──
export default function MarketPage() {
  const [topCoins, setTopCoins]         = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [coinDetail, setCoinDetail]     = useState(null)
  const [query, setQuery]               = useState('')
  const [loading, setLoading]           = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [refreshing, setRefreshing]     = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef(null)
  const debounceRef = useRef(null)

  // Fetch top coins on mount
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

  // Debounced search
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

  // Fetch coin detail
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

  // Click outside closes dropdown
  useEffect(() => {
    const handler = (e) => { if (!searchRef.current?.contains(e.target)) setShowDropdown(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayCoins = query && searchResults.length > 0 ? [] : topCoins

  return (
    <main className="min-h-screen bg-navy-950 pt-[90px] pb-20">
      {/* Background */}
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
              Live crypto prices • Compare with QBT • Real-time market data
            </p>
          </div>

          {/* Refresh */}
          <button
            onClick={fetchTopCoins}
            className="flex items-center gap-2 text-slate-500 hover:text-gold-400 text-xs font-display tracking-wider transition-colors self-start md:self-auto"
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            REFRESH
          </button>
        </div>

        {/* Search bar */}
        <div className="mb-8" ref={searchRef}>
          <div className="relative max-w-xl">
            <div className="relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/60" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
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

            {/* Search dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-gold-500/25 bg-navy-900/98 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                {searchResults.map(coin => (
                  <button
                    key={coin.id}
                    onClick={() => handleSelectCoin(coin)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-navy-800/60 transition-colors text-left border-b border-gold-500/10 last:border-0"
                  >
                    {coin.image
                      ? <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" />
                      : <div className="w-7 h-7 rounded-full bg-navy-700 border border-gold-500/20" />
                    }
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

          {/* Quick select QBT */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-slate-600 text-[10px] font-display tracking-wider">QUICK:</span>
            <button
              onClick={() => handleSelectCoin(QBT_DATA)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-[10px] font-display tracking-wider hover:bg-gold-500/20 transition-colors"
            >
              <div className="w-3.5 h-3.5 rounded-full overflow-hidden">
                <Image src="/logo.jpeg" alt="QBT" width={14} height={14} className="object-cover" />
              </div>
              QBT
            </button>
            {['bitcoin', 'ethereum', 'binancecoin'].map(id => {
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

        {/* Main content grid */}
        <div className="grid xl:grid-cols-[1fr_340px] gap-6">

          {/* Left — Table + QBT card */}
          <div className="flex flex-col gap-6">

            {/* QBT Featured Card */}
            <QBTCard />

            {/* Market Table */}
            <Card className="overflow-hidden p-0">
              <div className="px-6 py-4 border-b border-gold-500/15 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-white font-bold text-sm tracking-wide">
                    Top Cryptocurrencies
                  </h2>
                  <p className="text-slate-600 text-[10px] font-body mt-0.5">Live market data via CoinGecko</p>
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
                      {displayCoins.map(coin => (
                        <CoinRow
                          key={coin.id}
                          coin={coin}
                          onClick={handleSelectCoin}
                          isSelected={selectedCoin?.id === coin.id}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>

          {/* Right — Detail panel */}
          <div>
            {detailLoading ? (
              <Card className="p-6">
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div className="w-6 h-6 border-2 border-gold-500/40 border-t-gold-500 rounded-full animate-spin" />
                  <p className="text-slate-600 text-xs font-display tracking-wider">LOADING...</p>
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
                    <p className="font-display text-white text-sm font-bold mb-1">Select a Coin</p>
                    <p className="text-slate-600 text-xs font-body leading-relaxed">
                      Click any coin from the table or search above to see detailed market data and QBT comparison.
                    </p>
                  </div>
                  <button
                    onClick={() => handleSelectCoin(QBT_DATA)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-display tracking-wider hover:bg-gold-500/20 transition-colors"
                  >
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image src="/logo.jpeg" alt="QBT" width={16} height={16} className="object-cover" />
                    </div>
                    VIEW QBT DETAILS
                  </button>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-700 text-[10px] font-body mt-10">
          Market data provided by CoinGecko API • Prices update every 60 seconds • QBT data is indicative only
        </p>
      </div>
    </main>
  )
}
