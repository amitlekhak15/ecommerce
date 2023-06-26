import express from "express"
import dotenv from"dotenv"
import productroutes from "./routes/productroutes.js"
import authrouter from "./routes/authroute.js"
import mongoose from "mongoose"
import morgan from "morgan"
import cors from "cors"
import categoryroute from "./routes/categoryroutes.js"
import { isAdmin, requireSign } from "./middlewares/authmiddleware.js"

dotenv.config()
const PORT=process.env.PORT
const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").then(()=>console.log("database connected")).catch((err)=>console.log(err))
app.use(morgan("dev"))
app.use("/api/v1/auth",authrouter)
app.use("/api/v1/category",categoryroute)
app.use("/api/v1/products",productroutes)
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})
