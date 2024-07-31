import './feature.scss'

const Featured = () => {
  return (
    <>
    <div className="feature">
        <div className="container">
            <div className="left">
                <h1>Find the perfect freelance services for your buisness</h1>
                <div className="search">
                    <div className="searchinput">
                        <img src="./img/search.png" alt="" />
                    <input type="text"  placeholder='Try Building mobile app'/>
                    </div>
                    <button>Search</button>
                    
                    
                </div>
                <div className="popular">
                        <span>Popular:</span>
                        <button>Web Design</button>
                        <button>Word Press</button>
                        <button>Logo Design</button>
                        <button>AI Service</button>
                    </div>
            </div>
            <div className="right">
                <img src="./img/man.png" alt="" />
            </div>
        </div>
    </div>
    <div className="trust">
        <div className="container">
            <span>TrustedBy:</span>
            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png" alt="" />
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png" alt="" />
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png" alt="" />
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png" alt="" />
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png" alt="" />
        </div>
    </div>
    </>
  )
}

export default Featured