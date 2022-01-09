const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const SocietyPoint = new Schema({
    rollNumber : {
        type:String,
        required:true
    },
    document : {},
    verificationStatus : {
        type:String,
        required:true
    },
    remarks:{
        type:String
    }
})

module.exports  = mongoose.model("SocietyPoint", SocietyPoint);