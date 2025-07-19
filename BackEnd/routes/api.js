const express = require('express');
const {createUser, handleLogin, getUser, getAccount} = require('../controllers/userControllers.js');
const {createTask, getAllTask, updateTask, deleteTask} = require('../controllers/taskControllers.js')
const routerAPI = express.Router();
const auth = require('../middleware/auth.js');

routerAPI.all('/{*any}', auth)

routerAPI.get('/', (req, res) => {
    return res.status(200).json("Welcome to API v1");
})

routerAPI.post('/register', createUser)
routerAPI.post('/login', handleLogin)
routerAPI.get('/user', getUser)
routerAPI.get('/account', getAccount)

routerAPI.post('/task/create', createTask)
routerAPI.get('/task/getTask', getAllTask)
routerAPI.post('/task/update', updateTask)
routerAPI.post('/task/delete', deleteTask)

module.exports = routerAPI; //export default