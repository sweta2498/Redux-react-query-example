import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';

import logo from '../img/logo.jpg'
const Header = () => {
  const navigate=useNavigate()

  function logoutbtn() {
    localStorage.removeItem('token');
    localStorage.removeItem('product');
    // dispatch(setLogout());
    navigate("/login")
  }
  function addnewbtn() {
    navigate("/newproduct")
  }

  function myproductbtn() {
    navigate("/myproduct")
  }

  function homebtn(){
    navigate("/allproduct")
  }
  return (
    <div className='headerdiv'>
      <nav>
        <a href=''><img src={logo} /></a>
        <div className='nav-links' id='navlink'>
          <ul>
            <li><Button onClick={homebtn}>Home</Button></li>
            <li><Button onClick={addnewbtn}>Add New Product</Button></li>
            <li><Button onClick={myproductbtn}>My Product</Button></li>
            <li><Button onClick={logoutbtn}>Logout</Button></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header