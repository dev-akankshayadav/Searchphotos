import React, { useState, useEffect } from "react";
import "./Searchbar.css";
import { FaSistrix } from "react-icons/fa";
import Images from "../images/Images";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loading/Loading";
import BackToTop from "../backtotop/BackToTop";

const BASE_URL = "https://api.unsplash.com/search/photos";
const CLIENT_ID = "cxOZSauZjSmd67Otq2Y0A72mYProapFu-teIPnGNSfA";

const Searchbar = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const pageLimit = 10;

  async function fetchAPI() {
    if (page === 1) {
      setIsLoading(isLoading);
    }
    const res = await fetch(
      `${BASE_URL}?page=${page}&query=${text}&client_id=${CLIENT_ID}&limit=${pageLimit}`
    );
    console.log(res);
    const data = await res.json();
    if (page === 1) {
      setImages(data.results);
      setLoadMore(!loadMore);
    } else {
      setImages((prevImages) => [...prevImages, ...data.results]);
    }
    setIsLoading(!isLoading);
  }

  useEffect(() => {
    fetchAPI(); // eslint-disable-next-line
  }, [page, text]);

  const debounce = (func, d) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, d);
    };
  };

  function handleInputChange(e) {
    setText(e.target.value);
  }

  const optimizedsearch = debounce(handleKeyDown, 1000);

  function handleSubmit() {
    if (page === 1) {
      fetchAPI();
    } else {
      setPage(1);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  const markLoadMore = () => {
    setLoadMore(true);
  };
  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // const refresh = () => {
  //   setPage(0);
  // };
  return (
    <>
      <div className="container">
        <h1 className="heading">Unsplash Images</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Type to search images"
            name="searchbox"
            value={text}
            onChange={handleInputChange}
            onKeyDown={optimizedsearch}
          />
          <button type="button" disabled={!text} onClick={handleSubmit}>
            <span>
              <FaSistrix />
            </span>
          </button>
        </div>
      </div>

      <InfiniteScroll
        className="img-container"
        dataLength={images.length}
        next={fetchMore}
        hasMore={loadMore}
        loader={text.length > 0 ? <Loading /> : null}
        endMessage={
          !loadMore ? (
            <button className="loadMore" onClick={markLoadMore}>
              Load More...
            </button>
          ) : (
            <p>This is end of feed</p>
          )
        }
      >
        <Images images={images} />
      </InfiniteScroll>
      <BackToTop />
    </>
  );
};

export default Searchbar;
