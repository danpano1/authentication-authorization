const express = require('express');
const {User} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const asyncHandler = require('../middleware/asyncHandler');

router.post('/', asyncHandler (async (req, res)=>{
    const { error } = validation(req);

    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect) return res.status(400).send('Invalid email or password');

    if(!user.isEmailVerified) return res.status(401).send('Please verify your email first');

    res.send(user.generateJWT());
    }));

validation = (req) =>{
    
    const schema = {
        email: Joi.string().required(),
        password: Joi.string().required()
    }   
    return Joi.validate(req.body, schema);
}
module.exports = router;