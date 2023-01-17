exports.getKeyColums = function(fieldMap) {
  try {
    let uniqueKeys = new Map()

    for (const item of fieldMap[Symbol.iterator]()) {
      let keyID = item[1].uniqueKeyID
  
      if (!keyID) {
        continue;
      }
  
      if (uniqueKeys.has(keyID)) {
        uniqueKeys.get(keyID).push(item[1].colIndex)
      } else {
        uniqueKeys.set(keyID, [item[1].colIndex])
      }
    }

    return uniqueKeys;
  } catch(err) {
    console.log(err)
  }
}