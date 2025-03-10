import {connect_redis} from '../config/redis.ts';
import { logger } from '../logger/logger.ts';

export const set_data = async(name:string,value:{email:string,password:string}):Promise<"ok"|string>=>{
    try {
        if(!name||!value){
            throw new Error('missing key or value for redis');
        }
        const data = await connect_redis.set(name,JSON.stringify(value));
        if(!data){
            throw new Error("error during the set method");
        }
        return data;
    } catch (error) {
        logger.error(error);
        return "error during the set method"
    }
    
};

function assertUser(value:any):asserts value is {email:string,password:string}{
    if(!value || !("email" in  value)|| value === null){
        throw new Error('incorrect object')
    }
}

export const get_data = async(name:string):Promise<{email:string,password:string}|string>=>{
    try {
        if(!name){
            throw new Error('missing key for redis');
        }
        const user = await connect_redis.get(name);
        if(!user){
            return 'not found'
        }
        const data = JSON.parse(user);
        assertUser(data);
        return data 
    } catch (error) {
        logger.error(error);
        return "error"
    }
};
export const delete_data = async(name:string):Promise<number>=>{
    try {
        if(!name){
            throw new Error('missing key for redis');
        }
        return await connect_redis.del(name);
    } catch (error) {
        logger.error(error);
        return 0
    }
};