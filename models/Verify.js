const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const VerifyUser = new Schema({
    mail:{
        type:String,
        required:true,
    },
    otp:{
        type: Number,
        required: true,
    }
})

module.exports = Verify = mongoose.model("verify-users",VerifyUser);