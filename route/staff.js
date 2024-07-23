const express = require('express')
const con = require('./mysql_con')
const staffData = require('../controler/staffData')

const router = express.Router()

// CRUD API
 
router.post('/register', staffData.reg) // Creat

router.get('/register/view', staffData.view);  //Reat

router.put('/edit/:id', staffData.edit ); //Update

router.post('/login/delete/:id', staffData.deleteConsu); //Delete




module.exports = router