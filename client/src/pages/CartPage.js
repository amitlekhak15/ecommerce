import React,{useState,useEffect} from 'react'
import Layout  from "../components/Layout/Layout"
import { useCart } from '../context/Cart'
import { useAuth } from '../context/Auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react"
import { toast } from 'react-toastify';

import {   Image  }  from "antd";
import axios from 'axios'


const CartPage = () => {
  const[cart,setCart]=useCart()
  const[auth,setAuth]=useAuth()
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
 
 
  const[loading,setloading]=useState(false)
  const navigate=useNavigate()
  //total summery
  const totalsummary=()=>{
    try{
      let total=0
      cart?.map(item=>{total=total+item.price})
      return total.toLocaleString("en-US",{
        style:"currency",
        currency:"USD",
      })

    }
    catch(err){
      console.log(err)

    }
  }
  //delite item
  const removecartitem=(pid)=>{
    try{
      let myCart=[...cart]
      let index=myCart.findIndex(item=>item._id==pid)
      myCart.splice(index,1)
      setCart(myCart)
      localStorage.setItem("cart",JSON.stringify(myCart))

    }catch(err){
      console.log(err)
    }

  }
  //get payment token
  const gettoken=async()=>{
    try{
const{data}=await axios.get(`http://localhost:8080/api/v1/products/braintree/token`)
setClientToken(data?.clientToken);
    }catch(err){
      console.log(err)
    }

  }
  useEffect(() => {
    gettoken()
  }, [auth?.token])
  //handle payment
  const handlePayment=async()=>{
    try{
      setloading(true)
      const{nonce}=await instance.requestPaymentMethod()
      const {data}=await axios.post(`http://localhost:8080/api/v1/products/braintree/payment`,{
        cart,nonce

      })
      setloading(false)
      localStorage.removeItem("cart")
      setCart([])
      navigate("/dashboard/user/orders")
      toast.success("payment completed successfully")

    }catch(err){
      console.log(err)
      setloading(false)
    }

  }
  
  return (
    <Layout> 
      <div className='container'>
        <div className='row'>
         <div className='col-md-12'>
          <h1 className="text-center bg-light p-2 mb-1">
            {`Hello  ${auth?.token &&auth?.user?.name }`}
          </h1>
          <h4 className="text-center">
            {cart?.length>1?`You have ${cart.length} items in your cart ${auth?.token?" ":"please login to checkout"}`:"Your card is empty"}
          </h4>
         </div>

        </div>
        <div className='row'>
          <div className='col-md-8'>

          {
            cart?.map(p=>(
              <div className='row m-2 card flex-row'>
                <div className='col-md-4'>
                <Image src={`http://localhost:8080/api/v1/products/productphoto/${p._id}`} className="card-img-top  img-thumbnail" alt={p.name} style={{height:"10rem"}}height={"100px"}  width={"100px"}/> 
                </div>
                <div className='col-md-8'>
                <p >{p.name}</p>
                <p>{p.description.substring(0,30)}</p>
                <p>Price:{p.price}</p>
                <button className='btn btn-danger' onClick={()=>removecartitem(p._id )}>Remove</button>
                </div>

              </div>
            ))
          }
          </div>
          <div className='col-md-4'>
            <h4>Cart Summary</h4>
           <p>Total|Checkout|payment   </p> 
           <hr/>
          <h4>Total:{totalsummary()}</h4>
          {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className='mt-2'>
                {!clientToken||!cart?.length?(""):(
                  <>
                  <div>
          <DropIn
            options={{ authorization: clientToken ,
            paypal:{flow:"vault"}
            }}
            onInstance={instance => setInstance(instance) }
          />
          <button className='btn btn-primary' onClick={handlePayment} disabled={loading||!instance||!auth?.user?.address}>
            { loading?"Processing......":"Make Payment"}</button>
        </div>
              

                  </>
                )}
              
          
          </div>

        </div>
</div>
      </div>

    </Layout>
  )
}

export default CartPage