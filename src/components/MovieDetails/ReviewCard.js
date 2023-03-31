import React from 'react'
import "./ReviewCard.css"
const ReviewCard = ({author,authorInfo,comment,published}) => {
    //console.log(authorInfo)
    let httpsCheck = authorInfo && authorInfo.avatar_path && authorInfo.avatar_path.startsWith("/https");
  return (
    <div className='container'>
        <div className='wrapper'>
            <div className='img_container'>
            <img className='avatar_img' src={httpsCheck ? authorInfo.avatar_path.replace(/^\/+/g, ''):"https://www.allnumis.com/media/users/profiles/default/50.png"} alt="" />
            </div>
            <p className='author'>Author: {author}</p>
            <p className='comment'>{comment}</p>
            <p className='published_year'>Published Year: {published.slice(0,10)}</p>
        </div>
    </div>
  )
}

export default ReviewCard