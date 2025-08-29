const Joi = require("@hapi/joi");

/**
 * createStudentValidation Validation
 */
const createStudentValidation = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().integer().min(5).required(), // Adjusted minimum age
    class: Joi.string().min(1).required(),
    student_code: Joi.number().required()
}).options({ allowUnknown: true });

/**
 * listStudentValidation Validation
 */
const listStudentValidation = Joi.object({
    page: Joi.number().integer().min(1).required(), // Ensure positive page numbers
    per_page: Joi.number().integer().min(1).required() // Ensure per_page is positive
}).options({ allowUnknown: true });

/**
 * updateStudentValidation Validation
 */
const updateStudentValidation = Joi.object({
    name: Joi.string().min(3).optional(),  // Name is optional
    age: Joi.number().integer().min(5).optional(), // Age must be a positive integer if provided
    class: Joi.string().min(1).optional(), // Class is optional
    student_code: Joi.number().required(),
}).options({ allowUnknown: true });

module.exports = {
    createStudentValidation,
    listStudentValidation,
    updateStudentValidation // Export the update validation
};
