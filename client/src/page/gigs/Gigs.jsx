/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import Gigcard from '../../component/gigcard/Gigcard'

import './Gigs.scss'
import {  useQuery } from '@tanstack/react-query'
import newRequest from '../../util/Newrequest'
import { useLocation } from 'react-router-dom'
 

const Gigs = () => {
    const[open,setopen]=useState("")
    const [sort, setSort] = useState("sales");
    const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();
    
    const { isLoading, error, data, refetch }=useQuery({
        queryKey:["gigs"],
        queryFn:()=>
        newRequest.get(`/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`)
        .then((res)=>{
            return res.data
        })
    })
    
    useEffect(()=>{
        refetch();
    },[sort])
     const apply=()=>{
        refetch();
     }
    const reSort = (type) => {
        setSort(type);
        setopen(false);
      };
    
  return (
    
    <div className="gigs">
        <div className="container">
            <span>Liverr  Graphics & Design</span>
            <h1>AI Artist</h1>
            <p>Explore the boundaries of art and technology with Livers AI artists</p>
            <div className="badge">
                <div className="budget">
                    <span>Budget</span>
                    <input type="number" placeholder='min' ref={minRef} />
                    <input type="number" placeholder='max'  ref={maxRef}/>
                    <button onClick={apply}>Apply</button>
                </div>
                <div className="sort">
                    <span>Sort By</span>
                    <span className="sortType">
                     {sort === "sales" ? "Best Selling" : "Newest"}
                    </span>
                    <img src="/img/down.png" onClick={()=>setopen(!open)} alt="" />
                    {open && (<div className="rightmenu">
                    {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
        
                            )
                    }
                </div>
            </div>
            
            <div className="cards" >
                {isLoading?"loading":error?"Something went wrong": data.map((gig)=>(
                    <Gigcard key={gig._id} item={gig}/>
                ))}
            </div>
        </div>
    </div>
    
  )
}

export default Gigs