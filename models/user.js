const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String,
        minlength: 3,
        maxlength: 100
    },
    email:{
        required: true,
        type: String,
        minlength: 5,
        maxlength: 100,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true
    },
    password:{
        required: true,
        type: String,
        minlength: 5,
        maxlength: 1000
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isEmailVerified:{
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateJWT = function(){
    
    const token = jwt.sign({
        _id: this._id,
        admin: this.isAdmin    
    }, config.get('jwtPrivateKey'));
    
    return token
}

userValidation = (user) =>{
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(100).email().required(),
        password: Joi.string().min(5).max(100).regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/).required()
    }   
    return Joi.validate(user, schema);
}

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validation = userValidation;