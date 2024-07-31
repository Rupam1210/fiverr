/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import './gigcard.scss'
import newRequest from '../../util/Newrequest';
import { useQuery } from '@tanstack/react-query';
 

// eslint-disable-next-line no-unused-vars
const Gigcard = ({item}) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
          newRequest.get(`/user/${item.userId}`).then((res) => {
            return res.data;
          }),
      });
      
  return (
    <Link className='link' to={`/gig/${item._id} `}>
    <div className="gigcard">
        <img src={item.cover} alt="" />
        <div className="info">

           {isLoading?("loading"):error?("something went wrong"): 
           <div className="user">
                <img src={data?.img||"/img/man.png"} alt="" />
                <span>{data?.username}</span>
            </div>}
            <p>{item.desc}</p>
            <div className="star">
                <img src="/img/star.png" alt="" />
                <span>
                {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}</span>
            </div>
        </div>
        <hr/>
        <div className="detail">
            <img src="/img/heart.png" alt="" />
            <div className="price">
                <span>STARTING AT</span>
                <h2>${item.price}
                    <sup>99</sup>

                </h2>
            </div>
        </div>

    </div>
    </Link>
  )
}

export default Gigcard