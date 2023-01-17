const express = require('express');
const router = express.Router();

const csv = require('csvtojson');
const { validateEquipment } = require('../models/validation/validateEquipment');
const { equipmentMap } = require('../models/validation/validationMaps');

router.get('/', async function(req, res, next) {
  try {
    const jsonArray = await csv().fromFile('./equipment_list.csv');
  
    const { errorsByType } = await validateEquipment(jsonArray, equipmentMap);

    res.render('index', { errorsByType });
  } catch (err){
    console.log(err)
  }
});

module.exports = router;
