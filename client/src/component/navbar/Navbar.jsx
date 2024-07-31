import { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../util/Newrequest'
// import { Link } from 'react-router-dom'

const Navbar = () => {
    const [active,setactive]=useState(false)
    const [open,setopen]=useState(false)
    const {pathname}=useLocation()

    const isActive = () => {
        window.scrollY > 0 ? setactive(true) : setactive(false);
      };
    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
          window.removeEventListener("scroll", isActive);
        };
      }, []);
      const currentUser =  JSON.parse(localStorage.getItem("currentuser"));
      const navigate = useNavigate();
      const handlelougout=async()=>{
        try {
          await newRequest.post("/auth/logout")
          localStorage.setItem("currentuser",null);
          navigate("/")
          
        } catch (error) {
          console.log(error)
        }
      }
       
  return (
    <>
    <div className={active ||pathname!=='/'? "navbar active":"navbar"}>
        <div className="container">
            <div className="logo">
               <Link className='link' to={'/'}>
                <span className='text'>Fiverr</span>
                </Link>
                <span className='dot'>.</span>
            </div>
            <div className="links">
            <Link className='link' to={'/'}><span>Fiverr Business</span></Link>
            <Link className='link' to={'/'}> <span>Explore</span></Link>
            <Link className='link' to={'/'}> <span>English</span></Link>
         
         {!currentUser?.isSeller&& <Link className='link' to={'/'}> <span>Become a Seller</span></Link>}
         {currentUser ?
         (<>
            <div className="user" onClick={()=>setopen(!open)}>
                <img src={currentUser?.img?currentUser.img:"https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                alt="" />
                <span>{currentUser?.username}</span>
                {open && <div className="options">
                    {currentUser.isSeller && 
                    <>
                    <Link className='link' to={'/mygig'}><span>Gigs</span></Link>
                    <Link className='link' to={'/add'}> <span>Add new Gig</span></Link>
                    
                    </>}
                    <Link className='link' to={'/orders'}> <span>Orders</span></Link>
                    <Link className='link' to={'messages/'}> <span>Messages</span></Link>
                    <Link className='link'  onClick={handlelougout}> <span>Logout</span></Link>
                </div> }
            </div>
         </>):
         (  <>
            <Link className='link' to={'/login'}> <span>Sign in</span></Link>
            <Link className='link' to={'/register'}> <button>join</button></Link>
            </>)}
         
            </div>
        </div>
       {(active || pathname!=='/') &&
       <> <hr/>
        <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div><hr/></>
          }
    </div>
    </>
  )
}

export default Navbar