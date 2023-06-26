import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet";
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <meta name='description'  content={description}/>
                <meta name='keywords'  content={keywords}/>
                <meta name='author'  content={author}/>

                <title>{title}</title>
               
            </Helmet>
        <Header/>
         <main style={{minHeight:"90vh"}}>
         

         {children}
         <ToastContainer />
 
         </main>
        
        <Footer/>
    </>

  )
}
Layout.defaultProps={
  title:"Ecommerce app",
  description:"mern stack project",
  keywords:"mern,react,node,mongodb",
  author:"amit lekhak"
}

export default Layout