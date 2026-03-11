import { NextResponse } from 'next/server'

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'

const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'QuantumyICO/1.0',
}

const TARGET_EXCHANGES = [
  { key: 'binance',      label: 'Binance',       url: 'https://www.binance.com',     logo: '🟡' },
  { key: 'coinbase',     label: 'Coinbase',       url: 'https://www.coinbase.com',    logo: '🔵' },
  { key: 'crypto_com',   label: 'Crypto.com',     url: 'https://crypto.com',          logo: '🔷' },
  { key: 'pancakeswap',  label: 'PancakeSwap',    url: 'https://pancakeswap.finance', logo: '🥞' },
  { key: 'uniswap',      label: 'Uniswap v3',     url: 'https://app.uniswap.org',     logo: '🦄' },
  { key: 'trust_wallet', label: 'Trust Wallet',   url: 'https://trustwallet.com',     logo: '🛡️', isDex: true, dexSource: 'pancakeswap' },
  { key: 'metamask',     label: 'MetaMask',        url: 'https://metamask.io',         logo: '🦊', isDex: true, dexSource: 'uniswap' },
  { key: 'kraken',       label: 'Kraken',          url: 'https://www.kraken.com',      logo: '🐙' },
  { key: 'kucoin',       label: 'KuCoin',          url: 'https://www.kucoin.com',      logo: '🟢' },
  { key: 'bybit',        label: 'Bybit',            url: 'https://www.bybit.com',       logo: '⚫' },
]

function matchExchange(marketName = '') {
  const n = marketName.toLowerCase()
  if (n.includes('binance'))                           return 'binance'
  if (n.includes('coinbase'))                          return 'coinbase'
  if (n.includes('crypto.com') || n.includes('crypto_com')) return 'crypto_com'
  if (n.includes('pancakeswap'))                       return 'pancakeswap'
  if (n.includes('uniswap'))                           return 'uniswap'
  if (n.includes('kraken'))                            return 'kraken'
  if (n.includes('kucoin'))                            return 'kucoin'
  if (n.includes('bybit'))                             return 'bybit'
  return null
}

// QBT Quantum pricing formula approximation using real market data
function calcQBTPrice({ current_price, total_volume, market_cap, circulating_supply, total_supply, price_change_percentage_24h }) {
  try {
    const S   = total_supply        || 20_000_000
    const CS  = circulating_supply  || S
    const UR  = total_volume        || 0
    const D   = total_volume        || 0
    const HR  = 100                  // normalized
    const SC  = CS / S
    const change = price_change_percentage_24h || 0
    const MAF = change > 2 ? 1.1 : change < -2 ? 0.9 : 1.0
    const LF  = market_cap > 0 ? Math.min(total_volume / market_cap, 1) : 0.5
    const SI  = Math.max(-1, Math.min(1, change / 100))
    const VI  = Math.abs(change) / 100
    const UAM = Math.min((D / S) * 0.05, 1)

    const TP = (UR * (D / S) * HR * SC * MAF * LF * (1 + SI) * (1 - VI) * UAM) / S

    // Normalize — ratio relative to current price for display
    const ratio = TP > 0 ? (TP / current_price) : null

    return {
      formula_price: TP,
      ratio,
      inputs: { UR, D, S, HR: HR, SC: SC.toFixed(4), MAF, LF: LF.toFixed(4), SI: SI.toFixed(4), VI: VI.toFixed(4), UAM: UAM.toFixed(6) },
    }
  } catch {
    return null
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query  = searchParams.get('query')  || ''
  const coinId = searchParams.get('coinId') || ''

  try {

    // ── Single coin detail ──
    if (coinId) {
      const res = await fetch(
        `${COINGECKO_BASE}/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false`,
        { headers: HEADERS, next: { revalidate: 60 } }
      )
      if (res.status === 429) return NextResponse.json({ error: 'Rate limit. Please wait.' }, { status: 429 })
      if (!res.ok)            return NextResponse.json({ error: 'Coin not found' },           { status: 404 })

      const data = await res.json()
      const md   = data.market_data || {}

      // Build exchange map from tickers
      const exchangeMap = {}
      ;(data.tickers || []).forEach(t => {
        const key = matchExchange(t.market?.name)
        if (key && !exchangeMap[key]) {
          exchangeMap[key] = {
            price:  t.converted_last?.usd  ?? null,
            volume: t.converted_volume?.usd ?? null,
          }
        }
      })

      // Build exchanges array — Trust Wallet mirrors PancakeSwap, MetaMask mirrors Uniswap
      const exchanges = TARGET_EXCHANGES.map(ex => {
        if (ex.isDex) {
          const source = exchangeMap[ex.dexSource]
          return {
            key:       ex.key,
            label:     ex.label,
            url:       ex.url,
            logo:      ex.logo,
            isDex:     true,
            dexSource: ex.dexSource,
            price:     source?.price  ?? null,
            volume:    source?.volume ?? null,
            available: !!source?.price,
          }
        }
        return {
          key:      ex.key,
          label:    ex.label,
          url:      ex.url,
          logo:     ex.logo,
          price:    exchangeMap[ex.key]?.price  ?? null,
          volume:   exchangeMap[ex.key]?.volume ?? null,
          available: !!exchangeMap[ex.key],
        }
      })

      // On-chain data
      const totalSupply       = md.total_supply        ?? null
      const circulatingSupply = md.circulating_supply  ?? null
      const maxSupply         = md.max_supply           ?? null
      const currentPrice      = md.current_price?.usd  ?? null
      const marketCap         = md.market_cap?.usd      ?? null
      const totalVolume       = md.total_volume?.usd    ?? null

      const mintedPct     = totalSupply && maxSupply     ? ((totalSupply / maxSupply) * 100).toFixed(2)       : null
      const listedPct     = circulatingSupply && totalSupply ? ((circulatingSupply / totalSupply) * 100).toFixed(2) : null
      const liquidityEst  = totalVolume && marketCap     ? ((totalVolume / marketCap) * 100).toFixed(2)       : null

      // QBT algorithm applied to this coin
      const qbtCalc = calcQBTPrice({
        current_price:              currentPrice,
        total_volume:               totalVolume,
        market_cap:                 marketCap,
        circulating_supply:         circulatingSupply,
        total_supply:               totalSupply || circulatingSupply,
        price_change_percentage_24h: md.price_change_percentage_24h,
      })

      return NextResponse.json({
        id:               data.id,
        name:             data.name,
        symbol:           data.symbol?.toUpperCase(),
        image:            data.image?.large,
        current_price:    currentPrice,
        market_cap:       marketCap,
        volume_24h:       totalVolume,
        price_change_24h: md.price_change_percentage_24h,
        high_24h:         md.high_24h?.usd,
        low_24h:          md.low_24h?.usd,
        circulating_supply: circulatingSupply,
        total_supply:     totalSupply,
        max_supply:       maxSupply,
        ath:              md.ath?.usd,
        atl:              md.atl?.usd,
        rank:             data.market_cap_rank,
        // On-chain
        onchain: {
          total_supply:        totalSupply,
          circulating_supply:  circulatingSupply,
          max_supply:          maxSupply,
          minted_pct:          mintedPct,
          listed_pct:          listedPct,
          liquidity_ratio_pct: liquidityEst,
          market_cap:          marketCap,
          volume_24h:          totalVolume,
          fully_diluted_val:   md.fully_diluted_valuation?.usd ?? null,
        },
        // QBT algorithm result
        qbt_calc: qbtCalc,
        // Exchange comparison
        exchanges,
      })
    }

    // ── Search ──
    if (query) {
      const res = await fetch(
        `${COINGECKO_BASE}/search?query=${encodeURIComponent(query)}`,
        { headers: HEADERS, next: { revalidate: 300 } }
      )
      if (res.status === 429) return NextResponse.json({ error: 'Rate limit. Please wait.' }, { status: 429 })
      if (!res.ok)            return NextResponse.json({ error: 'Search failed' },             { status: 500 })
      const data = await res.json()
      return NextResponse.json(
        data.coins?.slice(0, 8).map(c => ({
          id:     c.id,
          name:   c.name,
          symbol: c.symbol?.toUpperCase(),
          image:  c.large,
          rank:   c.market_cap_rank,
        })) || []
      )
    }

    // ── Top 20 ──
    const res = await fetch(
      `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`,
      { headers: HEADERS, next: { revalidate: 60 } }
    )
    if (res.status === 429) return NextResponse.json({ error: 'Rate limit. Please wait.' }, { status: 429 })
    if (!res.ok)            return NextResponse.json({ error: 'Failed to fetch market' },   { status: 500 })
    const data = await res.json()
    return NextResponse.json(
      data.map(c => ({
        id:               c.id,
        name:             c.name,
        symbol:           c.symbol?.toUpperCase(),
        image:            c.image,
        current_price:    c.current_price,
        market_cap:       c.market_cap,
        volume_24h:       c.total_volume,
        price_change_24h: c.price_change_percentage_24h,
        rank:             c.market_cap_rank,
      }))
    )

  } catch (err) {
    console.error('Market API error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}