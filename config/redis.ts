import {createClient} from 'redis';
import {logger} from '../logger/logger.ts'

export const connect_redis = createClient({
    socket:{
        host:"127.0.0.1",
        port:6379
    }
});

connect_redis.on('error',(error)=>{
    logger.error(error);
    process.exit(1);
});