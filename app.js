const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const dotenv =require('dotenv')
const selfRegister = require('./route/selfRegister');
const register = require('./route/register');
const dashboard = require('./route/dashboard');
const staff = require('./route/staff');
const student = require('./route/student');
const consulting = require('./route/consulting');
const portN = process.env.port

const app = express()

dotenv.config({path: path.join(__dirname, 'config', 'temp.env')})

app.use(bodyParser.json());

app.use('/self',selfRegister)
app.use('/register',register)
app.use('/dashboard',dashboard)
app.use('/staff',staff)
app.use('/student',student)
app.use('/consulting',consulting)


app.listen(process.env.port,()=>{
    console.log(`Server ${process.env.port} connected successfully`)
})