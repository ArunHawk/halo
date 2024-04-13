import React, {  useEffect, useState } from 'react';
import './todo.css';
import { useSocket } from '../../component/Redux/SocketProvider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector } from 'react-redux'


const Todo = () => {
    
    const {user} = useSelector(state=>state.halo)
    const initialState = {
        title:"",
        created: user.userId
    }
    const [userValue,setUserValue] = useState(initialState)
    const [userTodos,setUserTodo] = useState([]);
    const socket = useSocket()
   

    const handleChange =(e)=>{
        e.preventDefault()
        const {name,value} = e.target;
        setUserValue((prev)=>({
            ...prev,[name]: value,
        }))
    }
    const handleSubmit =()=>{
        socket.emit("addTodo",userValue)
        socket.on("addedTodo",(data)=>{
            if(data.error === false){
                console.log(data,"arun")
            }
        })
    }

    useEffect(() => {
        socket.emit("getTodo",initialState.created)
                socket.on("getTodos",(data)=>{
                    if(data.error === false){
                        setUserTodo(data.todolist);
                    }
                })
        return () => {
            socket.off("getTodos");
        };
    }, [socket, initialState.created]);

    console.log(userTodos,"xxx")
    const handleComplete = (todoId) => {
        socket.emit("completeTodo", todoId);
    };

    const handleDelete = (todoId) => {
        socket.emit("deleteTodo", todoId);
    };
  return (
    <>
    <div className="mainTodoContainer">

    <div className="todoContainer">
        <TextField id="standard-basic" label="Standard" variant="standard" name="title" onChange={handleChange} />
        <Button variant="contained"  onClick={handleSubmit} > Add Todo</Button>
    </div>
    <div className="cardContainer">
                {userTodos.map(todo => (
                    <div key={todo._id} className="todoCard">
                        <FormControlLabel
                            control={<Checkbox checked={todo.completed} onChange={() => handleComplete(todo._id)} />}
                            label={todo.title}
                            disabled={todo.completed} 
                        />
                        <Button variant="contained" color="error" onClick={() => handleDelete(todo._id)}>Delete</Button>
                    </div>
                ))}
            </div>
                </div>
    </>
  )
}

export default Todo