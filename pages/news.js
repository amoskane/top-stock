import React, {useEffect, useState} from 'react'
const axios = require('axios');


const News = ({ stockTicker }) => {
  useEffect(() => {
    const fetchData = async () => {

    const options = {
      method: 'GET',
      url: 'https://real-time-finance-data.p.rapidapi.com/stock-news',
      params: {
        symbol: stockTicker,
        language: 'en'
      },
      headers: {
        'X-RapidAPI-Key': '0400ba954bmshc50b5f7c9681c1dp192547jsn8d988983d08e',
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.data.news);
      setNews(response.data.data.news)
    } catch (error) {
      console.error(error);
    }
  }
  fetchData()
  }, [stockTicker]);

  const [news, setNews] = useState();

  return (
    <ul>
      {news && news.map(article => {
        return (
          <li><a href={article.article_url}>{article.article_title}</a> {article.post_time_utc}, {article.source}</li>
        )
      })}
    </ul>
  )
}

export default News