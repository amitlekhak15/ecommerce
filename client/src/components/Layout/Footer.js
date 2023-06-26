import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer'>
        <h4 className='text-center'> All Right Reserved &copy;tech </h4>
        <p className='text-center mt-3'>
        <Link to="/about">About</Link>
        |
        <Link to="/contact">Contact</Link>|
        <Link to="/policy">Private Policy</Link>

        </p>
      <div><a  href="https://github.com/amitlekhak15/ecommerce"> GitHubCodeLink</a></div>
      <div><a  href=" https://www.linkedin.com/in/amit-lekhak-380919162"> Linkdin profile</a></div>
      <div>Contact No -9568611497</div>

        </div>
  )
}

export default Footer