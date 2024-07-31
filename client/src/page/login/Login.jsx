 import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import newRequest from '../../util/Newrequest';
 

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            const res=await newRequest.post("/auth/login",{username,password});
            localStorage.setItem("currentuser",JSON.stringify(res.data))
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="login">
        <form onSubmit={handlesubmit}>
            <h1>Sign in</h1>
            <label htmlFor="">Username</label>
            <input type="text"  placeholder="john" name="username" onChange={(e)=>setUsername(e.target.value)}/>
            <label htmlFor="">Password</label>
            <input type="password" name='password'onChange={(e)=>setPassword(e.target.value)} />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login