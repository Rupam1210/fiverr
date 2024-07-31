/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
 import './pay.scss'
 import { loadStripe } from "@stripe/stripe-js";
 import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import newRequest from '../../util/Newrequest';
 const stripepromise= loadStripe("pk_test_51OLKg2SDN7HLrN5YQqE0hpeNJDkpdPNERbquuZAvN6u4m27OhPI6JR0uS1LZ2XJhht0oZTDWXJgt7kx9gK0HEJjK00qGMA4ibV");
 
const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(()=>{
    const makerequest=async()=>{
      try {
        const res= await newRequest.post(`/orders/create-payment-intent/${id}`)
         setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error)
      }
     }
     makerequest();
  },[])
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const { id } = useParams();
  return (
     <div className="pay">app
      <Elements options={options} stripe={stripepromise}>
        
      </Elements>
     </div>
  )
}

export default Pay