const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user',
        require: true
    },
    password:{
        type:String,
        require:true
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;