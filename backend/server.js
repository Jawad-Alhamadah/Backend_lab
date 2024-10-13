import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import User from "./models/User.js"
import bcrypt from "bcrypt"
import router from "./Router/Router.js"

 

dotenv.config()


startConnection().catch(err => console.log(err))
async function startConnection() {
    // console.log()
    await mongoose.connect(process.env.CONNECTION_STRING)

    console.log("connected to Mongoose")
}

const app = express()
app.use(express.json())
app.use(router)

let port = 8080

app.listen(port || 7000, () => console.log(`listening to ${port || 7000}`))


