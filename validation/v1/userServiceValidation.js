const Joi = require("@hapi/joi");

/**
 * createUserValidation Validation
 */
const createUserValidation = Joi.object({
    user_name: Joi.string().min(3).required(),
    email: Joi.string().min(6).email().lowercase().required(),
    password:Joi.string().min(6).max(15),
    password_confirmation: Joi.any().valid(Joi.ref('password'))
                              .required() 
                              .label('Confirm password')
                              .messages({ 'any.only': '{{#label}} does not match' })
  }).options({ allowUnknown: true });

  /**
   * listUsersValidation validation
   */
const listUsersValidation = Joi.object({
  page:Joi.number().required(),
  per_page:Joi.number().required()
}).options({ allowUnknown: true });


  module.exports = {
    
    createUserValidation,
    listUsersValidation
  }