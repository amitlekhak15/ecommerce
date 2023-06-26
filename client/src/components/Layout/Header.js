import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {BsFillBagFill} from "react-icons/bs"
import { AuthProvider, useAuth } from '../../context/Auth'
import Searchinput from '../Form/Searchinput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/Cart'
import { Badge } from 'antd'


const Header = () => {
  const[auth,setAuth]=useAuth()
  const[cart]=useCart()
  const categories=useCategory()
  const handlelogout=()=>{
    setAuth({...auth,user:null,token:""})
    localStorage.removeItem("auth")
  }
  return (
   <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link  to="/" className="navbar-brand"> <BsFillBagFill/> Fashion-Looks</Link> <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> <Searchinput />
        <li className="nav-item">
          <NavLink to="/"  className="nav-link " aria-current="page" >Home</NavLink>
        </li>
        <li className="nav-item dropdown">
          <Link  to={"/categories"} className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </Link>
          <ul className="dropdown-menu">
          <Link  className="dropdown-item" to="/categories">All Categories</Link>
          {categories?.map((c) => (
            <li>
              
              <Link  to={`/category/${c.slug}`} className="dropdown-item">{c.name}</Link></li>
                    
                 ))}
            
            
          </ul>
        </li>
        


        
        {
          !auth.user?(<>
          <li className="nav-item">
          <NavLink  to="/register" className="nav-link" >Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">Login</NavLink>
        </li>

          </>):
          (
            <>
          <div className="  dropdown  ">
         <NavLink className=" dropdown-toggle btn btn-light"   role="button" data-bs-toggle="dropdown" aria-expanded="false">
         {auth?.user?.name}
         </NavLink>
          <ul className="dropdown-menu ">
          <NavLink 
          to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`}className="btn btn-light">Dashboard</NavLink>
         <NavLink onClick={handlelogout}  to="/login" className="nav-link">LogOut</NavLink>
      
  </ul>
</div>
</>
)
        }
        
        <li className="nav-item">
        <Badge count={cart?.length} showZero>
        <NavLink to="/cart" className="nav-link">cart</NavLink>
     
    </Badge>
          
        </li>
      </ul>
      
    </div>
  </div>
</nav>

   </>
  )
}

export default Header