const express = require('express');
const {User} = require('../models/user')
const jwtAuth = require('../middleware/authorization');
const router = express.Router();

router.get('/', jwtAuth, async (req, res)=>{
    
    const user = await User.findById(req.user._id)

    const userInfo = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }
    res.send(userInfo);
});

module.exports = router;