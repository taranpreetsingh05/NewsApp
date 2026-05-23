import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem.js";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props)=>{
 const [articles,setArticles]= useState([])
 const [loading,setLoading]= useState(true)
 const [page,setPage]= useState(1)
 const [totalResults,setTotalResults]= useState(0)
 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // constructor(props) {
  //   super(props);//parent is component and to use 'this.xyz' u have to inherit the methods of the parent
    
  //   //document.title = `${this.capitalizeFirstLetter(props.category)}-NewsMonkey`;
  // }

  const updateNews=async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ce618c2f5bed4b9c8d09db3ab30a10ba&page=${page}&pageSize=${props.pageSize}`;
   setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles || [])
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
  },[])
  
   const handleNext = async () => {
    setPage(page + 1)
    updateNews();
  };
   const handlePrev = async () => {
    setPage(page-1)
    updateNews();
  };
 const fetchMoreData = async () => {
  if (loading) return;

  setLoading(true);

  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
setPage(page+1)
  let data = await fetch(url);
  let parsedData = await data.json();

  // IMPORTANT FIX
  if (!parsedData.articles || parsedData.articles.length === 0) {
    setLoading(false);
    return;
  }

  setPage(nextPage);
  setArticles((prevArticles) =>
    prevArticles.concat(parsedData.articles)
  );
  setTotalResults(parsedData.totalResults);
  setLoading(false);
};
    return (
      <div className="container my-3">
        <h1 className="text-center">
          NewsMonkey-Top {capitalizeFirstLetter(props.category)}
           <br></br>headlines
        </h1>
        {/* {loading && <Spinner />} */}
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
                      imageUrl={ele.urlToImage}
                      newsUrl={ele.url}
                      author={ele.author}
                      date={ele.publishedAt}
                      source={ele.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrev}
          >
            &laquo; previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            {" "}
            next &raquo;{" "}
          </button>
        </div> */}
      </div>
    );
  
}
News.defaultProps = {//if parent does not pass any props then these will be used as default
    country: "us",
    pageSize: 8,
    category: "general",
  };
  News.propTypes = {//it defines the data type of the input of the prop to be expexted 
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
export default News;
//hello hi 