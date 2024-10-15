import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import {ToastContainer} from 'react-toastify';

function Home() {
  const [loggedInUser,setLoggedInUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])
  const handleLogout = (e) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedInUser');
    handleSuccess(" user loggedOut");
    setTimeout(() => {
        navigate('/login');
    },1000);
  }
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>LogOut</button>
      <ToastContainer/>
    </div>
  )
}

export default Home
