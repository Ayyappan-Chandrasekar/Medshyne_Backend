const express = require('express')
const con = require('./mysql_con')
const studentData = require('../controler/studentData')

const router = express.Router()

// CRUD API
 
router.post('/register', studentData.reg) // Creat

router.post('/parent/register', studentData.parentreg) // Creat

router.get('/register/view', studentData.view);  //Reat

router.put('/edit/:id', studentData.edit ); //Update

router.post('/register/delete/:id', studentData.deleteConsu); //Delete




module.exports = router