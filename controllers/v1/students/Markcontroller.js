const Markmodel = require('../../../models/Markmodel');
const { createStudentMarkValidation, listStudentMarkValidation, updateStudentMarkValidation } = require("../../../validation/v1/Markvalidation");
const { encryptMessage } = require("../../../helpers/yosiDataSecurityHelpers");
const { getSuccessMessage, getFailedMessage } = require("../../../helpers/yosiConstantHelper");

let isError = 0;
let Message = '';

// Create a student mark
const createStudentMark = async (req, res) => {
    try {
        const validationError = await checkValidation(createStudentMarkValidation, req.body);
        if (validationError) {
            return res.status(400).send(validationError);
        }

        const { studentId, subjectId, marks } = req.body;

        const existingStudentMark = await Markmodel.findOne({ where: { studentId, subjectId } });
        if (existingStudentMark) {
            return res.status(409).send(await setMessage(true, 'Marks for this student and subject already exist. Please update the existing record.'));
        }

        const studentMark = await Markmodel.create({ studentId, subjectId, marks });
        return res.status(201).send(await setMessage(false, 'Student mark created successfully', studentMark));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

// List all student marks
const listStudentMark = async (req, res) => {
    try {
        const validationError = await checkValidation(listStudentMarkValidation, req.body);
        if (validationError) {
            return res.status(400).send(validationError);
        }
        const studentMark = await Markmodel.findAll();
        return res.status(200).send(await setMessage(false, 'StudentMark listed successfully', studentMark));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

// Update a student mark by ID
const updateStudentMarkById = async (req, res) => {
    try {
        const { id } = req.params;
        const validationError = await checkValidation(updateStudentMarkValidation, req.body);
        if (validationError) {
            return res.status(400).send(validationError);
        }
        
        const existingStudentMark = await Markmodel.findOne({ where: { id } });
        if (!existingStudentMark) {
            return res.status(404).send(await setMessage(true, 'No marks found for this student. Please provide a valid student mark ID.'));
        }

        await Markmodel.update(req.body, { where: { id } });
        const updatedStudentMark = await Markmodel.findOne({ where: { id } });
        return res.status(200).send(await setMessage(false, 'Student mark updated successfully', updatedStudentMark));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

// Get a student mark by ID
const getStudentMarkById = async (req, res) => {
    try {
        const { id } = req.params;
        const studentMark = await Markmodel.findOne({ where: { id } });
        if (!studentMark) {
            return res.status(404).json(await setMessage(true, 'StudentMark not found'));
        }
        return res.status(200).json(await setMessage(false, 'StudentMark found successfully', studentMark));
    } catch (error) {
        return res.status(500).json(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

// Delete a student mark by ID
const deleteStudentMarkById = async (req, res) => {
    try {
        const { id } = req.params;
        await Markmodel.destroy({ where: { id } });
        return res.status(200).send(await setMessage(false, 'StudentMark deleted successfully'));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

const checkValidation = (schema, data) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        isError = 1;
        Message = error.details.map(err => err.message).join(', ');
        return { success: false, message: Message };
    }
    return null;
};

// const setMessage = async (isErrorFlag, message, data = null) => {
//     const msg = isErrorFlag ? getFailedMessage(message, data) : getSuccessMessage(message, data);
//     // const encryptedMsg = await encryptMessage(msg);
//     return { success: !isErrorFlag, message, data};
// };

const setMessage =  async (data = [])=>{
    console.log("Is Error: ", typeof(isError), " Value: ", isError); 
   if(isError === 1){ 
    return await encryptMessage(getFailedMessage(Message, data))
    
   }
   return await encryptMessage(getSuccessMessage(Message, data))
        
}

// Delete all student marks by student ID


module.exports = {
    createStudentMark,
    listStudentMark,
    updateStudentMarkById,
    deleteStudentMarkById,
    getStudentMarkById,
    // getStudentMarksById
};
