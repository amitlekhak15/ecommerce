import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [inputs,setinputs]=useState({name:"",
    email:"",
    password:"",
    phone:"",
    address:"",
    answer:""
})
const navigate=useNavigate()
const handleChange=(e)=>{setinputs((prevstate)=>({
    ...prevstate,[e.target.name]:e.target.value

      

}))}
const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
        const res=await axios.post(`http://localhost:8080/api/v1/auth/register`,{
            name:inputs.name,
            email:inputs.email,
            password:inputs.password,
            phone:inputs.phone,
            address:inputs.address,
            answer:inputs.answer
        })
        if(res.data.success){
            toast.success(res.data.message)
            navigate("/login")
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
        <div className="register">
            

<form onSubmit={handleSubmit} className='form' > 
<h1>Registeration</h1>
<div class="icon">
        <i class="fas fa-user-circle"></i>
      </div>
<div className="formcontainer">
  <div className='container'>
  <input type="text" value={inputs.name}  name="name" onChange={handleChange} required className="form-control" id="exampleInputname" aria-describedby="emailHelp"  placeholder='Enter your Name'/>
  <input type="email"  value={inputs.email}  name="email" onChange={handleChange}  required className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"   placeholder='Enter your Email'/>
  <input type="password"  value={inputs.password}  name="password" onChange={handleChange}  required className="form-control" id="exampleInputPassword"   placeholder='Password'/>
  <input type="text"  value={inputs.phone} name="phone" onChange={handleChange}   required className="form-control" id="exampleInputphone" aria-describedby="emailHelp"    placeholder='Phone No'/>
  <input type="text"  value={inputs.address}  name="address" onChange={handleChange}  required className="form-control" id="exampleInputaddress" aria-describedby="emailHelp"  placeholder='Address' />
  <input type="text"  value={inputs.answer}  name="answer" onChange={handleChange}  required className="form-control" id="exampleInputaddress" aria-describedby="emailHelp"  placeholder='What is your favurite sports' />
  </div>
<button type="submit" className="btn btn-primary">Submit</button>
</div>
</form>
</div>




    </Layout>
    
  )
}

export default Register