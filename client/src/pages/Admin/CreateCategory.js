import React,{useEffect,useState}from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoriesForm from '../../components/Form/CategoriesForm';

import{Modal} from "antd"


const CreateCategory = () => {
  
  const [categories,setcategories]=useState([])
  const [name,setname]=useState("")
  const[visible,setVisible]=useState(false)
  const[selected,setSelected]=useState(null)
  const[updatedName,setupdatedName]=useState("")
  //create new category
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const{data}=await  axios.post(`http://localhost:8080/api/v1/category/create-category`,{name}
       )
      if(data?.success){
        toast.success(`${name} is created`)
        getallcategories()
  
      }
      else{
        toast.error(data.message)

      }

    }catch(err){
      console.log(err)
      toast.error("something went wrong with input form ")

    }

  }
  //getallcategories
  const getallcategories=async(req,res)=>{
    try{
      const {data}=await axios.get(`http://localhost:8080/api/v1/category/category`)
      if(data.success){
        setcategories(data.category)
      }


    }catch(err){
      console.error(err)
      toast.error("somethong went wrong in getting categories")

    }
  
}
useEffect(() => {
 
  getallcategories()
}, [])
//update all categories
const handleupdatesubmit=async(e)=>{
  e.preventDefault()
  try{
    const{data}=await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,{name:updatedName})
    if(data.success){
      toast.success(data.message)
      setSelected(null)
      setupdatedName("")
      setVisible(false)
      getallcategories()
    }
    else{
      toast.err(data.message)
    }

  }catch(err){
    console.error(err)
      toast.error("somethong went wrong ")
  }
}
//delete categories
const handledelete=async(id)=>{
  try{
    const{data}=await axios.delete(`http://localhost:8080/api/v1/category/delete/${id}`)
    if(data.success){
      toast.success(`category is deleted`)
      
      getallcategories()
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
          <h2>Manage Category</h2>
          <div className='p-3 m-3'>
            <CategoriesForm handleSubmit={handleSubmit} value={name} setValue={setname}/>
          </div>
          <div>

          <table className="table ">
  <thead className='thead-dark'>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    
      {categories.map(c=>(
        <> 
        <tr>
        <td key={c._id}>{c.name}</td>
        <td><button className='btn btn-primary ms-2' onClick={()=>{setVisible(true); setupdatedName(c.name); setSelected(c)}}>Edit</button></td>
        <td><button className='btn btn-danger ms-2' onClick={()=>{handledelete(c._id)}}>Delete</button></td>
        </tr>
        </>
      

      ))}
    
  </tbody>
</table>


          </div>
          <Modal onCancel={()=>setVisible(false)}
           footer={null}
           visible={visible}>
       <CategoriesForm value={updatedName} setValue={setupdatedName} handleSubmit={handleupdatesubmit}/>
          </Modal>
          </div>


        </div>
        </div>
 

    </Layout>
    
  )
}

export default CreateCategory