import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import {routerAuth, routerUsers} from "./src/routes/index.js";

dotenv.config()


const PORT = process.env.PORT || 6000;
const DB_URL = process.env.DB_URL;


const app = express();


app.use(express.json())

app.use(cors())
app.use('/auth', routerAuth)
app.use('/api', routerUsers)


// console.log(process.env.DB_URL);

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('Server Start on Port ' + PORT))
    } catch (e) {
        console.log(e);
    }
}

startApp()