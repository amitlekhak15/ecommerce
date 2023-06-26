import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
    const [inputs,setinputs]=useState({
        email:"",
        answer:"",
        newpassword:"",
        
        
    })
    
    const navigate=useNavigate()
   
    const handleChange=(e)=>{setinputs((prevstate)=>({
        ...prevstate,[e.target.name]:e.target.value
        
    
          
    
    }))}
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post(`http://localhost:8080/api/v1/auth/forgotpassword`,{
                email:inputs.email,
                answer:inputs.answer,

                newpassword:inputs.newpassword,
            
                
                
            })
            if(res.data.success){
                console.log(inputs)
                
                navigate( "/login")
            }
            else{
                toast.error(res.data.message)
            }
    
        }catch(error){
            console.log(inputs)
            console.log(error)
            toast.error("Something went wrong")
        }
    
    
    }
    
    
      return (
        <Layout title="Reset-Ecommerce App">
            <div className="register">
                <h1>Reset-password</h1>
    
    <form onSubmit={handleSubmit}> 
      <div className="mb-3">
        <input type="email"  value={inputs.email}  name="email" onChange={handleChange}  required className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"   placeholder='Enter your Email'/>
    
      </div>
      
      <div className="mb-3">
        <input type="text"  value={inputs.answer}  name="answer" onChange={handleChange}  required className="form-control" id="exampleInput" aria-describedby="emailHelp"   placeholder='Which is your favurite sports'/>
    
      </div>
      <div className="mb-3">
    
        <input type="password"  value={inputs.newpassword}  name="newpassword" onChange={handleChange}  required className="form-control" id="exampleInputPassword"   placeholder='NewPassword'/>
      </div>
      
    
    
   
      <button type="submit" className="btn btn-primary">set</button>
    </form>
    
    </div>
    
        </Layout>
        
      )
}

export default Forgetpassword