import Joi from 'joi';

export const editPasswordSchema = Joi.object({
  confirmNewPassword: Joi.ref('newPassword'),
  // description: Joi.string()
  //   .min(1)
  //   .message('Code should have at least 1 character')
  //   .required(),
  // endDate: Joi.string().optional().allow(''),
  // location: Joi.string()
  //   .min(5)
  //   .message('Location should have at least 5 letters')
  //   .required(),
  // // .message('Code is required'),
  // startDate: Joi.string().optional().allow(''),
  // title: Joi.string()
  //   .min(5)
  //   .message('Name should have at least 5 letters')
  //   .required(),
  currentPassword: Joi.required().messages({
    'any.required': 'Current Password is required',
    'string.empty': 'Current password cannot be empty',
  }),
  newPassword: Joi.required().invalid(Joi.ref('currentPassword')).messages({
    'any.invalid': 'Current password and new password should not match',
    'any.required': 'New Password is required',
    'string.empty': 'New password cannot be empty',
  }),
});
