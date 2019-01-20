const express = require('express');
const {User} = require('../models/user')
const jwtAuth = require('../middleware/authorization');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');

router.get('/', jwtAuth, asyncHandler(async (req, res)=>{
    
    const user = await User.findById(req.user._id)

    const userInfo = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }
    res.send(userInfo);
}));

module.exports = router;