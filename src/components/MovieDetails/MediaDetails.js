import React, { useState, useEffect,useContext} from "react";
import axios from "axios";
import {BsArrowReturnLeft} from "react-icons/bs"
import {useParams} from "react-router-dom";
import ReactPlayer from 'react-player'
import Gallery from "../Carousel/Carousel";
import "./MediaDetails.css"
import SingleCard from "../../components/Pages/Trending/SingleCard";
import ReviewCard from "./ReviewCard";
import Loading from "../Loading/Loading";
import {LoadingContext} from "../../App";
const MediaDetails = (props) => {

 const [media, setMedia] = useState();
 const [videoUrl, setVideoUrl] = useState();
 const[recommendations,setRecommendations]=useState([]);
 const[reviews,setReviews]=useState([]);
 const {id}=useParams();//movieId
const {loading,setLoading}=useContext(LoadingContext);
console.log(loading)
 const fetchData = async () => {
  setLoading(true);
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${props.mediaType}/${id}?api_key=${"bf7b9eabb49e072d0c8f00d1a5542e14"}&language=en-US`
  );
  setMedia(data);
  setTimeout(() => {
    setLoading(false);
  }, 250);
};


const fetchRecomment = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${props.mediaType}/${id}/recommendations?api_key=${"bf7b9eabb49e072d0c8f00d1a5542e14"}&language=en-US`
  );
//console.log(data)
setRecommendations(data.results)
};

const fetchVideo = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${props.mediaType}/${id}/videos?api_key=${"bf7b9eabb49e072d0c8f00d1a5542e14"}&language=en-US`
  );
  console.log(data)
  if (data.results.length > 0) {
    const videoId = data.results[0]?.key;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    setVideoUrl(embedUrl);
  }
  else{
    setVideoUrl("");
  }
};

const fetchReviews = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${props.mediaType}/${id}/reviews?api_key=${"bf7b9eabb49e072d0c8f00d1a5542e14"}&language=en-US`
  );
  //console.log(data)
  setReviews(data.results);
};

const  handleBack =()=> {
  window.history.back();
  setLoading(true);
}

useEffect(() => {
  fetchData();
  fetchVideo();
  fetchRecomment();
  fetchReviews();
  
  // eslint-disable-next-line
}, [id]);
console.log(videoUrl)
//console.log(media)
  return (
   loading ? <Loading/>: media &&<div className="details_container">
   <button className="back_btn" type="button" onClick={handleBack}>
    <BsArrowReturnLeft/>
   </button>
   <div>
    <h2 className="detailsItem_title">{media.name ? media.name : media.original_title}</h2>
   </div>
   <div className="detailsItem">
   <div className="detailsItem_post">
   <div className="detailsItem_img_container">
   <img className="detailsItem_img" src={`https://image.tmdb.org/t/p/w400${media.poster_path}`} alt="" />
   </div>
   <div className="detailsItem_trailer">
    <div className="player"><ReactPlayer style={{marginTop:"5px"}} height={"500px"} controls={true}  url={videoUrl!==undefined?videoUrl :"asdasd"} 
     /></div> </div>
     </div>
     <div className="title_container">
     <p className="detailsItem_overview">{media.overview}</p>
     </div>
     <div className="detailsItem_credits">
   <div className="detailsItem_credits_actors">
   <Gallery mediaType={props.mediaType} id={media.id}/>
   </div>
   <div>
     <p className="release_date">Relase-Date:{ media.release_date ? media.release_date:media.first_air_date }</p>
     <p className="categories">Categories:{media.genres.map((genre,index)=>(<span key={index} className="categories"> {index<media.genres.length-1 ? genre.name+",":genre.name}</span>))}</p>

     <p className="ımdb">Imdb:{media.vote_average.toFixed(1)}</p>

     <p className="language">Language:{media.spoken_languages.map((language,index)=>(<span key={index}>{index<media.spoken_languages.length-1 ? language.name+",":language.name}</span>))}</p>

     <p className="country">Country:{media.production_countries.map((country,index)=>(<span key={index}>{index<media.production_countries.length-1 ? country.name+",":country.name}</span>))}</p>
    
   <h1> Recomandations</h1>
   <div className="recommendations_container">
     {recommendations && recommendations.slice(0,4)?.map((movie) => (
          movie.poster_path && <div className="wrapper" key={movie.id}>
           <div className="recommendations_card">
           <SingleCard 
             vote={movie.vote_average}
             img={movie.poster_path}
             name={movie.name ? movie.name : movie.original_title}
             mediaType={props.mediaType}
             release={
               movie.release_date ? movie.release_date : movie.first_air_date
             }
             mediaId={movie.id}
           />
           </div>
           </div>
       ))}
   </div>

<h2>Reviews</h2>
   <div className="reviews_container">
     {reviews.map((review,index)=>(
       <ReviewCard key={index} author={review.author} authorInfo={review.author_details} comment={review.content} published={review.created_at} />
     ))}

   </div>

   </div>
     </div>
  
   </div>
 </div>
  );
};

export default MediaDetails;
