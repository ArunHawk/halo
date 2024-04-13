import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initSocket } from './socketIO.js';


const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));



const connect =()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("DB is connected...")
    }).catch((err)=>{
        console.log("Mongoose Error: ",err)
    })
}


app.listen(5000,()=>{
    console.log("port is connected on 5000...")
    connect()
})
initSocket(8000);