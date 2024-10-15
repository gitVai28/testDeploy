import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
function Login() {
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    const copyloginInfo = { ...loginInfo};
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    const {email, password} = loginInfo;
    if( !email || !password){
        return handleError('Please fill in all fields');
    }
    try{
        const url = "http://localhost:8080/auth/login";
        const responce = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
        const result = await responce.json();
        const {success, message, jwtToken, name, error} = result;
        if(success){
            handleSuccess(message);
            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('loggedInUser', name);
            setTimeout(() => {
                navigate('/home')
            },1000);
        }else if(error) {
            const details = error?.details[0].message;
            handleError(details);
        }else if(!success){
            handleError(message);
        }
        console.log(result);
    }catch(err){
        handleError(err);
    }
  }
  return (
    <div className='container'>
      <h1>LogIn</h1>
      <form onSubmit={handleLogin}>
        <div>
            <label htmlFor='email'>Email</label>
            <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter your Email.....'
                value={loginInfo.email}
            />
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Enter your password.....'
                value={loginInfo.password}
            />
        </div>
        <button type='submit'>LogIn</button>
        <span>
            Don't have an account?
            <Link to='/signup'>SignUp</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login;
