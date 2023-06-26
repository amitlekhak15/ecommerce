import { useAuth } from "../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useState ,useEffect} from "react";
export default function Adminroute(){
    const[ok,setok]=useState(false)
    const[auth,setAuth]=useAuth()
    useEffect(() => {
        const authcheck=async()=>{
            const res=await axios.get (`http://localhost:8080/api/v1/auth/admin-auth`)

           
            if(res.data.ok){
                setok(true)
            }
            else{
                setok(false)
            }
        }
        if(auth?.token) authcheck()
      
    }, [auth?.token])
    return ok?<Outlet/>:<Spinner/>
    
}