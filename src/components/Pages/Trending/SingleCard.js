import React from "react";
import "./SingleCard.css";
import { Link } from "react-router-dom";

const SingleCard = ({ vote,img, name,release,voteAverage,mediaType,mediaId}) => {
  return (
    <Link className="link activee" onClick={()=>window.scrollTo(0,0)} to={`/${mediaType==="tv"? "series":"movies"}/${mediaId}`}>
    <div  className={`singleCard ${ voteAverage!=="" && voteAverage>vote? "active_vote":""}`}>
      <div className="container" >
        <div className="wrapper">
        <span className={`vote ${vote.toFixed(1)>7 ?"high":(vote.toFixed(1)>5 &&vote.toFixed(1)<=7?"mid":"low")}`}>{vote.toFixed(1)}</span>
          <img className="wrapper__image" src={`https://image.tmdb.org/t/p/w300${img}`} alt="" />
          <p className="movie__name">{name}</p>
          <div className="movie__info">
            <span>{mediaType.charAt(0).toUpperCase() + mediaType.slice(1).toLowerCase()}</span><span>{release}</span>
          </div>
        </div>
      </div>
    </div>
</Link>

  );
};

export default SingleCard;
