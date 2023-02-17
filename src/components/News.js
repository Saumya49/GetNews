import React,{useEffect,useState}from "react";

import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  

  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(true)
  const[page,setPage]=useState(1)
  const[totalResult,setTotalResult]=useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  

const updateNews=async()=>{
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c0a075fff03a471681971b3f0ee3b265&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true)
  //this.setState({loading:true});
  let data = await fetch(url);
  props.setProgress(40);
  let parsedData = await data.json();
  props.setProgress(70);
  setArticles(parsedData.articles)
  setTotalResult(false)
  setLoading(false)
  
  props.setProgress(100);

}
useEffect(()=>{
  updateNews();
  // eslint-disable-next-line
},[])
  
  

//  const handlePrevClick = async () => {
//     setPage(page-1)
   
//     updateNews()
//   }

//   const handleNextClick = async () => {
//     setPage(page+1)
    
//      updateNews()
//   }

 const fetchMoreData=async()=>{
    //setPage(page+1)
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c0a075fff03a471681971b3f0ee3b265&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
  let data = await fetch(url);
  let parsedData = await data.json();
  setTotalResult(parsedData.totalResult)
  
  }


  
    return (
      <>
        <h1 className="text-center" style={{margin:'38px 0px',marginTop:'90px'}}>
          Get-News: Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
       

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResult}
          loader={<h4>Loading...</h4>}
          // loader={<Spinner/>}
        ><div className="container">

        
          <div className="row my-5">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
                 
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
         {/* <div className="conatainer d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
          // </div>  */}
      </>
    )
        
      }
      //export default News;
      News.defaultProps={
        country:'in',
        pageSize:8,
        category:'general',
      }


      News.propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
      }
      export default News;
