import Joi, { string } from 'joi';

export const register_user = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
});
export const delete_user = Joi.object({
    name:Joi.string().required(),
});
export const login_user = Joi.object({
    name:Joi.string().required(),
    password:Joi.string().min(6).required()
});