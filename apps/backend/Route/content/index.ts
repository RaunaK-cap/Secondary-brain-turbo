import { Router } from "express";


export const content = Router()


content.get("/testing" , (req,res)=>{

    res.json({
        message:"api is working 2 "
    })
})