let lineError = require('../LineError');

exports.validateUniqueKeys = function(equipmentList, errors) {
  let keyStrings = [];

  // Counter starts at 2 to compensate for excel line indexes
  let counter = 2;

  // Push keys to array
  for (let equipment of equipmentList) {
    let update = equipment['Update To'] !== '' ? true : false;
    let project = equipment['Project']
    let number = !update ? equipment['Equipment Number'] : equipment['Update To']
    let key = `${project}${number}`;

    key = key.toLocaleLowerCase().replace(/\s/g, '');
    keyStrings.push({ key, counter });

    counter++;
  }

  // Filter just duplicates
  const duplicates = keyStrings.filter((key, index, self) =>
    index !== self.findIndex((t) => (
      t.key === key.key
    ))
  )

  const duplicateKeys = Array.from(Object.values(duplicates), (d) => d.key);

  let duplicateLinesByKey = {};

  keyStrings.filter(string => {
    if(duplicateKeys.indexOf(string.key) > -1){
      if(typeof duplicateLinesByKey[string.key] === 'undefined'){
        duplicateLinesByKey[string.key] = [];
      }
      duplicateLinesByKey[string.key].push(string.counter)
    }
  })

  for(const [ key, values ] of Object.entries(duplicateLinesByKey)){
    const msg = values.slice(0, values.length - 1).join(', ') + ' and ' + values[values.length - 1];
    errors.push(new lineError("Duplicate key value", key, msg))
  }
}