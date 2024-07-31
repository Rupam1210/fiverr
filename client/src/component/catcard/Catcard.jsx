/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

 import './catcard.scss'

const Catcard = ({card}) => {
  return (
    <>
    <Link to='/gigs'>
    <div className="cat">
         <img src={card.img} alt="" />
         <span className="desc">{card.desc}</span>
         <span className="title">{card.title}</span>
    </div>
    </Link>
    </>
  )
}

export default Catcard