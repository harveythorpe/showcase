const express = require('express');
const router = express.Router();

const csv = require('csvtojson');
const vd = require('../models/validation/validators');
const vdm = require('../models/validation/validationMaps');

router.get('/', async function(req, res, next) {
  try {
    const jsonArray = await csv().fromFile('./equipment_list.csv');

    let errors = [];
  
    await vd.validateEquipment(jsonArray, vdm.equipmentMap, errors);
  console.log(errors)
    res.render('index', { errors });
  } catch (err){
    console.log(err)
  }
});

module.exports = router;
