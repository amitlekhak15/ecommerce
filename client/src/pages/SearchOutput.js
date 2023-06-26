
import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/Search'
import {   Image  }  from "antd";
const SearchOutput = () => {
    const[value,setvalue]=useSearch()
  return (
   <Layout title={"search results"}>
    <div className='container'>
        <div className='text-center'>
        <h1>Search Results</h1>
        <h6>{value?.results.length<1?"No Products Found":`found${value?.results.length}`}</h6>
        <div className='d-flex flex-wrap'>
          
          {value.results.map((pro)=>(
                <div className="card m-2" style={{width: '18rem'}} key="pro._id">
                  
                  <Image src={`http://localhost:8080/api/v1/products/productphoto/${pro._id}`} className="card-img-top  img-thumbnail" alt={pro.name} style={{height:"10rem"}} /> 
                  
                   
                    <div className="card-body ">
                    <h5 className="card-title">{pro.name}</h5>
                    <p className="card-text">{pro.description.substring(0,30 )}</p>
                    <p className="card-text">${pro.price}</p>
                    <div style={{height:"3rem"}}>
                    <button className="btn btn-primary">More Details</button>
                    <button className="btn btn-primary m-2">Add to Cart</button>
                    </div>
                    </div>
            </div>
          
            ))}

          </div>
</div>
    </div>

   </Layout>
  )
}

export default SearchOutput