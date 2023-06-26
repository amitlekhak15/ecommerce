import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-toastify';
import {useState,useEffect} from"react"
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const{Option}=Select

const CreateProduct = () => {
  const navigation=useNavigate()
  const[categories,setcategories]=useState([])
  const[name,setName]=useState("")
  const[description,setdecription]=useState("")
  const[price,setprice]=useState("")
const[category,setcategory]=useState("")
const[quantity,setquantity]=useState("")
const[shipping,setshipping]=useState("")
const[photo,setphoto]=useState("")
  //getallcategories
  const getallcategories=async(req,res)=>{
    try{
      const {data}=await axios.get(`http://localhost:8080/api/v1/category/category`)
      if(data?.success){
        setcategories(data?.category)
      }


    }catch(err){
      console.error(err)
      toast.error("somethong went wrong in getting categories")

    }
  
}
useEffect(() => {
 
  getallcategories()
}, [])
//createproduct
const handleCreate=async(e) =>{
  e.preventDefault()
  try{
    const produtData=new FormData()
    produtData.append("name",name)
    produtData.append("description",description)
    produtData.append("price",price)
    produtData.append("quantity",quantity)
    produtData.append("category",category)
    produtData.append("photo", photo);
    produtData.append("shipping", shipping);


    
    const {data}=await axios.post(`http://localhost:8080/api/v1/products/create-product`,produtData)
    if(data?.success){
      toast.error(data.message)
      
    }
    else{
      toast.success("product created")
      navigation("/dashboard/admin/products")
     
    }

  }catch(err){
    console.log(err)
    toast.error("something went wrong in creating product")
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
        <h2>Create Product</h2>
        <div className='m-1 w-75'>
          <Select bordered={false} placeholder="select a category" size="large" showSearch className='form-select mb-3' 
          onChange={(value)=>{setcategory(value)}}>
            {categories?.map(c=>(
              <Option key={c._id} value={c._id}> {c.name}</Option>

            ))}
          </Select>
          <div className='mb-3'>
          <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setphoto(e.target.files[0])}
                    hidden
                  />
                </label></div>
                <div className='mb-3'>
                  {photo&&(<div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt='product_photo' height={"200px"} className='img img-responsive'/>

                  </div>

                  )}
                </div>
                <div className='mb-3'>
                  <input type='text' value={name} placeholder='write a name' className='form-control' onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className='mb-3'>
                  <textarea type='text' value={description} placeholder='write a Decription' className='form-control' onChange={(e)=>setdecription(e.target.value)}/>
                </div>
                <div className='mb-3'>
                  <input type='text' value={price} placeholder='write a price' className='form-control' onChange={(e)=>setprice(e.target.value)}/>
                </div>
                <div className='mb-3'>
                  <input type='number' value={quantity} placeholder='write a quantity' className='form-control' onChange={(e)=>setquantity(e.target.value)}/>
                </div>
                <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setshipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
              </div>
        </div>
        </div>
      </div>

        </div>
 

    </Layout>
    
  )
}

export default CreateProduct