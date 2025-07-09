const express = require('express');
const {createUser, handleLogin, getUser, getAccount, handleForgotPassword} = require('../controllers/userControllers.js');
const {createTask, getAllTask, updateTask, deleteTask} = require('../controllers/taskControllers.js')
const routerAPI = express.Router();
const auth = require('../middleware/auth.js');
const delay = require('../middleware/auth.js');

routerAPI.all('/{*any}', auth)

routerAPI.get('/', (req, res) => {
    return res.status(200).json("Welcome to API v1");
})

routerAPI.post('/register', createUser)
routerAPI.post('/login', handleLogin)
routerAPI.get('/forgot-password', handleForgotPassword) 
routerAPI.get('/user', getUser)
routerAPI.get('/account', delay, getAccount)

routerAPI.post('/task/create', createTask)
routerAPI.get('/task/getTask', delay, getAllTask)
routerAPI.post('/task/update', delay, updateTask)
routerAPI.post('/task/delete', delay, deleteTask)

module.exports = routerAPI; //export default