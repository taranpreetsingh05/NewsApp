import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem.js";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_GNEWS_API_KEY;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    setError(null);
    setLoading(true);
    setPage(1);

    const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=us&max=${props.pageSize}&page=1&apikey=${API_KEY}`;

    try {
      let data = await fetch(url);
      props.setProgress(30);

      if (!data.ok) {
        if (data.status === 429) {
          setError("Rate limit reached. Please try again in a few minutes.");
        } else {
          setError(`Failed to load news (error ${data.status}).`);
        }
        setArticles([]);
        setLoading(false);
        props.setProgress(100);
        return;
      }

      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalArticles || 0);
      setLoading(false);
      props.setProgress(100);
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setArticles([]);
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]);

  const fetchMoreData = async () => {
    if (loading || error) return;

    setLoading(true);
    const nextPage = page + 1;
    const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=us&max=${props.pageSize}&page=${nextPage}&apikey=${API_KEY}`;

    try {
      let data = await fetch(url);
      console.log("Status:", data.status);
console.log("URL:", url);

      if (!data.ok) {
        setError(
          data.status === 429
            ? "Rate limit reached. Showing what we have for now."
            : `Failed to load more news (error ${data.status}).`
        );
        setLoading(false);
        return;
      }

      let parsedData = await data.json();
console.log(parsedData);
      if (!parsedData.articles || parsedData.articles.length === 0) {
        setLoading(false);
        return;
      }

      setPage(nextPage);
      setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
      setTotalResults(parsedData.totalArticles || 0);
      setLoading(false);
    } catch (err) {
      setError("Network error while loading more articles.");
      setLoading(false);
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center">
        NewsMonkey-Top {capitalizeFirstLetter(props.category)}
        <br />
        headlines
      </h1>

      {error && (
        <div className="alert alert-warning text-center" role="alert">
          {error}
        </div>
      )}

      {!error && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < Math.min(totalResults, 100)}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((ele) => {
                return (
                  <div className="col md-4" key={ele.url}>
                    <NewsItem
                      title={ele.title ? ele.title.slice(0, 34) : ""}
                      description={
                        ele.description ? ele.description.slice(0, 70) : ""
                      }
                      imageUrl={ele.image}
                      newsUrl={ele.url}
                      
                      date={ele.publishedAt}
                      source={ele.source?.name || "Unknown"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;