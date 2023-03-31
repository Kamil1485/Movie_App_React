import React, { useState, useEffect,useContext} from "react";
import axios from "axios";
import SingleCard from "../Trending/SingleCard";
import Loading from "../../Loading/Loading";
import Pagination from "../../Pagination/Pagination";
import Genres from "../../Genres/Genres";
import UseGenre from "../../../Hooks/UseGenre";
import { LoadingContext } from "../../../App";
const Series = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const {loading,setLoading}=useContext(LoadingContext)
  const genreUrl = UseGenre(selectedGenres);
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=bf7b9eabb49e072d0c8f00d1a5542e14&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genreUrl}`
    );
    setNumOfPages(data.total_pages);
    setSeries(data.results);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, genreUrl]);

  //console.log(series)
  return loading ? (
    <Loading />
  ) : (
    <div className="card">
      <div>
        <Genres
          setPage={setPage}
          type={"tv"}
          genres={genres}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      </div>
      <div className="trending">
        {series &&
          series.map((movie) => (
            <div className="wrapper" key={movie.id}>
              <SingleCard
                vote={movie.vote_average}
                img={movie.poster_path}
                name={movie.name ? movie.name : movie.original_title}
                mediaType="tv"
                mediaId={movie.id}
                release={
                  movie.release_date ? movie.release_date : movie.first_air_date
                }
              />
            </div>
          ))}
      </div>
      <div className="pagination">
        <Pagination
          page={page}
          numOfPages={numOfPages}
          loading={loading}
          setPage={setPage}
          setLoading={setLoading}
          mediaType={"series"}
        />
      </div>
    </div>
  );
};

export default Series;
