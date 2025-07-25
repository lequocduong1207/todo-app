require("dotenv").config();
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        const user = await User.findOne({ email });

        if (user) {
            return {
                EC: 3,
                EM: "Email đã tồn tại, vui lòng sử dụng email khác"
            };
        }

        const hashPassword = await bcrypt.hash(password, saltRounds)

        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "DEMO"
        })

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });

        if (user) {
            const isMatchPassword = await bcrypt.compare(password, user.password);

            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "Email/Password không hợp lệ"
                }
            } else {
                const payload = {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                }

                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES
                    }
                )

                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                }
            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService,
    loginService,
}