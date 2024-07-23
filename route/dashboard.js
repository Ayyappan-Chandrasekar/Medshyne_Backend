const express = require('express')
const con = require('./mysql_con')
const dashboardData = require('../controler/dashboardData')

const router = express.Router()

// CRUD API
 
router.post('/register', dashboardData.reg) // Creat

router.get('/register/view', dashboardData.view);  //Reat

router.put('/edit/:id', dashboardData.edit ); //Update

router.post('/login/delete/:id', dashboardData.deleteConsu); //Delete




module.exports = router