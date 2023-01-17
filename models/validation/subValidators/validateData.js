let lineError = require('../LineError');

exports.validateData = function(equipmentList, fieldMap, errors) {
  let counter = 2;

  for (let equipment of equipmentList) {
    for (const item of fieldMap[Symbol.iterator]()) {
      let column = item[0];
      let vStr = item[1].validationString;
      let attr = equipment[column];

      if (!vStr) {
        continue;
      }

      let reg = new RegExp(vStr)

      // If required, validate it.
      // If the field is missing, don't validate it as we will already get an error
      if (item[1].isRequired && item[1].colIndex != null) {
        if (attr == '') {
          errors.push(new lineError(` ${column} column cannot contain empty values`, attr, counter));
        } else if (!reg.test(attr)) {
          errors.push(new lineError(`Invalid data for ${column}`, attr, counter));

          // If not required, but not empty, validate it 
        } else if (!item[1].isRequired && (attr !== '')) {

          if (!reg.test(attr)) {
            errors.push(new lineError(`Invalid data for ${column}`, attr, counter));
          }
        }
      }

      // Validate column lengths
      if(item[1].maxLength != null && attr !== '') {
        if (attr.length > item[1].maxLength) {
          errors.push(new lineError(`Data too long for ${column}. Max ${item[1].maxLength} characters`, attr, counter));
        }
      }
    }

    counter ++;
  }
}