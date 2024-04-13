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
        const todos = await TodoSchema.find({createdBy:data,isDeleted:{$exists: true, $eq: false}})
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
const updateTodo = async(data)=>{
    try{
        const todos = await TodoSchema.findByIdAndUpdate(data, {$set:{completed:true}}, { new: true });
        console.log("update",todos)
        // if(todos.length >0){
        //     return { error: false, message:"your Todo is updated",status: 200,task:todos };
        // }else{
        //     return { error: true, message:"Something went Wrong",status: 500 };
        // }
    }catch(err){
        console.log(err)
        return { error: true, message:"Something went Wrong",status: 500 };
    }
}
const deleteTodo = async(data)=>{
    try{
        const todos = await TodoSchema.findByIdAndUpdate(data, {$set:{isDeleted:true}}, { new: true });
        console.log("delete",todos)
        // if(todos.length >0){
        //     return { error: false, message:"your Todo is deleted",status: 200,task:todos };
        // }else{
        //     return { error: true, message:"Something went Wrong",status: 500 };
        // }
    }catch(err){
        console.log(err)
        return { error: true, message:"Something went Wrong",status: 500 };
    }
}
const allDeleteTodo = async(data)=>{
    try{
        const todos = await TodoSchema.deleteMany({createdBy:data});
        console.log("delete",todos)
        // if(todos.length >0){
        //     return { error: false, message:"your Todo is deleted",status: 200,task:todos };
        // }else{
        //     return { error: true, message:"Something went Wrong",status: 500 };
        // }
    }catch(err){
        console.log(err)
        return { error: true, message:"Something went Wrong",status: 500 };
    }
}


export default {
    addTodo,
    getTodo,
    updateTodo,
    deleteTodo,
    allDeleteTodo
}