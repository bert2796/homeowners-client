import Joi from 'joi';

export const createPropertySettingsSchema = Joi.object({
  description: Joi.string().optional().allow(''),
  display: Joi.string()
    .min(6)
    .message('Display should have at least 6 character')
    .required(),
  name: Joi.string()
    .min(6)
    .message('Name should have at least 6 characters')
    .required(),
});

export const editPropertySettingsSchema = createPropertySettingsSchema;
