import { Router } from "express";
import { middlware } from "../../middleware";
import z from "zod"
import { prisma } from "db/db";


export const content = Router()


content.post("/adddata" , middlware ,  async(req,res)=>{
    const contentschema = z.object({
        title:z.string().min(2),
        link : z.string().min(2),
        type:z.string().min(1)
    })

    if(!contentschema.safeParse(req.body).success){
        return res.status(400).json({
            message:"please enter correct crendentials "
        })
    }
    //@ts-ignore
    const userid = req.userid
    console.log(userid)
    const { title , link, type } : any = contentschema.safeParse(req.body).data

    try {
        const content = await prisma.contentschema.create({
            data:{
                title:title,
                Link:link,
                type:type, 
                dataandtime: new Date(),
                userid:userid
            }, 
        })

        console.log(content)

        res.json({
            message:"data has been stored"
        })
        

    } catch (error) {
        res.status(400).json({
            message:"error while storing data ",
            error
        })
    }

})

content.get("/getdata" , middlware , async(req,res)=>{
    //@ts-ignore
    const userid = req.userid

    try {
        const result = await prisma.contentschema.findMany({
            where:{
                userid:userid
            },
            take:10
        })

        res.status(200).json({
            message: "your all data",
            result
        })
    } catch (error) {
        res.status(400).json({
            message:"error. please try again ",
            error
        })
    }
})



content.put("/update/:id" , middlware , async(req, res)=>{

    const contentschema = z.object({
        title:z.string().min(2),
        link : z.string().min(2),
        type:z.string().min(1)
    })

    if(!contentschema.safeParse(req.body).success){
        return res.status(400).json({
            message:"please enter correct crendentials "
        })
    }
    //@ts-ignore
    const userid = req.userid
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "invalid id"
        })
    }

    const { title , link, type } : any = contentschema.safeParse(req.body).data

    try {
        const result = await prisma.contentschema.updateMany({
            where:{
                userid:userid,
                id:id
            },
            data:{
                Link:link,
                title:title,
                type:type
            }
        })

        res.status(200).json({
            message:"data has been updated ",
            result
        })
    } catch (error) {
        res.status(400).json({
            message:"error while updating "
        })
    }

})


content.delete("/deletedata/:id" , middlware , async(req, res)=>{
    //@ts-ignore
    const userid = Number(req.userid)
    const id : any = Number(req.params.id)

    console.log(userid , id)

    try {
        const result = await prisma.contentschema.deleteMany({
            where:{
                id:id,
                userid:userid
            }
        })

        res.status(200).json({
            message:"deleted",
            result
        })
    } catch (error) {
        res.status(400).json({
            message:"error while deleting. Try again",
            error
        })
    }

})