const express = require('express')
const con = require('./mysql_con')
const registerData = require('../controler/registerData')

const router = express.Router()

// CRUD API
 
router.post('/register', registerData.reg) // Creat

router.get('/register/list', registerData.regList);  //Reat

router.put('/forgot_password/:id', registerData.forgot ); //Update

router.post('/login/delete/:id', registerData.loginDelete); //Delete

router.post('/login', registerData.login);

router.get('/login/list', registerData.loginList);


module.exports = router