import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'

const Spinner = () => {
    const[count,setCount]=useState(5)
   
    const navigate=useNavigate()
    const location=useLocation()

    useEffect(() => {
      const intervel=setInterval(()=>{
        setCount((prevValue)=>--prevValue)
      },1000)
      count===0 &&navigate("/login",{  
        state:location.pathname, 
      })
      return ()=>clearInterval(intervel)
    }, [count,navigate,location])
    
  return (
    <div><div className="d-flex justify-content-center">
       <h1 className='text-center'>
            redirecting you in {count} seconds
        </h1> 
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div></div>
  )
}

export default Spinner