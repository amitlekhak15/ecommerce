import React from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Searchinput = () => {
    const [value,setvalue]=useSearch()
    const navigate=useNavigate()
    
    
    const handlesubmit=async(e)=>{
        e.preventDefault()
        try{
            console.log(value.keyword)
            const{data}=await axios.get(`http://localhost:8080/api/v1/products/search/${value.keyword}`)
            console.log(data)
            setvalue({...value,results:data})
    navigate("/search")

        }catch(err){
            console.log(err)

        }
    }
  return (
    <form className="d-flex" role="search" onSubmit={handlesubmit}>
  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={value.keyword}
  onChange={(e)=>setvalue({...value,keyword:e.target.value})}/>
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>

  )
}

export default Searchinput