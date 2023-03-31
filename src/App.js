import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.css";
import Trending from "./components/Pages/Trending/Trending";
import Movies from "./components/Pages/Movies/Movies";
import Series from "./components/Pages/Series/Series";
import Search from "./components/Pages/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import MediaDetails from "./components/MovieDetails/MediaDetails";
//import{lazy,Suspense} from "react";
//const Movies=lazy(()=>import("./components/Pages/Movies/Movies"))

export const LoadingContext = createContext();
function App() {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <BrowserRouter>
        <Navbar />
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route
              path="/movies/:id"
              element={<MediaDetails mediaType="movie" />}
            />
            <Route path="/series" element={<Series />} />
            <Route
              path="/series/:id"
              element={<MediaDetails mediaType="tv" />}
            />
            <Route path="/search" element={<Search />} />
            <Route
              path="/search:id"
              element={<MediaDetails mediaType="search" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </LoadingContext.Provider>
  );
}

export default App;
