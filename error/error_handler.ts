import { type Request,type Response,type NextFunction } from "express";

export const error_handler = (err:unknown,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof Error){
        console.error(err.stack);
        res.status(500).json({message:err.message});
    }
    res.status(500).json({message:'Internal server error'});
}