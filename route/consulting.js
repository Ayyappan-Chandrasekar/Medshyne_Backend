const express = require('express')
const con = require('./mysql_con')
const ConsultingData = require('../controler/ConsultingData')

const router = express.Router()

// CRUD API
 
router.post('/register', ConsultingData.reg) // Creat

router.get('/register/view', ConsultingData.view);  //Reat

router.put('/edit/:id', ConsultingData.edit ); //Update

router.post('/login/delete/:id', ConsultingData.deleteConsu); //Delete




module.exports = router