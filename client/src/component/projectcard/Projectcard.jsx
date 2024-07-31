/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

import './projectcard.scss'

const Projectcard = ({card}) => {
     
  return (
    <>
    <Link className="link" to='/'>
    <div className="projectcat">
         <img src={card.img} alt="" />
          <div className="info">
            <img src={card.pp} alt="" />
            <div className="text">
                    <h2>{card.cat}</h2>
                <span>{card.username}</span>
            </div>
          </div>
    </div>
    </Link>
    </>
  )
}

export default Projectcard