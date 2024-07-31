/* eslint-disable no-unused-vars */
 import './app.scss'
import Navbar from './component/navbar/Navbar'
 
 
 import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './page/home/Home'
import Footer from './component/footer/Footer'
import Orders from './page/orders/Orders'
import Message from './page/message/Message'
import Messages from './page/messages/Messages'
import Gig from './page/gig/Gig'
import Mygigs from './page/myGigs/Mygigs'
import Add from './page/add/Add'
import Gigs from './page/gigs/Gigs'
 
 
import Login from './page/login/Login'
import { Register } from './page/register/Register'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"; 
import Pay from './page/pay/pay'

function App() { 
  const queryClient = new QueryClient();
  return (
    <>
    <Router>
    <QueryClientProvider client={queryClient}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/message/:id' element={<Message/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/gig/:id' element={<Gig/>}/>
        <Route path='/gigs' element={<Gigs/>}/>
        <Route path='/mygig' element={<Mygigs/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/pay/:id' element={<Pay/>}/>
      </Routes>
      <Footer/>
      </QueryClientProvider>
    </Router>
     
      
    </>
  )
}

export default App
