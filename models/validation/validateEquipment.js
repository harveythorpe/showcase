const { validateColumns } = require('./subValidators/validateColumns');
const { validateData } = require('./subValidators/validateData');
const { validateUniqueKeys } = require('./subValidators/validateUniqueKeys');

exports.validateEquipment = async function(equipmentList, fieldMap) {
  try {
    let errors = [];

    validateColumns(equipmentList, fieldMap, errors)

    validateData(equipmentList, fieldMap, errors)
  
    validateUniqueKeys(equipmentList, errors)

    let errorsByType = {};

    errors.forEach(error => {
      if(typeof errorsByType[error.message] === 'undefined'){
        errorsByType[error.message] = [];
      }

      errorsByType[error.message].push(error)
    })
    
    return { errorsByType }
  } catch (err){
    console.log(err)
  }
}