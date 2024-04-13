import TodoSchema from "../Models/TodoSchema.js"

const addTodo = async(data,socket)=>{
    try{
        const {title,created} = data;
        await new TodoSchema({
            title:title,
            createdBy:created
        }).save();
        return { error: false, message:"Todo Added",status: 200 };
    }catch(err){
        console.log(err)
        return { error: true, message:"Something went Wrong",status: 500 };
    }
}

const getTodo = async(data)=>{
    try{
        const todos = await TodoSchema.find({createdBy:data})
        if(todos.length >0){
            return { error: false, message:"your Todos",status: 200,task:todos };
        }else{
            return { error: true, message:"Something went Wrong",status: 500 };
        }
    }catch(err){
        console.log(err)
        return { error: true, message:"Something went Wrong",status: 500 };
    }
}


export default {
    addTodo,
    getTodo
}