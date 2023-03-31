const UseGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
    return selectedGenres.map((genre) => genre.id).reduce((acc, curr) => acc + "," + curr);
  };
  
  export default UseGenre;