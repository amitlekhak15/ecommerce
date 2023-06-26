import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-toastify';


const Users = () => {
  const[user,setusers]=useState([])
  useEffect(() => {
    getallusers()
  }, [])
  
  const getallusers=async()=>{
    try{
      const {data}=await axios.get(`http://localhost:8080/api/v1/auth/allusers`)
      setusers(data?.users)

    }catch(err){
      console.log(err)
    }
  }
  //deleteuser
  const handledelete=async(id)=>{
    try{
      const{data}=await axios.delete(`http://localhost:8080/api/v1/auth/deleteuser/${id}`)
      if(data.success){
        toast.success(`user is deleted`)
        
        getallusers()
      }
      else{
        toast.err(data.message)
      }
  
    }catch(err){
      console.error(err)
        toast.error("somethong went wrong ")
    }
  }
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
      <div className='row'>
      <div className='col-md-3'>
        <AdminMenu/>
        
        </div>
        <div className='col-md-9'> 
        <h2>All users</h2>
        <table className="table ">
  <thead className='thead-dark'>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Email</th>

      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    
      {user.map(c=>(
        <> 
        <tr>
        <td key={c._id}>{c.name}</td>
        <td key={c._id}>{c.email}</td>
        
        <td><button className='btn btn-danger ms-2' onClick={()=>{handledelete(c._id)} }>Delete</button></td>
        </tr>
        </>
      

      ))}
    
  </tbody>
</table>

        </div>
      </div>
      </div>



    </Layout>
    
  )
}

export default Users