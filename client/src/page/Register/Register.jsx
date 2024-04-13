import React, {  useState } from 'react';
import './register.css';
import { useSocket } from '../../component/Redux/SocketProvider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    
    const initialState = {
        username:"",
        email:"",
        password:"",
        mobile:""
    }
    const [userValue,setUserValue] = useState(initialState)
    const [reErrors,setReErrors] = useState({});
    const navigate = useNavigate();
    const socket = useSocket()
   
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
       
        console.log(userValue)
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
        socket.emit("contact",userValue)
        socket.on('validationError',(data)=>{
          if(data.error === false){
            navigate('/login');
          }
        })
      } catch (error) {
        // Handle errors from the server
        if (error.response && error.response.data && error.response.data.error) {
          setReErrors((prevErrors) => ({
            ...prevErrors,
            submit: error.response.data.error,
          }));
        } else {
          console.error("An error occurred:", error);
          setReErrors((prevErrors) => ({
            ...prevErrors,
            submit: "An error occurred. Please try again later.",
          }));
        }
      }
    }
    }
  return (
    <div className="reContainer">
    <div className="inputsContainer">
      <TextField
       required
       id="uname"
       label="Required"
       name='username'
       onChange={handleChange}
       defaultValue="username"
      />
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
       id="mobil"
       label="Required"
       name='mobile'
       onChange={handleChange}
       defaultValue="mobile"
      />
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
       <Button variant="contained" onClick={handleSubmit}>Register</Button>
       <Link to='/login'>
        <Button>Login</Button>
       </Link>
       {reErrors.submit && <span className="error" style={{color:"red",width:"150px"}}>{reErrors.submit}</span>}
    </div>
    </div>
  )
}

export default Register