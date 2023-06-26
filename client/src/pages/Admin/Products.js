import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'

const Products = () => {
    const [product,setproduct]=useState([])
    const getAllproducts=async()=>{
        try{
            const{data}=await axios.get(`http://localhost:8080/api/v1/products/getallproducts`)
            setproduct(data.product)
            if(data.success){
                toast.success("all products loaded")
            }

        }catch(err){
            console.log(err)
            toast.error(err)
        }

    }
    useEffect(() => {
    getAllproducts()
    }, [])
    
  return (
    <Layout> 
        <div className='row'>
        <div className='col-md-3'>
        <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'>
                All Products List
            </h1>
            <div className='d-flex'>
            {product?.map((pro)=>(
                <Link  key={pro._id}to={`/dashboard/admin/product/${pro.slug}`} className='product-link'>
                    <div className="card m-2" style={{width: '18rem'}}>
                    <img src={`http://localhost:8080/api/v1/products/productphoto/${pro._id}`} className="card-img-top" alt={pro.name} />
                    <div className="card-body">
                    <h5 className="card-title">{pro.name}</h5>
                    <p className="card-text">{pro.description}</p>
    
            </div>
            </div>
            </Link>
            ))}

            </div>
            
        </div>
        
    </div>

    </Layout>
    
  )
}

export default Products