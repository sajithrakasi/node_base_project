const config = require('../../../config/config');
const userModel = require('../../../models/users')
const { createUserValidation , listUsersValidation} = require("../../../validation/v1/userServiceValidation");
const {encryptMessage} = require("../../../helpers/yosiDataSecurityHelpers")
const {getValidationErrorCode, getSuccessCode, getValidationErrorStatus, getSuccessStatus, getSuccessMessage, getFailedMessage} = require("../../../helpers/yosiConstantHelper")

// Gobal Variables
let isError = 0
let Message = ''

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createUser = async (req, res) => {
    try {
        //Request Validation
        if(! await checkValidation(createUserValidation, req.body)){
                return res.status(200).send( await setMessage());
        }
        //Get the values from req body
        const { user_name, email,password } = req.body;
        //check Email already exist
        const emailExists = await userModel.isEntityExist('email', email);
        if (emailExists) {
            isError = 1
            Message = 'Email already exists'
            return res.status(400).send( await setMessage());
        }
        //create User
        const newUser = await userModel.create({ user_name, email, password });
        Message = 'User created successfully'
        return res.status(201).send( await setMessage(newUser));
    } catch (error) {
        isError = 1
        Message = error
        return res.status(500).send( await setMessage()); 
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const listUsers = async (req, res) => {
    //Request Validation
    if(! await checkValidation(listUsersValidation, req.body)){
        return res.status(200).send( await setMessage());
    }
    const {page, per_page } = req.body 
    let options = await getFilterOption(page, per_page)
    // Fetch users from the database with limit and offset
    const users = await userModel.findAndCountAll(options);
    let data ={
        content: users.rows,
        totalPages: Math.ceil(users.count / per_page),
        currentPage: parseInt(page),
        pageSize: parseInt(per_page),
        totalCount: users.count
    }
    Message = 'User listed successfully'
    return res.status(200).send( await setMessage(data));
};

/**
 * 
 * @param {*} page 
 * @param {*} per_page 
 * @returns  {array}
 */
function getFilterOption(page, per_page){
    let limit = parseInt(per_page);
    let offset = (parseInt(page) - 1) * parseInt(per_page);
    return {
        attributes: [
          "id",
          "user_name",
          "email",
          "created_at",
          "updated_at",
        ],
        limit: limit,
        offset: offset,
        distinct:true,
      };
}

/**
 * 
 * @param {*} schma 
 * @param {*} data 
 * @returns {Boolean}
 */
const checkValidation = (schma, data) => {

    const validatedData = schma.validate(data, { abortEarly: false });
    if (validatedData.error){
        isError = 1
        Message = validatedData.error.details.map(err => err.message)
        return false
    }
    return true
};

/**
 * 
 * @returns {JSON}
 */
const setMessage =  async (data = [])=>{
    console.log("Is Error: ", typeof(isError), " Value: ", isError); 
   if(isError === 1){ 
    return await encryptMessage(getFailedMessage(Message, data))
   }
   return await encryptMessage(getSuccessMessage(Message, data))
        
}

module.exports = {
    createUser,
    listUsers
  };
  