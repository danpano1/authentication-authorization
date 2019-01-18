const express = require('express');
const {User, validation} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const mailVerification = require('../emails/verifyMail');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res)=>{

    const {error} = validation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email:req.body.email })
    if (user) return res.status(400).send('Email already in use');

        const userRegistering = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(userRegistering.password, salt);
    userRegistering.password = hashedPassword;
    

    const token = jwt.sign({_id:userRegistering._id}, 'privateKey')
    
    try {
       await mailVerification(userRegistering, `http://localhost:8080/api/verification/${token}`);
       await userRegistering.save();
       res.send({
           _id: userRegistering._id,
           name: userRegistering.name,
           email: userRegistering.email
       });
    }
    catch(err){
        res.status(500).send(err.errmsg);
    }

})

module.exports = router;