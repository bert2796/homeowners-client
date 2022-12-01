import Joi from 'joi';

export const createPropertySchema = Joi.object({
  amount: Joi.number()
    .min(1)
    .message('Amount should have at least 1 value')
    .required(),
  bathrooms: Joi.number()
    .min(1)
    .message('Bathrooms should have at least 1 value')
    .required(),
  // .message('Bathrooms is required'),
  bedrooms: Joi.number()
    .min(1)
    .message('Bedrooms should have at least 1 value')
    .required(),
  // .message('Bedrooms is required'),
  code: Joi.string()
    .min(1)
    .message('Code should have at least 1 character')
    .required(),
  // .message('Code is required'),
  description: Joi.string().optional().allow(''),
  location: Joi.string()
    .min(5)
    .message('Location should have at least 5 letters')
    .required(),
  // .message('Location is required'),
  name: Joi.string()
    .min(5)
    .message('Name should have at least 5 letters')
    .required(),

  propertyLocationBlockId: Joi.number().required(),

  propertyLocationPhaseId: Joi.number().required(),
  // .message('Name is required'),
  propertyTypeId: Joi.number().required(),
  // .message('PropertyTypeId is required'),
});

export const editPropertySchema = createPropertySchema;
