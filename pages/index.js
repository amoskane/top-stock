import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import News from './news';

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
        params: {
          trend_type: 'GAINERS',
          country: 'us',
          language: 'en'
        },
        headers: {
          'X-RapidAPI-Key': '0400ba954bmshc50b5f7c9681c1dp192547jsn8d988983d08e',
          'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        const sorted = response.data.data.trends.sort((a, b) => b.change_percent - a.change_percent)
        const topTen = sorted.slice(0, 5)
        setData(topTen)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, []);

  const [data, setData] = useState();

  const formUrl = (symbol) => {
    const parts = symbol.split(':');
    return `https://www.tradingview.com/symbols/${parts[0]}/?exchange=${parts[1]}`
  }

  return (
    <div className="container">
      <Head>
        <title>Top 5 Movers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Top 5 Movers" />
        <ul>
          {data && data.map(stock => {
            return (
              <>
                <li key={stock.symbol}><a href={formUrl(stock.symbol)}>{stock.name}</a>, {stock.change_percent}%</li>
                {stock?.symbol && <News stockTicker={stock.symbol} />}
              </>
            )
          })}
        </ul>
      </main>

      <Footer />
    </div>
  )
}

export default Home
