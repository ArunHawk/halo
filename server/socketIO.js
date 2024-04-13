import { Server } from "socket.io";
import AuthController from "./Controller/AuthController.js";
import TodoController from "./Controller/TodoController.js";

export const initSocket =(server)=>{
    const io = new Server(server,{
        cors:true,
    });
    console.log("connected")
    io.on("connection", (socket)=>{
        console.log("SomeOne Is connected",socket.id);
        // Arunkumar Auth Controller 
        socket.on("contact",(data)=>{
            AuthController.userRegister(data,socket).then((response)=>{
                if(response.error === true){
                    socket.emit('validationError', { error: response.error,messsage:response.message });
                }
                else if(response.error === false){
                    socket.emit('validationError', { error: response.error,messsage:response.message });
                }
            }).catch((err)=>{
                console.log(err)
            })
        })
        socket.on("loginContact",(data)=>{
            AuthController.userLogin(data,socket).then((response)=>{
                if(response.error === true){
                    socket.emit('loginError', { error: response.error,messsage:response.message });
                }
                else if(response.error === false){
                    socket.emit('loginError', { error: response.error,messsage:response.message,Authtoken:response.Authorized });
                }
            }).catch((err)=>{
                console.log(err)
            })
        })

        // It have Todo Activity
        // Post Todo
        socket.on("addTodo",(data)=>{
            TodoController.addTodo(data,socket).then((result)=>{
                console.log("result",result)
                if(result.error === false){
                    socket.emit('addedTodo',{error:result.error,message:result.message,status:result.status})
                }if(result.error === true){
                    socket.emit('addedTodo',{error:result.error,message:result.message,status:result.status})
                }
            }).catch((err)=>{
                console.log(err)
            })
        })

        // Get Todo
        socket.on("getTodo",(data)=>{
            TodoController.getTodo(data).then((resl)=>{
                if(resl.error === false){
                    socket.emit('getTodos',{
                        error:resl.error,
                        message:resl.message,
                        status:resl.status,
                        todolist:resl.task
                    });
                }if(resl.error === true){
                    socket.emit('getTodos',{error:resl.error,message:resl.message,status:resl.status});
                }
            }).catch((err)=>{
                console.log(err)
            })
        })
        //update todo
        socket.on("completeTodo",(data)=>{
            TodoController.updateTodo(data).then((vals)=>{
                console.log(vals)
            })
        })
        //delete Todo
        socket.on("deleteTodo",(data)=>{
            TodoController.deleteTodo(data).then((vals)=>{
                console.log(vals)
            })
        })
        //completeDelete Todo
        socket.on("allDeleteTodo",(data)=>{
            TodoController.allDeleteTodo(data).then((vals)=>{
                console.log(vals)
            })
        })
        socket.on("disconnect",()=>{
            console.log("socket is disconnected")
        })
    })
}




