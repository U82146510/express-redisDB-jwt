import {connect_redis} from './config/redis.ts';
import express,{type Application} from 'express';
import { logger } from './logger/logger.ts';
import {user} from './routes/user.ts';
import {error_handler} from './error/error_handler.ts';

const app:Application = express();
const port:number = 3000;

app.use(express.json());
app.use('/',user);
app.use(error_handler);
const start = async()=>{
    try {
        await connect_redis.connect();
        app.listen(port,()=>console.log("On"));
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
};

start()