/* eslint-disable no-unused-vars */
 
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../util/Newrequest";
 
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentuser"));
  const queryClient = useQueryClient();
  
const {isLoading,error,data}=useQuery({
  queryKey:["conversations"],
  queryFn:()=>(
    newRequest.get(`/conversation`).then((res)=>{
       
      return res.data;
    })
  )


})
const mutation = useMutation({
  mutationFn: (id) => {
    return newRequest.put(`/conversation/${id}`);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["conversations"]);
  },
});

const handleRead = (id) => {
  mutation.mutate(id);
};
 
 
  

  return (
    <div className="messages">
    {isLoading?"Loading":error?"Error":
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tbody>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
         {data.map((c)=>(
         

          <tr key={c.id} className={
            
            ((currentUser.isSeller && !c.readBySeller) ||
            (!currentUser.isSeller && !c.readByBuyer)) &&
          "active"
          }  >
            <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
            <td>
              <Link to={`/message/${c.id}`} className="link">
                {c?.lastMessage?.substring(0,100) }...
              </Link>
            </td>
            <td>{moment(c.updatedAt).fromNow()}</td>
            <td>
            {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
            </td>
          </tr>))}
           
           </tbody>
        </table>
      </div>}
    </div>
  );
};

export default Messages;