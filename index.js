// import * as dotenv from 'dotenv'
// dotenv.config()
// import express from 'express'
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import {routerAuth} from "./src/routes/index.js";

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const routerAuth = require('./src/routes/index')



const PORT = process.env.PORT ;
const DB_URL = process.env.DB_URL;


const app = express();


app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api',routerAuth)



async function startApp() {

    try {

        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('Server Start on Port ' + PORT))
    } catch (e) {
        console.log(e);
    }
}

startApp()