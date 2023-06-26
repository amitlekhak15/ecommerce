import { useEffect,useState } from "react";
import { useAuth } from "../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
export default function PrivateRoute(){
    const[ok,setok]=useState(false)
    const[auth,setAuth]=useAuth()
    useEffect(() => {
        const authcheck=async()=>{
            const res=await axios.get (`http://localhost:8080/api/v1/auth/user-auth`,{

            headers:{
                Authorization:auth?.token
            }
            })
            if(res.data.ok){
                setok(true)
            }
            else{
                setok(false)
            }
        }
        if(auth?.token) authcheck()
      
    }, [[auth?.token]])
    return ok?<Outlet/>:<Spinner/>
    
}