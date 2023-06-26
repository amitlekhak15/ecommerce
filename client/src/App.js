import { Routes ,Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login"
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./Routes/Privateroute";
import Forgetpassword from "./pages/Auth/Forgetpassword";
import Admindashboard from "./pages/Admin/Admindashboard";
import Adminroute from "./Routes/Adminroute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Profile from "./user/Profile";
import Orders from "./user/Orders";
import Products from "./pages/Admin/Products";
import Updateproducts from "./pages/Admin/Updateproducts";
import SearchOutput from "./pages/SearchOutput";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Categoryproduct from "./pages/Categoryproduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";



function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/search" element={<SearchOutput/>}/>  
      <Route path="/categories" element={<Categories/>}/> 
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/category/:slug" element={<Categoryproduct/>}/> 
      <Route path="/product/:slug" element={<ProductDetails/>}/>  
      <Route path="/about" element={<About/>}/> 
      <Route path="/contact" element={<Contact/>}/> 
      <Route path="/policy" element={<Policy/>}/> 
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgetpassword" element={<Forgetpassword/>}/>
      #user
      <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="user" element={<Dashboard/>}/>
      <Route path="user/profile" element={<Profile/>}/>
      <Route path="user/orders" element={<Orders/>}/>
      </Route>
      #admin
      <Route path="/dashboard" element={<Adminroute/>}>
      <Route path="admin" element={<Admindashboard/>}/>
      <Route path="admin/create-category" element={<CreateCategory/>}/>
      <Route path="admin/create-product" element={<CreateProduct/>}/>
      <Route path="admin/product/:slug" element={<Updateproducts/>}/>
      <Route path="admin/products" element={<Products/>}/>
      <Route path="admin/orders" element={<AdminOrders  />}/>

      <Route path="admin/users" element={<Users/>}/>
      </Route>

      <Route path="/login"  element={<Login/>}/>
      <Route path="*" element={<PageNotFound />}/> 
    </Routes>
    
    </>
  );
}

export default App;
