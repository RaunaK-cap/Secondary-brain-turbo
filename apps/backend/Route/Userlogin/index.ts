import { prisma } from "db/db"
import { Router } from "express"
import z from "zod"
import jwt  from "jsonwebtoken"
import { password } from "bun"
export const user = Router()

const JWT_SECRET = "lksnkgnkjsngknskgnksn"



user.post("/signup" , async(req, res)=>{
    
   const signupschema = z.object({
    firstname:z.string().min(2),
    lastname:z.string().min(3),
    password:z.string().min(4).max(15),
    username:z.string().min(3)
   })

   const verifiedbody= signupschema.safeParse(req.body)
   if(!verifiedbody.success){
    res.status(300).json({
        message:"please enter correct crendetials"
    })
    return;
   }

   const { firstname ,lastname , username , password} = verifiedbody.data

   try {

    const storinguserdata = await prisma.userschema.upsert({
        where: {
            username: username
        },
        create:{
            firstname:firstname,
            lastname:lastname,
            password:password,
            username:username,
            dataandtime: new Date()
        },update:{
            firstname:firstname,
            lastname:lastname,
            password:password,
            username:username,
            dataandtime: new Date()
        }
    })

    console.log(storinguserdata)
    res.status(200).json({
        message: "User created or updated successfully",
        user: storinguserdata
    })
   } catch (error) {
    console.log("your error :" , error)
    res.status(500).json({
        message: "Internal server error"
    })
   }

})

user.post("/login" , async (req,res)=>{
        
    const loginschema = z.object({
        username:z.string().min(2),
        password:z.string().min(2)
    })

    const verifiedbody = loginschema.safeParse(req.body)
    if(!verifiedbody.success){
        res.json({
            message:"enter valid data "
        })

        return
    }

    const existinguser = await prisma.userschema.findUnique({
        where:{
            username:verifiedbody.data?.username,
            password:verifiedbody.data?.password
        }
    })

    if(!existinguser){
        res.json({
            message:"User doesn't exist please sign up first "
        })
    }

    const token =  jwt.sign({ id: existinguser?.id}, JWT_SECRET )

    res.status(200).json({
            message:"successfully login" , 
            token
    })
})