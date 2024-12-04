const User = require('../models/userModel');
const createError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER USER
const signUp = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if(user){
            return next(new createError('user already exist!', 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        //CREATE NEW USER
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        // Assign JWT to user
        const token = jwt.sign({ _id: newUser._id }, 'secretKey321', {
            expiresIn: '60d'
        });

        res.status(201).json({
            status: 'success',
            message: 'user registered successfully',
            token,
            user:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role
            }
        })

    } catch (error) {
        next(error)
    }
};

//LOGIN USER
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return next(new createError("user not found", 404));

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return next(new createError("Invalid Email or Password", 401));

        // Assign JWT to user
        const token = jwt.sign({ _id: user._id }, 'secretKey321', {
            expiresIn: '60d'
        });

        res.status(201).json({
            status:"success",
            message:"Logged-in successfully",
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })

    } catch (error) {
        next(error)
    }
};

module.exports = {
    signUp,
    login
}