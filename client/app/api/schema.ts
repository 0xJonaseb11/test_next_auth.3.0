

import joi from 'joi';

export const userSchema= joi.object({
    firstName: joi.string().min(3).required(),
    lastName:joi.string().min(3).required(),
    email:joi.string().email().required(),
    password:joi.string().required()
})