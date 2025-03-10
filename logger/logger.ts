import winston from "winston";
import {MongoDB} from 'winston-mongodb';
import dotenv from 'dotenv';
import { error } from "console";
dotenv.config();

const atlas = process.env.atlas;
if(!atlas){
    throw new Error('atlas coonection missing in logger');
}

export const logger = winston.createLogger({
    level:'info',
    format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({
            filename:'logs/app.log'
        }),
        new MongoDB({
            db:atlas,
            collection:'redis-logs',
            tryReconnect:true
        })
    ]
});