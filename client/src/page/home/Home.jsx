/* eslint-disable react/no-unescaped-entities */
import Featured from "../../component/featured/Featured"
import Slide from "../../component/slide/Slide"
import { cards, projects } from "../../data"
import Catcard from '../../component/catcard/Catcard'
import './Home.scss'
import Projectcard from "../../component/projectcard/Projectcard"

const Home = () => {
  

  return (
    <>
    <div className="home">
      <Featured/>
      <Slide slidesToShow={5} arrowsScroll={5}>
      {cards.map((card) => (
          <Catcard key={card.id} card={card} />
        ))}
      </Slide>
   
    <div className="features">
        <div className="container">
          <div className="item">
            <h1> The best part? Everything.</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Protected payments, every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className="item">
            <video src="./img/video.mp4" controls />
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
        <div className="item" >
            <h1>
              liverr <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore Liverr Business</button>
          </div>

          <div className="item" style={{alignItems:"center",justifyContent:"center"}}>
             
            <img style={{width:"80%"}} src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_800,dpr_1.0/v1/attachments/generic_asset/asset/51c35c7cecf75e6a5a0110d27909a2f5-1690202609364/EN.png" alt="" />
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={3}>
        {projects.map((card) => (
          
          <Projectcard key={card.id} card={card} />
        ))}
      </Slide>
      </div>
    </>
  )
}

export default Home