import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
  completed: {
    type: Boolean,
    default:false
},
createdBy:{
    type:String,
    required:true
},
isDeleted:{
    type: Boolean,
    default: false
}
},{timestamps:true})

export default mongoose.model("todoList",todoSchema);