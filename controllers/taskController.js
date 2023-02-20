const taskModel=require("../models/taskModel")
const fs=require('fs')

const createTask=async(req,res)=>
{
   let payload=
    {
        task:req.body.task
    }
    await taskModel.create(payload)
}


const getTasks=async (req,res)=>
{
  let data=await taskModel.find().lean()
  
  res.render("home",{data})
}

const getTask=async (req,res)=>{
   let id=req.params.id
   let updateData=await taskModel.findOne({_id:id}).lean()
   console.log(updateData);
   res.render("edit",{updateData})
}

const updateTask=async (req,res)=>{

  let payload={
    task:req.body.task
  }
  await taskModel.updateOne({_id:req.params.id},{$set:payload})
  res.redirect("/tasks")

}


module.exports={
    createTask,
    getTasks,
    getTask,
    updateTask,
    
}