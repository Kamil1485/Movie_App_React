import React, { useEffect } from "react";
import axios from "axios";
import "./Genres.css";
import { TiDelete } from "react-icons/ti";
const Genres = ({
  setSelectedGenres,
  selectedGenres,
  genres,
  setGenres,
  type,
  setPage,
  setLoading,
}) => {
  //movie genres

  useEffect(() => {
    
    const storedGenres = JSON.parse(localStorage.getItem('selectedGenres'));
    const newGenres = JSON.parse(localStorage.getItem('genres'));
    console.log(newGenres);
    if (storedGenres) {
      setSelectedGenres(storedGenres);
    } 
    if (newGenres) {
      setGenres(newGenres);
    } 
  }, []);
  
  

//console.log(genres)

const handleAdd = (genre) => {
  const newSelectedGenres = [...selectedGenres, genre];
  const newGenres = [...genres].filter((customGenre) => customGenre.id !== genre.id);
  setSelectedGenres(newSelectedGenres);
  localStorage.setItem('selectedGenres', JSON.stringify(newSelectedGenres)); // kaydedilen türleri localStorage'a kaydet
  setGenres(newGenres);
  localStorage.setItem('genres', JSON.stringify(newGenres)); 
  setPage(1);
  setLoading(true);
};

const handleRemove = (genre) => {
  const newSelectedGenres = selectedGenres.filter((selected) => selected.id !== genre.id);
  const newGenres = [...genres, genre];
  setSelectedGenres(newSelectedGenres);
  localStorage.setItem('selectedGenres', JSON.stringify(newSelectedGenres)); // kaydedilen türleri localStorage'a kaydet
  setGenres(newGenres);
  localStorage.setItem('genres', JSON.stringify(newGenres)); 
  setPage(1);
  setLoading(true);
};

  
  
  
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=bf7b9eabb49e072d0c8f00d1a5542e14&language=en-US`
    );
        if(selectedGenres.length===0){
          setGenres(data.genres);
        }
  };

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  //console.log(genres)
  return (
    <div>
      <h2>Select Genres</h2>
      <div className="genres">

      {selectedGenres.map((genre) => (
  <div className="genre_container" key={genre.id}>
    {genre.name}{" "}
    <span onClick={() => handleRemove(genre)} className="remove_icon">
      {" "}
      {<TiDelete />}
    </span>
  </div>
))}

{genres.map((genre) => (
  <div
    onClick={() => handleAdd(genre)}
    className={`genre_container ${
      selectedGenres.find((selected) => selected.id === genre.id)
        ? "selected"
        : ""
    }`}
    key={genre.id}
  >
    <span> {genre.name}</span>
  </div>
))}
      </div>
    </div>
  );
};

export default Genres;
