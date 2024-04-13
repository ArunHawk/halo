import React, {  useState } from 'react';
import './login.css';
import { useSocket } from '../../component/Redux/SocketProvider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {loginFailure,loginStart,loginSuccess} from '../../component/Redux/userSlice.js';

const Login = () => {

  const initialState = {
    email:"",
    password:"",
}
const [userValue,setUserValue] = useState(initialState)
const [reErrors,setReErrors] = useState({});
const navigate = useNavigate();
const socket = useSocket();
const dispatch = useDispatch();
const handleChange =(e)=>{
    e.preventDefault()
    const {name,value} = e.target;
    let error = "";

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address";
    } else if (name === "password") {
      if (value.length < 6) {
        error = "Password must be at least 6 characters long";
      } else if (!/\d/.test(value)) {
        error = "Password must contain at least one digit";
      } else if (!/[!@#$%^&*]/.test(value)) {
        error = "Password must contain at least one special character (!@#$%^&*)";
      }
    }

    setReErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setUserValue((prev)=>({
        ...prev,[name]: value
    }))
}
const handleSubmit = (e)=>{
  e.preventDefault()
  dispatch(loginStart())
    const hasEmptyFields = Object.values(userValue).some(value => value === "");

if (hasEmptyFields) {
  setReErrors((prevErrors) => ({
    ...prevErrors,
    submit: "Please Fill All Required Fields With Mandatory Conditions.",
  }));
  return;
} else {
  setReErrors({});
  try {
    socket.emit("loginContact",userValue)
    socket.on('loginError',(data)=>{
      if(data.error === false){
        dispatch(loginSuccess(data.Authtoken))
        navigate('/home');
      }
      if(data.error === true){
        dispatch(loginFailure())
        setReErrors((prevErrors) => ({
          ...prevErrors,
          submit: data.message,
        }));
      }
    })
  } catch (error) {
      console.error("An error occurred:", error);
      setReErrors((prevErrors) => ({
        ...prevErrors,
        submit: "An error occurred. Please try again later.",
      }));
    
  }
}
}
  return (
    <div className="loContainer">
    <div className="loinputsContainer">
      <Link to='/register' className='link'>
        <Button>Register</Button>
      </Link>
      <Link to='/home' className='link'>
        <Button>home</Button>
      </Link>
      <TextField
       required
       id="mail"
       label="Required"
       name='email'
       onChange={handleChange}
       defaultValue="email"
      />
       {reErrors.email && <span className="error" style={{color:"red",width:"150px"}}>{reErrors.email}</span>}
      <TextField
       required
       id="pass"
       label="Required"
       name='password'
       onChange={handleChange}
       defaultValue="password"
       type='password'
      />
            {reErrors.password && <span className="error" style={{color:"red",width:"150px"}}>{reErrors.password}</span>}
       <Button variant="contained" onClick={handleSubmit}>Login</Button>
       {reErrors.submit && <span className="error" style={{color:"red",width:"150px"}}>{reErrors.submit}</span>}
    </div>
    </div>
  )
}

export default Login