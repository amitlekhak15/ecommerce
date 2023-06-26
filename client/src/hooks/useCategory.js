import { useState,useEffect } from "react";
import axios from "axios"
export default function useCategory(){
    const [categories,setcategories]=useState([])
    //get categories
    const getallcategories=async()=>{
        try{
            const {data}=await axios.get(`http://localhost:8080/api/v1/category/category`)
            setcategories(data?.category)
        console.log( data?.category)

        }catch(err){
            console.log(err)
        }

    }

useEffect(() => {
  getallcategories()
}, [])
return categories
}