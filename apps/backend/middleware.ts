import type { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";


export function middlware(req:Request, res:Response, next:NextFunction){
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({
            message: "please enter session token",
        });
    }

    // Support both: "Bearer <token>" and "<token>"
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    try {
        const verifiedtoken = jwt.verify(token as string, process.env.JWT_SECRET!);
        if (verifiedtoken) {
            //@ts-ignore
            req.userid = (verifiedtoken as any).id;
            next();
            return;
        }

        return res.status(401).json({
            message: "login failed",
        });
    } catch (error) {
        return res.status(401).json({
            message: "invalid token",
        });
    }

} 