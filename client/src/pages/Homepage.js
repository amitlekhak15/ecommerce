import React,{useEffect,useState}from 'react'
import Layout from '../components/Layout/Layout'
import axios from "axios"
import {  Checkbox,Radio,Card} from 'antd'
import { price } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import { toast } from 'react-toastify';
import {   Image  }  from "antd";
const Homepage = () => {
  const [cart,setCart]=useCart()
  const naviagte=useNavigate()
  const [products,setproducts]=useState([])
  const [categories,setcategories]=useState([])
  const[checked, setchecked]=useState([])
  const [radio,setradio]=useState([])
  const[total,settotal]=useState(0)
  const[page,setpage]=useState(1)
  const[loading,setloading]=useState(false)
  //gettotalcount
  const gettotal=async()=>{
    try{
const {data}=await axios.get(`http://localhost:8080/api/v1/products/product-count`)
settotal(data?.total)
console.log(data.total)
    }catch(err){
      console.log(err)

    }

  }
  
  //get all products

  const getallproducts=async()=>{
    try{
      setloading(true)
  const{data}=await axios.get(`http://localhost:8080/api/v1/products/product-list/${page}`)
  setloading(false)
  setproducts(data.products)
  console.log(data.products)
    }
    catch(err)
    {
      setloading(false)
      console.log(err)
    }
  }
  useEffect(() => {
    if(!checked.length || !radio.length) getallproducts()
    

  }, [checked.length,radio.length])
  useEffect(() => {
    if(checked.length || radio.length) filterdproduct()


  }, [checked,radio])
  
  //get all categories
  const getallcategories=async(req,res)=>{
    try{
      const {data}=await axios.get(`http://localhost:8080/api/v1/category/category`)
      if(data?.success){
        setcategories(data?.category)
      }


    }catch(err){
      console.error(err)
      

    }
  
}
useEffect(() => {
 
  getallcategories()
  gettotal()
  
}, [])
//loadmore
const loadmore=async()=>{
  try{
    setloading(true)
const {data}=await axios.get(`http://localhost:8080/api/v1/products/product-list/${page}`)
setloading(false)
setproducts([...products,...data?.products])
console.log("data",data.total)
  }catch(err){
    
    console.log(err)
    setloading(false)

  }

}
useEffect(() => {
  if(page==1) return
loadmore()


}, [page])

//filter by category
const handleFilter =async(value,id)=>{
  let all=[...checked]
  if(value){
    all.push(id)
  }else{
    all=all.filter(c=>c!==id)
  }
  setchecked(all)

}
//get filters product
const filterdproduct=async()=>{
  try{
    const {data}=await axios.post(`http://localhost:8080/api/v1/products/product-filters`,{checked,radio})
    setproducts(data?.product)
 
  }
  catch(err){
    console.log(err)
  }

}
  
  return (
    
    <Layout title={"Allproducts-Best Offers"}>
      <div className='row mt-3  '>
        <div className='col-md-3'>
          <h6 className='text center m-4'> Filter BY Category</h6>
          <div className=' d-flex flex-column'>
          {
            categories?.map(c=>(
              <Checkbox key={c._id}onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
            ))
          }
          </div>
          <h6 className='text center m-4'> Filter BY Price</h6>
          <div className=' d-flex flex-column'>
          <Radio.Group onChange={e=>setradio(e.target.value)}>
            {price?.map(p=>(
              <div>
                <Radio value={p.array}>
              {p.name}
            </Radio>
            </div>
            ) )}
</Radio.Group>
          </div>
          <div className='m-2'>
          <button className="btn btn-danger " onClick={()=>window.location.reload()}>Reset Filters</button>
          </div>
        
          
          
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'> All Products</h1>
          <div className='d-flex flex-wrap'>
          
          {products.map((pro)=>(
                <div className="card m-2" style={{width: '18rem'}} key="pro._id">
                  
                 <Image src={`http://localhost:8080/api/v1/products/productphoto/${pro._id}`} className="card-img-top  img-thumbnail" alt={pro.name} style={{height:"10rem"}} /> 
                  
                   
                    <div className="card-body ">
                    <h5 className="card-title">{pro.name}</h5>
                    <p className="card-text">{pro.description.substring(0,30 )}</p>
                    <p className="card-text">${pro.price}</p>
                    <div style={{height:"3rem"}}>
                    <button className="btn btn-primary" onClick={()=>{naviagte(`/product/${pro.slug}`)}}>More Details</button>
                    <button className="btn btn-primary m-2" onClick={()=>{setCart([...cart,pro])
                    localStorage.setItem("cart",JSON.stringify([...cart,pro]))
                    toast.success("Items added to cart")
          }}>Add to Cart</button>
                    </div>
                    

                    

    
            </div>
            </div>
          
            ))}

          </div>
          <div className='m-2,p-3'>
            {products&&products.length<total &&(
            <button className='btn btn-warning' onClick={(e)=>{
            e.preventDefault()
             setpage(page+1)
            }}>{
              loading?"Loading...":"Loadmore"
            }</button>
            )}
          </div>
        </div>

      </div>

    </Layout>
    
  )
}

export default Homepage