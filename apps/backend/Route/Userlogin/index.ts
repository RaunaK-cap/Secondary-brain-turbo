import { Router } from "express"

export const user = Router()

user.get("/testing" , (req, res)=>{
        res.json({
            message:"api is working bro"
        })
})