import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import { useNavigate,useLocation } from 'react-router-dom';


const Login = () => {
    const [inputs,setinputs]=useState({
    email:"",
    password:"",
    
})
const [auth,setAuth]=useAuth()
const navigate=useNavigate()
const location=useLocation()
const handleChange=(e)=>{setinputs((prevstate)=>({
    ...prevstate,[e.target.name]:e.target.value

      

}))}
const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
        const res=await axios.post(`http://localhost:8080/api/v1/auth/login`,{
            email:inputs.email,
            password:inputs.password,
            
        })
        if(res.data.success){
            toast.success(res.data.message)
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
            })
            localStorage.setItem("auth",JSON.stringify(res.data))
            navigate(location.state || "/")
        }
        else{
            toast.error(res.data.message)
        }

    }catch(error){
        console.log(error)
        toast.error("Something went wrong")
    }


}


  return (
    <Layout title="Register-Ecommerce App">
      <div className="register ">
      <form onSubmit={handleSubmit} className='form'> 
            <h1>Login</h1>
        
        <div class="icon">
        <i class="fas fa-user-circle"></i>
      </div>
  <div className="formcontainer">
  <div class="container">
    <input type="email"  value={inputs.email}  name="email" onChange={handleChange}  required className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"   placeholder='Enter your Email'/>
    <input type="password"  value={inputs.password}  name="password" onChange={handleChange}  required className="form-control" id="exampleInputPassword"   placeholder='Password'/>
  </div>
  
  <div className=" btn-class">
 <button type="submit" className='btn btn-primary button' >Login</button> 
  <button type="button " className='psw btn btn-primary' onClick={()=>{
    navigate("/forgetpassword")}}>forgetpassword</button>
  
  </div>  
  </div>
</form>      
</div>  
  
  

        


    </Layout>
    
  )
}

export default Login