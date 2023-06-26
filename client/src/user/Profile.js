import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import UserMenu from '../components/Layout/UserMenu'
import { useAuth } from '../context/Auth'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
  const[auth,setauth]=useAuth()
  const[name,setname]=useState()
  const[email,setemail]=useState()
  const[phone,setphone]=useState()
  const[address,setaddress]=useState()
  const[password,setpassword]=useState()
  


    
   ///get user data
   useEffect(() => {
    const{email,name,phone,address}=auth?.user
    setname(name)
    setemail(email)
    setphone(phone)
    setaddress(address)
   
  }, [auth?.user])
  const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
          const {data}=await axios.put(`http://localhost:8080/api/v1/auth/profile`,{
              name:name,
              email:email,
              password:password,
              phone:phone,
              address:address,
            
          })
          if (data?.errro) {
            toast.error(data?.error);
          } else {
            setauth({ ...auth, user: data?.updateduser });
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);
            ls.user = data.updateduser;
            localStorage.setItem("auth", JSON.stringify(ls));
            toast.success("Profile Updated Successfully");
          }}
          catch(err){
            console.log(err)
            toast.error("something went wrong")
          }
        }

  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
<div className="row">
        <div className='col-md-3'><UserMenu/></div>
        <div className='col-md-9'>
        <div className='container'>
          <h4>Your Profile</h4>
  <form onSubmit={handleSubmit} > 
<div className="mb-3">
    
    <input type="text" value={name}  name="name" onChange={(e)=>setname(e.target.value)} required className="form-control" id="exampleInputname" aria-describedby="emailHelp"  placeholder='Enter your Name'/>

  </div>
  <div className="mb-3">
    <input type="email"  value={email}  name="email" onChange={(e)=>setaddress(e.target.value)}  disabled required className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"   placeholder='Enter your Email'/>

  </div>
  <div className="mb-3">

    <input type="password"  value={password}  name="password" onChange={(e)=>setpassword(e.target.value)}  required className="form-control" id="exampleInputPassword"   placeholder='Password'/>
  </div>
  <div className="mb-3">
    
    <input type="text"  value={phone} name="phone" onChange={(e)=>setphone(e.target.value)}  required className="form-control" id="exampleInputphone" aria-describedby="emailHelp"    placeholder='Phone No'/>
</div>
<div className="mb-3">
    
    <input type="text"  value={address}  name="address" onChange={(e)=>setaddress(e.target.value)}  required className="form-control" id="exampleInputaddress" aria-describedby="emailHelp"  placeholder='Address' />
</div>

  
  <button type="submit" className="btn btn-primary">Update Profile</button>
</form>


              </div>
            </div>
        
        </div>
        </div>

    </Layout>
    
  )
}

export default Profile