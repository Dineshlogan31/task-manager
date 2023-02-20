const express=require("express")
const { getTasks, createTask, getTask, updateTask } = require("../controllers/taskController")

const route=express.Router()


route.get("/",getTasks)

route.post("/",createTask)
route.get("/:id",getTask)
route.put("/:id",updateTask)

module.exports=route