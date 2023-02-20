if(process.env.NODE_ENV !=="production")
{
    require("dotenv").config()
}

const http=require("http")
const fs=require("fs")
const express=require("express")
const {engine}=require("express-handlebars")
const mongoose=require('mongoose')
const methodOverride=require("method-override")


const taskRoute = require("./routes/taskRouter")

const app=express()
app.use(methodOverride("_method"))

app.use(express.json())
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URI,(err)=>{
    if(err) throw err
    console.log("db connected");
})

app.use(express.urlencoded({extended:true}))
//mount template engine
app.engine("handlebars",engine())
app.set("view engine","handlebars")


//mount route
app.use(express.static(__dirname+"/public"))
app.use("/tasks",taskRoute)


//listen the server
app.listen(process.env.PORT || 5000,(err)=>{
    if(err) throw err
    console.log("running task manager:5000")
})