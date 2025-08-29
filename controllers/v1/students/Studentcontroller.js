
const db = require('../../../models/index'); // Path to your db file // Use models in your queries or associations here
const Studentmodel = db.Studentmodel;
const Subjectmodel = db.Subjectmodel; 
const Markmodel = db.Markmodel; 

const { createStudentValidation, listStudentValidation, updateStudentValidation } = require("../../../validation/v1/Studentvalidation");
const { encryptMessage } = require("../../../helpers/yosiDataSecurityHelpers");
const { getSuccessMessage, getFailedMessage } = require("../../../helpers/yosiConstantHelper");


let isError = 0;
let Message = '';

// Create a student
const createStudent = async (req, res) => {
    try {
        const validationError = await checkValidation(createStudentValidation, req.body);
        if (validationError) {
            return res.status(400).send(validationError);
        }
        const { name, age, class: studentClass, student_code} = req.body;
        
         // Encrypt the name
         const encryptedName = await encryptMessage(name);

        const existingStudent = await Studentmodel.findOne({ where: { student_code } });
        if (existingStudent) {
            return res.status(409).send(await setMessage(true, 'A student with this ID already exists.'));
        }
        const student = await Studentmodel.create({ name:encryptedName.result, age, class: studentClass, student_code });
        
        return res.status(201).send(await setMessage(false, 'Student created successfully', student));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

// List all students
const listStudents = async (req, res) => {
    try {
        const validationError = await checkValidation(listStudentValidation, req.body);
        if (validationError) {
            return res.status(400).send(validationError);
        }
        const students = await Studentmodel.findAll();
        return res.status(200).send(await setMessage(false, 'Students listed successfully', students));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

// Update a student by ID
const updateStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const validationError = await checkValidation(updateStudentValidation, req.body);
        if (validationError) {
            return res.status(400).send(validationError);
        }
        await Studentmodel.update(req.body, { where: { id } });
        const updatedStudent = await Studentmodel.findOne({ where: { id } });
        return res.status(200).send(await setMessage(false, 'Student updated successfully', updatedStudent));
    } catch (error) {
        return res.status(500).send(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Studentmodel.findOne({ where: { id } });
        if (!student) {
            return res.status(404).json(await setMessage(true, 'Student not found'));
        }
        return res.status(200).json(await setMessage(false, 'Student found successfully', student));
    } catch (error) {
        return res.status(500).json(await setMessage(true, error.message || 'Internal Server Error'));
    }
};

const getStudentMarksById = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the student with their marks and subjects
        const student = await Studentmodel.findOne({
            where: { id }, // Fetch a single student by ID
            attributes: ['id', 'name', 'age', 'class', 'student_code'], // Fetch only the required attributes
            include: [
                {
                    model: Markmodel, // Fetch marks
                    attributes: ['marks'], // Fetch the marks
                    include: [
                        {
                            model: Subjectmodel, // Fetch the associated subject
                            attributes: ['subcode', 'name'], // Adjust based on your subject model
                        }
                    ],
                }
            ]
        });

        // Check if the student exists
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        const marks = student.studentmarks || [];
        const totalMarks = marks.reduce((acc, mark) => acc + mark.marks, 0); // Calculate total marks
        // Transform the student and their marks into the desired format
        
        const result = {
            id: student.id,
            name: student.name,
            age: student.age,
            class: student.class,
            student_code: student.student_code,
            totalMarks,
            marks: student.studentmarks.map((mark) => {
                return {
                    subjectId: mark.subjectId,
                    name:mark.subject.name, // Name of the subject
                    subcode: mark.subject.subcode, // Subcode of the subject
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
const deleteStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        await Studentmodel.destroy({ where: { id } });
        return res.status(200).send(await setMessage(false, 'Student deleted successfully'));
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



const setMessage = async (isErrorFlag, message, data = null) => {
    const msg = isErrorFlag ? getFailedMessage(message, data) : getSuccessMessage(message, data);
    // const encryptedMsg = await encryptMessage(msg);
    return { success: !isErrorFlag, message, data};
};

// const setMessage =  async (data = [])=>{
//     console.log("Is Error: ", typeof(isError), " Value: ", isError); 
//    if(isError === 1){ 
//     return await encryptMessage(getFailedMessage(Message, data))
//    }
//    return await encryptMessage(getSuccessMessage(Message, data))
        
// }
module.exports = {
    createStudent,
    listStudents,
    updateStudentById,
    deleteStudentById,
    getStudentById,
    getStudentMarksById
};
