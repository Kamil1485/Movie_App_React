import React, { useState,useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Loading from "../Loading/Loading";
import { LoadingContext } from "../../App";
const Navbar = () => {
  const [Mobile, setMobile] = useState(false);
  const [activePage, setActivePage] = useState("Trending");
  const{loading,setLoading}=useContext(LoadingContext);

  const handleActivePage = (type) => {//tüm sayfa yükleme işlemleri  default:400ms içinde gerceklesiyor 
   setLoading(true)
    setActivePage(type);
    setTimeout(() => {
      setLoading(false)
    }, (500));
  }


  return (
    <>
    <nav className="navbar">
      <Link to="/"><img className="logo" src={"/images/logo.png"} alt="Logo" /></Link>
        <ul
          className={Mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          <Link to="/"  onClick={()=>handleActivePage("Trending")}>
            <li className={activePage === "Trending" ? "activeLink" : ""} >Trending</li>
          </Link>
          <Link  to="/movies"  onClick={()=>handleActivePage("Movies")}>
            <li className={activePage === "Movies" ? "activeLink" : ""} >Movies</li>
          </Link>
          <Link to="/series"  onClick={()=>handleActivePage("Series")} >
            <li className={activePage === "Series" ? "activeLink" : ""}>Series</li>
          </Link>
          <Link to="/search" onClick={()=>handleActivePage("Search")}>
            <li className={activePage === "Search" ? "activeLink" : ""}>Search</li>
          </Link>
        </ul>

        <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    
    </>
  );
};
export default Navbar;
