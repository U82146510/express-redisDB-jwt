import { Router } from "express";
import {delete_usr,login_usr,register_usr} from '../controller/user.ts';
import {authorization} from '../middleware/auth.ts'
export const user:Router = Router();
user.post('/register',register_usr);
user.post('/login',login_usr);
user.post('/delete',authorization,delete_usr);