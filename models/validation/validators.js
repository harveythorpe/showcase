const { validateColumns } = require('./subValidators/validateColumns');
const { validateData } = require('./subValidators/validateData');
const { validateUniqueKeys } = require('./subValidators/validateUniqueKeys');


exports.validateEquipment = async function(equipmentList, fieldMap, errors) {
  validateColumns(equipmentList, fieldMap, errors)

  validateData(equipmentList, fieldMap, errors)

  validateUniqueKeys(equipmentList, errors)
}