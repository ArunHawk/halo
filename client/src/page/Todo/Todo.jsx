import React, {  useEffect, useState } from 'react';
import './todo.css';
import { useSocket } from '../../component/Redux/SocketProvider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Todo = () => {
    
    const {user} = useSelector(state=>state.halo)
    const initialState = {
        title:"",
        created: user.userId
    }
    const [userValue,setUserValue] = useState(initialState)
    const [userTodos,setUserTodo] = useState([]);
    const [check,setCheck] = useState(false);
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
                socket.emit("getTodo",initialState.created)
                socket.on("getTodos",(data)=>{
                    if(data.error === false){
                        setUserTodo(data.todolist);
                    }
                })
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

    const handleComplete = (todoId) => {
        socket.emit("completeTodo", todoId);
        setCheck(!check)
        console.log(todoId)
    };

    const handleDelete = (todoId) => {
        socket.emit("deleteTodo", todoId);
        console.log(todoId)
    };
    const handleAllDelet =()=>{
        socket.emit("allDeleteTodo",initialState.created)
    }
  return (
    <>
    <div className="mainTodoContainer">

    <div className="todoContainer">
        <TextField id="standard-basic" label="Standard" variant="standard" name="title" onChange={handleChange} />
        <Button variant="contained"  onClick={handleSubmit} > Add Todo</Button>
        <IconButton aria-label="delete" onClick={handleAllDelet} >
        <DeleteIcon   />
      </IconButton>
    </div>
    <div className="cardContainer">
                {userTodos.map(todo => (
                    <div key={todo._id} className="todoCard">
                        <div className="listComponents">
                            <div className="textCompo">
                                <TextField value={todo.title} 
                                 id="standard-basic" label="Standard" 
                                 variant="standard"
                                />
                            </div>
                            <div className="buttonComponent">
                                <Checkbox  onChange={() => handleComplete(todo._id)}/>
                                <DeleteIcon onClick={() => handleDelete(todo._id)} className='deletIcons'/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                </div>
    </>
  )
}

export default Todo