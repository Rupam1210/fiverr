/* eslint-disable no-unused-vars */
 
import {  useQuery } from "@tanstack/react-query";
import "./Order.scss"
import newRequest from "../../util/Newrequest";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const currentUser =  JSON.parse(localStorage.getItem("currentuser"));
  const navigate = useNavigate();
  const {isLoading,error,data}=useQuery({
    queryKey:["orders"],
    queryFn:()=>
      newRequest.get(`/orders/`).then((res)=>{
       
        return res.data;
        
      })
  })
  const handlecontact=async(order)=>{
    const sellerId=order.sellerId;
    const buyerId=order.buyerId;
    const id=sellerId+buyerId;
    try {
      const res=await newRequest.get(`/conversation/single/${id}`)
      navigate(`/message/${res.data.id}`)
      
    } catch (error) {
      if(error.response.status===404){
        const res=await newRequest.post(`/conversation/`,{
          to:currentUser.seller?buyerId:sellerId,
        });
        navigate(`/message/${res.data.id}`)
      }
    }

  }
  
  return (
    <div className="order">
   {isLoading?("loading"):error?("error"):
    <div className="container">
      <div className="title">
        <h1>Orders</h1>
         
      </div>
      <table>
        <tbody>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          {/* {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>} */}
          <th>Contact</th>
        </tr>
        
         { data.map((order)=>(
          <tr key={order._id}>
          <td>
             <img
               className="image"
               src= {order.img}
               alt=""
             />
           </td>
           <td>{order.title}</td>
           <td>{order.price}</td>
            
           <td>
             <img className="delete" src="./img/message.png" alt="" onClick={()=>handlecontact(order)} />
           </td>
           </tr>
         ))}
       
       </tbody>
      </table>
    </div>}
  </div>
  )
}

export default Orders