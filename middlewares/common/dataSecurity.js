const { decryptData, getdata, encryptMessage } = require('../../helpers/yosiDataSecurityHelpers');
const {getFailedMessage} = require('../../helpers/yosiConstantHelper')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {Json} || Next()
 */
module.exports =  async  function(req, res, next) {
    //If encrypt flag disabled
    if(process.env.IS_INPUT_OUTPUT_ENCRYPT == false)  return next() 
    //process for encrypted
    const inputData = req.body;
    if ('params' in inputData){
        const decryptedData = await decryptData(inputData['params'])
        
        if(decryptedData){
            try {
                const data =  await getdata("dec")
                const inputData = JSON.parse(data);
                req.body = {
                    ...req.body,          // Spread the original request body
                    ...inputData        // Spread the decoded JSON data
                };
                return next()
            } catch (error) {
                // If Not valid Json   
                return res.status(400).send( await encryptMessage(getFailedMessage(error.message)));
            }
           
        }else{
            // If Not valid string
            return res.status(400).send( await encryptMessage(getFailedMessage("Bad parameters")));
        }
    }else{
        // If params is missing 
        return res.status(400).send( await encryptMessage(getFailedMessage("Params Input is Missing")));
    }
}
