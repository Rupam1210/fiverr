import { useState } from 'react';
import newRequest from '../../util/Newrequest';
import './Resgister.scss'
import upload from '../../util/Upload';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });
  const navigate =useNavigate();
  const handleseller=(e)=>{
    setUser((prev) => {
        return{...prev,isSeller:e.target.checked};
    })
  }
  const handlechange=(e)=>{
    setUser((prev)=>{
        return{...prev,[e.target.name]:e.target.value}
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const url= await upload(file)

    try {
        await newRequest.post("/auth/register",{...user,img:url});
navigate("/") 
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="register">
        <form onSubmit={handleSubmit}>
            <div className="left">
                <h1>Create an Account</h1>
                <label htmlFor="">Username</label>
                <input type="text" placeholder='johns' name='username' onChange={handlechange}/>
                <label htmlFor="">email</label>
                <input type="email" placeholder='email' name='email'onChange={handlechange}/>
                <label htmlFor="">password</label>
                <input type="password"  name="password"onChange={handlechange}/>
                <label htmlFor="">Profile Picture</label>
                <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
                <label htmlFor="">Country</label>
                <input type="text" placeholder='Usa' name='country' onChange={handlechange}/>
                <button type='submit'>Submit</button>
            </div>
            <div className="right">
                <h1>I want to Become a Seller</h1>
                <div className="toggle">
                    <label >Activate the seller Account</label>
                    <label className='switch'>
                        <input type="checkbox" onChange={handleseller} />
                        <span className='slider round'></span>
                    </label>
                </div>
                <label htmlFor="">Phone Number</label>
                <input type="phone" name="phone" placeholder='+234356' onChange={handlechange}/>
                <label htmlFor="">Description</label>
                <textarea name="desc"  cols="30" rows="10" placeholder='A short description of yourself' onChange={handlechange}></textarea>
            </div>
        </form>
    </div>
  )
}
