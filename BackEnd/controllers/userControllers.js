const { createUserService, loginService, getUserService, forgotPasswordService} = require('../services/userService.js')
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    const data = await createUserService(username, email, password);

    res.send(data);
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    const data = await loginService(email, password);

    res.send(data);
}

const handleForgotPassword = async (req, res) => {
    const { email } = req.body;

    const data = await forgotPasswordService(email);

    res.send(data);
}

const getUser = async (req, res) => {
    const data = await getUserService();

    res.send(data);
}

const getAccount = (req, res) => {
    const data = req.user;

    res.send(data);
}

module.exports = {
    createUser, handleLogin, getUser, getAccount, handleForgotPassword
}