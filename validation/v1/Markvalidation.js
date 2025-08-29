const Joi = require("@hapi/joi");

const createStudentMarkValidation = Joi.object({
    studentId: Joi.number().required(),
    subjectId: Joi.number().required(),
    marks: Joi.number().required(), // Ensure marks are included
});

const listStudentMarkValidation = Joi.object({
    page: Joi.number().required(),
    per_page: Joi.number().required()
}).options({ allowUnknown: true });

const updateStudentMarkValidation = Joi.object({
    studentId: Joi.number().optional(),
    subjectId: Joi.number().optional(),
    marks: Joi.number().optional(), // Ensure marks are included
}).options({ allowUnknown: true });

module.exports = {
    createStudentMarkValidation,
    listStudentMarkValidation,
    updateStudentMarkValidation
};
