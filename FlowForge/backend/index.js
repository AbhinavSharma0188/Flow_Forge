import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDb from './config/connectDb.js'
import authRouter from './route/authRoute.js'
import contentRouter from './route/contentRoute.js'
import userRouter from './route/userRoute.js'

dotenv.config()
const port = process.env.PORT


const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
   origin: [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean),
   credentials:true
}))



app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/content",contentRouter)

app.get("/" , (req,res)=>{
    res.send("Hello from Server")
})

app.listen(port , ()=>{
    console.log("Server Started")
    connectDb()
})