// const { Studentmodel, Subjectmodel, Markmodel } = require("../../../models/index");
const db = require('../../../models/index'); // Path to your db file // Use models in your queries or associations here
const Studentmodel = db.Studentmodel; // Access studentSubmodel
const Subjectmodel = db.Subjectmodel; 
const Markmodel = db.Markmodel; 

const { createStudentSubValidation, listStudentSubValidation, updateStudentSubValidation } = require("../../../validation/v1/Subjectvalidation");
const { encryptMessage } = require("../../../helpers/yosiDataSecurityHelpers");
const { getSuccessMessage, getFailedMessage } = require("../../../helpers/yosiConstantHelper");


let isError = 0;
let Message = '';

// Create a student
const createStudentSub = async (req, res) => {
    try {
        const validationError = await checkValidation(createStudentSubValidation, req.body);
        if (validationError) {
            return res.status(400).send(validationError);
        }
        const { name, studentId,subjectId,subcode} = req.body;
        const studentSub = await Subjectmodel.create({ name, studentId,subjectId,subcode});
        return res.status(201).send(await setMessage(false, 'StudentSub created successfully', studentSub));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

// List all students
const listStudentSub = async (req, res) => {
    try {
        const validationError = await checkValidation(listStudentSubValidation, req.body);
        if (validationError) {
            return res.status(400).send(validationError);
        }
        const studentSub = await Subjectmodel.findAll();
        return res.status(200).send(await setMessage(false, 'StudentSub listed successfully', studentSub));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

// Update a student by ID
const updateStudentSubById = async (req, res) => {
    try {
        const { id } = req.params;
        const validationError = await checkValidation(updateStudentSubValidation, req.body);
        if (validationError) {
            return res.status(400).send(validationError);
        }
        await Subjectmodel.update(req.body, { where: { id } });
        const updatedStudentSub = await Subjectmodel.findOne({ where: { id } });
        return res.status(200).send(await setMessage(false, 'StudentSub updated successfully', updatedStudentSub));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

const getStudentSubById = async (req, res) => {
    try {
        const { id } = req.params;
        const studentSub = await Subjectmodel.findOne({ where: { id } });
        if (!studentSub) {
            return res.status(404).json(await setMessage(true, 'StudentSub not found'));
        }
        return res.status(200).json(await setMessage(false, 'StudentSub found successfully', studentSub));
    } catch (error) {
        return res.status(500).json(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

const getStudentMarksBySubjectId = async (req, res) => {
    try {
        const { subcode } = req.params;

        // Fetch the subject with its marks and associated students
        const subject = await Subjectmodel.findOne({
            where: { subcode }, // Fetch a single subject by subcode
            attributes: ['id', 'subcode', 'name'], // Fetch only the required attributes
            include: [
                {
                    model: Markmodel, // Include marks
                    attributes: ['marks'], // Fetch the marks
                    include: [
                        {
                            model: Studentmodel, // Include associated student
                            attributes: ['id', 'name'], // Fetch only required student attributes
                        },
                    ],
                },
            ],
        });

        // Check if the subject exists
        if (!subject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }

        // Transform the subject and its marks into the desired format
        const result = {
           
            id: subject.id,
            subcode: subject.subcode,
            name: subject.name,
            marks: subject.studentmarks.map((mark) => {
                return {
                    name: mark.student?.name || 'Unknown', // Name of the subject
                    marks: mark.marks, // The marks scored
                };
            }),
        };

        return res.status(200).json({
            success: true,
            data: result, // Return the formatted data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};




// Delete a student by ID
const deleteStudentSubById = async (req, res) => {
    try {
        const { id } = req.params;
        await Subjectmodel.destroy({ where: { id } });
        return res.status(200).send(await setMessage(false, 'StudentSub deleted successfully'));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

// Helper function for validation
const checkValidation = (schema, data) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        isError = 1;
        Message = error.details.map(err => err.message).join(', ');
        return { success: false, message: Message };
    }
    return null;
};


// Helper function for setting message and encryption
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

module.exports = {
    createStudentSub,
    listStudentSub,
    updateStudentSubById,
    deleteStudentSubById,
    getStudentSubById,
    getStudentMarksBySubjectId
};
