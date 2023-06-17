import React, { useState } from 'react'
import NewsItem from './NewsItem'
import Spinners from './Spinners'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import useNewsAPI from './useNewsAPI';


const News = (props) => {
    const [page, setPage] = useState(1)


    const { articles,loading,totalResults } = useNewsAPI(`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=1ff30a3ce59f4046bf184e534b26701e&page=${page}`);

    
    const fetchMoreData = async () => {
            setPage(page + 1)
    }

    return (
        <>
            <h1 className="text-center mb-3" >Todays... Top Headlines</h1>
            {loading && <Spinners />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinners />}
            >
                <div className="container my-2">
                    <div className="row">{
                        articles.map((element) => {
                            return <div className="col-md-3 mb-4" key={element.url}>
                                <NewsItem title={element.title?.slice(0, 70)} description={element.description?.slice(0, 120)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} />
                            </div>
                        })
                    }
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 12,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News


// https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=1ff30a3ce59f4046bf184e534b26701e&page=1