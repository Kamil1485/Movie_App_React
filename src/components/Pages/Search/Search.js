import React, { useState, useEffect, useContext } from "react";
import "./Search.css";
import axios from "axios";
import SingleCard from "../Trending/SingleCard";
import Pagination from "../../Pagination/Pagination";
import Loading from "../../Loading/Loading";
import { GrSearch } from "react-icons/gr";
import { CgPlayListSearch } from "react-icons/cg";
import { LoadingContext } from "../../../App";

const Search = () => {
  const [type, setType] = useState("movie");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [showError, setShowError] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext);
  const [movieFilter, setMovieFilter] = useState(
    () =>
      JSON.parse(localStorage.getItem("movieFilter")) || {
        release_date: "",
        language: "",
        vote_average: null,
        searchedData: "",
      }
  );
  useEffect(() => {
    localStorage.setItem("movieFilter", JSON.stringify(movieFilter));
  }, [movieFilter]);
  // console.log(movieFilter.language);
  // console.log(searched)
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type === "movie" ? "movie" : "tv"
        }?api_key=bf7b9eabb49e072d0c8f00d1a5542e14&language=${
          movieFilter.language
        }&query=${
          movieFilter.searchedData
        }&page=${page}&include_adult=false&primary_release_year=${
          movieFilter.release_date
        }`
      );
      setSearched(data.results);
      setNumOfPages(data.total_pages);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText === "") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1000);
    } else {
      fetchSearch();
      setLoading((prevLoading) => prevLoading);
    }
  };
  //console.log(searched);
  //console.log(movieFilter);
  //console.log(searched)
  return loading ? (
    <Loading />
  ) : (
    <div className="search_container">
      <div className="search_div">
        <form
          className="search_form"
          onSubmit={(e) => {
            handleSearch(e);
          }}
        >
          <input
            className="search_input"
            placeholder="Search"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="submit"
            onClick={() =>
              setMovieFilter({ ...movieFilter, searchedData: searchText })
            }
            className="search_btn"
          >
            {<GrSearch />}
          </button>
          {showError && (
            <div className="error_message">Please enter a search.</div>
          )}
        </form>
      </div>
      <div>
        <h2>Filter By</h2>
        <div className="filter-container">
          <span>Release Date:</span>
          <select
            onClick={(e) =>
              setMovieFilter({ ...movieFilter, release_date: e.target.value })
            }
          >
            <option value="">
              {movieFilter.release_date ? movieFilter.release_date : "All"}
            </option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
          <span>Langugage:</span>
          <select
            onClick={(e) =>
              setMovieFilter({ ...movieFilter, language: e.target.value })
            }
          >
            <option value="">
              {movieFilter.language
                ? movieFilter.language.slice(3, movieFilter.language.length)
                : "All"}
            </option>
            <option value="tr-Turkey">Turkey</option>
            <option value="en-United States">United States</option>
            <option value="en-Canada">Canada</option>
            <option value="de-Germany">Germany</option>
            <option value="it-Italy">Italy</option>
            <option value="es-Spain">Spain</option>
            <option value="fr-France">France</option>
            <option value="ja-Japan">Japan</option>
            <option value="zh-China">China</option>
          </select>
          <button className="filter_btn" onClick={(e) => handleSearch(e)}>
            <CgPlayListSearch />
          </button>
          <span>Imdb</span>
          <select
            onClick={(e) =>
              setMovieFilter({ ...movieFilter, vote_average: e.target.value })
            }
          >
            <option value="">
              {movieFilter.vote_average
                ? movieFilter.vote_average + " and above"
                : "All"}
            </option>
            <option value="9">9 and above</option>
            <option value="8">8 and above</option>
            <option value="7">7 and above</option>
            <option value="6">6 and above</option>
            <option value="5">5 and above</option>
            <option value="4">4 and above</option>
            <option value="3">3 and above</option>
            <option value="2">2 and above</option>
            <option value="1">1 and above</option>
          </select>
        </div>
        <div className="search_btns">
          <button
            className={`search_movie ${type === "movie" && "active"}`}
            onClick={() => setType("movie")}
          >
            Search Movies
          </button>
          <button
            className={`search_tv ${type === "tv" && "active"}`}
            onClick={() => setType("tv")}
          >
            Search Tv Series
          </button>
        </div>
        <div className="search_results">
          <div className="trending">
            {searched &&
              searched.map((movie) => (
                <div className="wrapper" key={movie.id}>
                  {movie.poster_path && (
                    <SingleCard
                      vote={movie.vote_average}
                      img={movie.poster_path}
                      name={movie.name ? movie.name : movie.title}
                      mediaType={type}
                      mediaId={movie.id}
                      release={
                        movie.release_date
                          ? movie.release_date
                          : movie.first_air_date
                      }
                      voteAverage={movieFilter.vote_average}
                    />
                  )}
                </div>
              ))}
          </div>

          {searched.length > 0 && (
            <div className="pagination">
              <Pagination
                page={page}
                numOfPages={numOfPages}
                setPage={setPage}
                setLoading={setLoading}
                mediaType={"search"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
