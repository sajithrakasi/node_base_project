const Joi = require("@hapi/joi");

/**
 * createStudentSubValidation Validation
 */
const createStudentSubValidation = Joi.object({
    name: Joi.string().min(3).required(),
    studentId: Joi.number().required(),
    subjectId: Joi.number().required(),
    subcode: Joi.number().required(), // Ensure Subcode is included
});

/**
 * listStudentSubValidation Validation
 */
const listStudentSubValidation = Joi.object({
    page: Joi.number().required(),
    per_page: Joi.number().required()
}).options({ allowUnknown: true });

const updateStudentSubValidation = Joi.object({
    name: Joi.string().min(3).optional(),  // Name is optional
    studentId: Joi.number().optional(),
    subjectId: Joi.number().optional(),
    subcode: Joi.number().optional(), // Ensure Subcode is included
}).options({ allowUnknown: true });

module.exports = {
    createStudentSubValidation,
    listStudentSubValidation,
    updateStudentSubValidation
};
