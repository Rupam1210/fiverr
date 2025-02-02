 
import { Link, useParams } from 'react-router-dom';
import './Gig.scss'
import { Slider } from "infinite-react-carousel/lib";
import newRequest from '../../util/Newrequest';
import { useQuery } from '@tanstack/react-query';
import Reviews from '../../component/Revieww/Reviews';
 
 
const Gig = () => {
    const {id}=useParams();
    const { isLoading, error, data } = useQuery({
      queryKey: ["gig"],
      queryFn: () =>
        newRequest.get(`/gigs/single/${id}`).then((res) => {
          return res.data;
        }),
    });
const userId=data?.userId;
const{
  isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
}=useQuery({
  queryKey:["user"],
  queryFn:()=>
    newRequest.get(`/user/${userId}`).then((res)=>{
      return res.data;
    }),
    enabled: !!userId,
  
})
 

  return (
    <div className="gig">
      {isLoading?("loading"):error?("something went wrong"): <div className="container">
        <div className="left">
        <span className="breadcrumbs">Liverr / Graphics & Design / </span>
        <h1>{data.title}</h1>
          {isLoadingUser?("loading"):errorUser?("some"):(<div className="user">
          <img src={data?.img||"/img/man.png"} alt="" />
            <span>{dataUser?.username}</span>
            { !isNaN(data.totalStars / data.starNumber)&& <div className="star">
              {Array(Math.round(data.totalStars / data.starNumber))
              .fill()
              .map((i)=>(
                <img src="/img/star.png" alt="" key={i} />
              ))}
                
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
             </div>}
          </div>)}
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
          {data?.images?.map((img,i)=>(
            <img src={img} key={i}/>
          ))}
             
          </Slider>
          <h2>About This Gig</h2>
          <p>
          {data.desc}
          </p>
          {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) :
          <div className="seller">
            <h2>About The seller</h2>
            <div className="user">
            <img src={data?.img||"/img/man.png"} alt="" />
              <div className="info">
                <span>{dataUser.username}</span>
                { !isNaN(data.totalStars / data.starNumber)&& <div className="star">
                  {Array(Math.round(data.totalStars / data.starNumber))
                  .fill()
                  .map((i)=>(
                    <img src="/img/star.png" alt="" key={i} />
                  ))}
                
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
             </div>}
                <button>Contact me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className='title'> From</span>
                  <span className='desc'> USA</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr/>
              <p>
              {dataUser.desc}
              </p>
            </div>
          </div>
           }
           
          <Reviews gigId={id}/>
          
        </div>
        <div className="right">
        <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
               <Link to={`/pay/${id}`}>
            <button>Continue</button>
            </Link>
            </div>
        </div>
      </div>}
    </div>
  )
}

export default Gig