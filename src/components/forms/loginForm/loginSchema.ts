import joi from 'joi'
export const loginSchema = joi.object({
  password: joi.string().required().messages({
    'string.base': 'Password is required',
    'any.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
  username: joi.string().required().messages({
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
})
