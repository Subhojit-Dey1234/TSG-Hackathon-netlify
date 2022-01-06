const router = require("express").Router();
const Officials = require('../models/Officials.js')
const jwt = require("jsonwebtoken");

// login
router.post('/login-officials', async(req,res)=>{
    let officials = await Officials.findOne({
        mail : req.body.mail,
        username: req.body.username
    })

    if(officials){
        if(officials.password === req.body.password){
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.send(200).json({
                success : "Password Matched.",
                accessToken,
            })
        }
    }
    else{
        res.json(404).send("No user found")
    }
})

module.exports = router