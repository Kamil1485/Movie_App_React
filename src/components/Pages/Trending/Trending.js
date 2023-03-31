import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import SingleCard from "./SingleCard";
import "./Trending.css";
import Pagination from "../../Pagination/Pagination";
import Loading from "../../Loading/Loading";
import { LoadingContext } from "../../../App";

//TMDB sitesine giriş yap ve Api Key al.
const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const[numOfPages,setNumOfPages]=useState()
  const {loading,setLoading}=useContext(LoadingContext)
  
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=bf7b9eabb49e072d0c8f00d1a5542e14&page=${page}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages)
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
console.log(loading)
  useEffect(() => {
    fetchTrending();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return loading ? (
    <Loading />
  ) : (
    <div className="card">
      <div className="trending">
        {content &&
          content.map((movie) => (
            <div className="wrapper" key={movie.id}>
              <SingleCard
                vote={movie.vote_average}
                img={movie.poster_path}
                name={movie.name ? movie.name : movie.original_title}
                mediaType={movie.media_type}
                release={
                  movie.release_date ? movie.release_date : movie.first_air_date
                }
                mediaId={movie.id}
              />
            </div>
          ))}
      </div>
      <div className="pagination">
        <Pagination
          page={page}
          loading={loading}
          setPage={setPage}
          setLoading={setLoading}
          numOfPages={numOfPages}
          mediaType={""}
        />
      </div>
    </div>
  );
};

export default Trending;
