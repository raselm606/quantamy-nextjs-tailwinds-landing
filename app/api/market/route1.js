import { NextResponse } from 'next/server'

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'

// CoinGecko free API এর জন্য header দরকার
const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'QuantumyICO/1.0',
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query  = searchParams.get('query') || ''
  const coinId = searchParams.get('coinId') || ''

  try {
    // ── Single coin detail fetch ──
    if (coinId) {
      const res = await fetch(
        `${COINGECKO_BASE}/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false`,
        { headers: HEADERS, next: { revalidate: 60 } }
      )

      if (res.status === 429) {
        return NextResponse.json({ error: 'Rate limit hit. Please wait a moment.' }, { status: 429 })
      }
      if (!res.ok) return NextResponse.json({ error: 'Coin not found' }, { status: 404 })

      const data = await res.json()

      return NextResponse.json({
        id:               data.id,
        name:             data.name,
        symbol:           data.symbol?.toUpperCase(),
        image:            data.image?.large,
        current_price:    data.market_data?.current_price?.usd,
        market_cap:       data.market_data?.market_cap?.usd,
        volume_24h:       data.market_data?.total_volume?.usd,
        price_change_24h: data.market_data?.price_change_percentage_24h,
        high_24h:         data.market_data?.high_24h?.usd,
        low_24h:          data.market_data?.low_24h?.usd,
        circulating_supply: data.market_data?.circulating_supply,
        total_supply:     data.market_data?.total_supply,
        ath:              data.market_data?.ath?.usd,
        rank:             data.market_cap_rank,
        tickers: data.tickers?.slice(0, 6).map(t => ({
          exchange: t.market?.name,
          price:    t.converted_last?.usd,
          volume:   t.converted_volume?.usd,
        })) || [],
      })
    }

    // ── Search coins list ──
    if (query) {
      const res = await fetch(
        `${COINGECKO_BASE}/search?query=${encodeURIComponent(query)}`,
        { headers: HEADERS, next: { revalidate: 300 } }
      )

      if (res.status === 429) {
        return NextResponse.json({ error: 'Rate limit hit. Please wait a moment.' }, { status: 429 })
      }
      if (!res.ok) return NextResponse.json({ error: 'Search failed' }, { status: 500 })

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

    // ── Default: top 20 coins ──
    const res = await fetch(
      `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`,
      { headers: HEADERS, next: { revalidate: 60 } }
    )

    if (res.status === 429) {
      return NextResponse.json({ error: 'Rate limit hit. Please wait a moment.' }, { status: 429 })
    }
    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch market' }, { status: 500 })

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
