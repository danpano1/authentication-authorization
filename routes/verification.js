const express = require('express');
const {User} = require('../models/user')
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const asyncHandler = require('../middleware/asyncHandler');


router.get('/:token', asyncHandler(async (req, res)=>{
    const token = req.params.token;
    
    try {
        const user = jwt.verify(token, config.get('jwtPrivateKey'));
        await User.findByIdAndUpdate(user._id, {isEmailVerified: true});
        res.send('Account veryfied!')
    }
    catch(err){
        res.status(400).send('Invalid token')
    }


}));

module.exports = router;