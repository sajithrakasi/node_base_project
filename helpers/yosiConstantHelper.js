/**
 * 
 * @returns {number}
 */
function getValidationErrorCode(){
    return 400
}

/**
 * 
 * @returns {number}
 */
function getSuccessCode(){  
    return 200
}

/**
 * 
 * @returns {string}
 */
function getValidationErrorStatus(){
    return 'N'
}

/**
 * 
 * @returns {string}
 */
function getSuccessStatus(){
    return 'Y' 
}

/**
 * 
 * @returns {Array}
 */
function getSuccessMessage(message, data =[]){
    return {
        'success' : getSuccessStatus(),
        'message' : message,
        'data': data
    }
    
}
function getName(name, data =[]){
    return {
        'success' : getSuccessStatus(),
        'name' : name,
        'data': data
    }
    
}

/**
 * 
 * @returns {Array}
 */
function getFailedMessage(message, data =[]){
    return {
        'success' : getValidationErrorStatus(),
        'message' : message,
        'data': data
    }
}

module.exports ={
    getValidationErrorCode,
    getSuccessCode,
    getValidationErrorStatus,
    getSuccessStatus,
    getSuccessMessage,
    getFailedMessage,
    getName
}