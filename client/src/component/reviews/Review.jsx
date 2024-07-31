/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
 import { useQuery } from "@tanstack/react-query"
import "./reviews.scss"
import newRequest from "../../util/Newrequest"

const Review = ({review}) => {
  const userId=review?.userId;
   
  const {isLoading,error,data}=useQuery({
    queryKey:[userId],
    queryFn:()=>
      newRequest.get(`/user/${userId}`)
      .then((res)=>{
         
        return res.data;
      }),
      
    
  })
   
  
  
   
  return (
    <>
    <div className="review">
      {isLoading?"Loading":error?"error": <div className="user">
       <img
           src={data.img ||"https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"}
        />
        <div className="info">
          <span>{data.username}</span>
          <div className="country">
          
            <span> {data.country}</span>
          </div>
        </div>
      </div>}
      <div className="star">
      {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
      
        <span>{review.star}</span>
      </div>
      <p>
      {review.desc}
      </p>
      <div className="help">
        <span>HelpFul?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
    <hr/>
    </>
    
  )
}

export default Review