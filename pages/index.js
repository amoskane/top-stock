import React, { useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

const Home = () => {
  useEffect(async () => {
    const options = {
      method: 'GET',
      url: 'https://real-time-finance-data.p.rapidapi.com/search',
      params: {
        query: 'Apple',
        language: 'en'
      },
      headers: {
        'X-RapidAPI-Key': '0400ba954bmshc50b5f7c9681c1dp192547jsn8d988983d08e',
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data)
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [data, setData] = useState();

  return (
    <div className="container">
      <Head>
        <title>News For Stock A</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          {data}
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default Home
