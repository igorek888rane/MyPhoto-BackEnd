import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import {routerAuth, routerUsers, routerPhoto} from "./routes/index.js";
import fileUpload from 'express-fileupload';
import * as fs from "fs";


dotenv.config()


const PORT = process.env.PORT || 6000;
const DB_URL = process.env.DB_URL;


const app = express();



app.use(express.json())
app.use(fileUpload({}))
app.use(()=>{
    if(fs.existsSync('uploads')){
        fs.mkdirSync('uploads')
    }})
app.use(()=>{
    if(fs.existsSync('PhotoCard')){
        fs.mkdirSync('PhotoCard')
    }})
app.use(()=>{
    if(fs.existsSync('userAvatar')){
        fs.mkdirSync('userAvatar')
    }})
app.use('/uploads',express.static('uploads'))

app.use(cors())

app.use('/auth', routerAuth)
app.use('/user', routerUsers)
app.use('/photo', routerPhoto)


async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('Server Start on Port ' + PORT))
    } catch (e) {
        console.log(e);
    }
}

startApp()