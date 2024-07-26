const express = require('express')
const con = require('./mysql_con')
const selfRegisterData = require('../controler/selfRegisterData')

const router = express.Router()

// CRUD API
 
router.post('/register', selfRegisterData.reg) // Creat

router.get('/register/list', selfRegisterData.regList);  //Reat

router.put('/forgot_password/:id', selfRegisterData.forgot ); //Update

router.post('/login/delete/:id', selfRegisterData.loginDelete); //Delete

router.post('/login', selfRegisterData.login);

router.get('/login/list', selfRegisterData.loginList);


module.exports = router