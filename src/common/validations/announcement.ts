import Joi from 'joi';

export const createAnnouncementSchema = Joi.object({
  description: Joi.string()
    .min(1)
    .message('Code should have at least 1 character')
    .required(),

  endDate: Joi.string().optional().allow(''),

  location: Joi.string()
    .min(5)
    .message('Location should have at least 5 letters')
    .required(),
  // .message('Code is required'),
  startDate: Joi.string().optional().allow(''),
  title: Joi.string()
    .min(5)
    .message('Name should have at least 5 letters')
    .required(),
});

export const editAnnouncementSchema = createAnnouncementSchema;
