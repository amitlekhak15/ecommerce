import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Categoryproduct = () => {
    const naviagte=useNavigate()
    const [products,setproducts]=useState([])
    const params=useParams()
    const[category,setcategory]=useState([])
    useEffect(() => {
      if(params?.slug) getprodbycat()
    }, [params?.slug])
    
    const getprodbycat=async()=>{
        try{

            const{data}=await  axios.get(`http://localhost:8080/api/v1/products/categoryproduct/${params.slug}`)
            setproducts(data?.products)
            setcategory(data?.category)
        }catch(err){
            console.log(err)
        }

    }
  return (
    <Layout title={"categorywiseproduct"} >
        <div className="mt-3">
        <h4 className='text-center'>Category:{category?.name}</h4>
        <h6 className='text-center'>{products?.length} result found</h6>
        <div className='d-flex flex-wrap'>
          
          {products.map((pro)=>(
                <div className="card m-2" style={{width: '18rem'}} key="pro._id">
                  
                  <img src={`http://localhost:8080/api/v1/products/productphoto/${pro._id}`} className="card-img-top  img-thumbnail" alt={pro.name} style={{height:"10rem"}} /> 
                  
                   
                    <div className="card-body ">
                    <h5 className="card-title">{pro.name}</h5>
                    <p className="card-text">{pro.description.substring(0,30 )}</p>
                    <p className="card-text">${pro.price}</p>
                    <div style={{height:"3rem"}}>
                    <button className="btn btn-primary" onClick={()=>{naviagte(`/product/${pro.slug}`)}}>More Details</button>
                    <button className="btn btn-primary m-2">Add to Cart</button>
                    </div>
                    </div>
                </div>))}
  </div>
        </div>

        

    </Layout>
    
  )
}

export default Categoryproduct