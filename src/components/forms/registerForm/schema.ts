import joi from 'joi'

export const schema = joi.object({
  password: joi.string().required().messages({
    'string.base': 'Password is required',
    'any.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
  confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
    'any.only': 'Passwords must match',
    'any.required': 'Confirm Password is required',
  }),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
      'string.required': 'Email is required',
      'any.required': 'Email is required',
      'string.base': 'Email is required .com or .net',
    }),
})
