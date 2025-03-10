import Jwt from "jsonwebtoken";
import { type Request,type Response,type NextFunction } from "express";
import { logger } from "../logger/logger";

const jwt_secret = process.env.jwt_s
if(!jwt_secret){
   throw new Error('jwt secret missing');
}

export const authorization = (req:Request,res:Response,next:NextFunction)=>{
    const header = req.headers['authorization']
    if(!header){
        res.status(403).json({message:'not authorized'});
        return;
    }
    try {
        
        const verify_token = Jwt.verify(header,jwt_secret) as {name:string};
        req.user=verify_token.name
        next()
    } catch (error) {
        logger.error(error);
        res.status(401).json({message:'Unauthorized: Invalid token'});
    }
}