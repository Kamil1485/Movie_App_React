import React, { useState, useEffect } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";
const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ mediaType, id }) => {

  const [credits, setCredits] = useState([]);
  const [crews, setCrews] = useState([]);
  const carousel = credits.map((credit) => (
    <div className="carousel__container">
      <p className="character">
        {credit.character
          ? credit.character.replace("(voice)", "").split("/")[0]
          : "Not found"}
      </p>
      <div className="carouselItem">
        <img
          className="carouselItem__img"
          src={
            credit.profile_path
              ? `https://image.tmdb.org/t/p/w500/${credit.profile_path}`
              : credit.gender === 1
              ? "https://www.milieu.be/wp-content/uploads/2020/01/no-woman-1.jpg"
              : credit.gender===2 ? "https://www.scottsdirectories.com/wp-content/uploads/2017/10/default.jpg":"https://static.ticimax.cloud/40009/uploads/urunresimleri/buyuk/cinsiyet-soru-isareti-siyah-28-cm-0338ec.jpg"
          }
          alt={credit?.name}
          onDragStart={handleDragStart}
        />
        <h2 className="carouselItem__title">{credit?.name}</h2>
      </div>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${"bf7b9eabb49e072d0c8f00d1a5542e14"}&language=en-US`
    );
    //console.log(data);
    setCredits(data.cast);
    setCrews(data.crew);
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, [id]);
  //console.log(credits);
  console.log(credits)
  return (
    <div>
   
   <div className="director_container">
   <p>Director:</p>
   {crews.map((item,index)=>(
      <div key={index} className="director">
        {item.department==="Directing" && item.original_name+","}
      </div>
    ))}
   </div>
   <div className="actor_container">
    <p>Actors:</p>
    {credits.slice(0,8).map((credit,index)=>(
      <span key={index} className="actors">{index<credits.length-1? credit?.name+",":credits?.name}
      </span>
    ))}
   </div>
      <div>
        <AliceCarousel
          mouseTracking
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={carousel}
        />
      </div>
    </div>
  );
};

export default Gallery;
