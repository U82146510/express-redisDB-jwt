import { type Request,type Response,type NextFunction } from "express";
import {set_data,get_data,delete_data} from '../services/redis';
import { logger } from "../logger/logger";
import {register_user,delete_user,login_user} from '../validators/user_validator.ts';
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const jwt = (payload:{name:string})=> {
    const jwt_secret = process.env.jwt_s
    if(!jwt_secret){
        throw new Error('jwt secret missing');
    }
    const token = Jwt.sign(payload,jwt_secret,{
        expiresIn:'15m'
    });
    return token;
}

export const register_usr = async(req:Request,res:Response,next:NextFunction)=>{
    const {value,error} = register_user.validate(req.body);
    try {
        if(error){
            res.status(400).json({message:error.message});
            return;
        }
        await set_data(value.name,{email:value.email,password:value.password});
        res.status(201).json({message:`user ${value.name} registered`});
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const login_usr = async(req:Request,res:Response,next:NextFunction)=>{
    const {value,error} = login_user.validate(req.body);
    if(error){
        res.status(400).json({message:error.message});
        return;
    }
    try {
        const data = await get_data(value.name);
        if(data === "not found" || data === 'error'){
            res.status(404).json({message:data});
            return;
        }
        const token = jwt({name:value.name})
        res.status(201).json({message:'successfully',token})
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const delete_usr = async(req:Request,res:Response,next:NextFunction)=>{
    const {value,error} = delete_user.validate(req.body);
    try {
        if(error){
            res.status(400).json({message:error.message});
            return;
        }
        const data = await delete_data(value.name);
        if(data===0){
            res.status(400).json({message:'error durring deleting'});
            return;
        }
        res.status(200).json({message:'delete successfully'})
    } catch (error) {
        logger.error(error);
        next(error);
    }
};