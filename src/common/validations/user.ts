import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message('Invalid Email')
    .required(),
  firstName: Joi.string()
    .min(6)
    .message('First name should have at least 6 characters')
    .required(),
  lastName: Joi.string()
    .min(1)
    .message('Last name should have at least 1 character')
    .required(),
  middleName: Joi.string().optional().allow(''),
  password: Joi.string().required(),
  role: Joi.string().required(),
  username: Joi.string().required(),
});

export const editUserSchema = createUserSchema;
