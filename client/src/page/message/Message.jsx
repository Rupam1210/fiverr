/* eslint-disable no-unused-vars */
 import { Link, useParams } from 'react-router-dom'
import './Message.scss'
import newRequest from '../../util/Newrequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Message = () => {
  const {id}=useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentuser"));
  const queryClient = useQueryClient();
 
  const {isLoading,error,data}=useQuery({
    queryKey:["message"],
    queryFn:()=>
      newRequest.get(`/message/${id}`).then((res)=>{
        
        return res.data;
      })
    })
    const mutation = useMutation({
      mutationFn: (message) => {
        return newRequest.post(`/message`,message);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["message"]);
      },
    });
    const handlesubmit=(e)=>{
      e.preventDefault();
      mutation.mutate({
        conversationId:id,
        desc:e.target[0].value
      });
      e.target[0].value="";
    }
  return (
    <div className="message">
      <div className="container">
        <span><Link className='link' to="/messages">Messages</Link> / John Doe /</span>
      
       {isLoading?"loading":error?"error":
        <div className="messages">
          {data.map((c)=>(
             <div key={c._id} className={c.userId === currentUser._id?"owner item":"item" } >
             <img
                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                 alt=""
               />
               <p>  {c.desc}</p>
             </div>
          ))
           
           }

        </div>}
        <hr/>
        <form className="write" onSubmit={handlesubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type='submit' >Send</button>
        </form>

      </div>
    </div>
  )
}

export default Message