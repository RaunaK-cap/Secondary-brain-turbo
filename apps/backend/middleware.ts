import type { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";


export function middlware(req:Request, res:Response, next:NextFunction){
    const token = req.headers["authorization"]
    if(!token){
        res.json({
            message:"please enter session token"
        })
    }
    const verifiedtoken = jwt.verify(token as string , process.env.JWT_SECRET!)
    if(verifiedtoken){
        //@ts-ignore
        req.userid = verifiedtoken.id
        next()
        return;
    }else{
        res.json({
            message:"login failed"
        })
    }

} 