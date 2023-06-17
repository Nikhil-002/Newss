import  { useEffect, useState } from 'react'
import axios from 'axios';

const useNewsAPI = (url) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0)

    const fetch = async () => {        
          setLoading(true);
          const response = await axios.get(url);  
          console.log("converting")
          const data = await response.data;
          console.log(data);
        setArticles(data.articles)
        setLoading(false);
        setTotalResults(data.totalResults)
    };


    const fetchMore = async () => {     
          const response = await axios.get(url);  
          console.log("converting")
          const data = await response.data;
          console.log(data);
        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
    };

    useEffect(() => {

        fetch(); // eslint-disable-next-line
      }, []);


    useEffect(() => {

        fetchMore(); // eslint-disable-next-line
      }, [url]);
    
      return {
        articles,
        loading,
        totalResults
      };
    };
export default useNewsAPI;