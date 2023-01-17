let lineError = require('../LineError');

exports.validateColumns = function(equipmentList, fieldMap, errors) {
  let headers = Object.keys(equipmentList[0]);

  for (let col = 0; col < headers.length; col++) {
    const column = headers[col];

    let field = fieldMap.get(headers[col]);

    const inMap = fieldMap.has(column);

    if(!inMap){
      errors.push(new lineError("Column Not Valid", column, null))
    }

    if (field) {
      field.colIndex = col;
    }
  }

  // Check that All the required labels now exist in map
  for (const item of fieldMap[Symbol.iterator]()) {
    if (item[1].isRequired && item[1].colIndex == null) {
      errors.push(new lineError("Required Column Missing", item[0], 'N/A'))
    }
  }
}