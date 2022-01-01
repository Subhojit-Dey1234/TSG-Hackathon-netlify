const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const Students = new Schema({
    mail:{
        type:String,
        required:true,
    },
    name: String,
    rollNumber: String,
    type : String
})

module.exports = Student = mongoose.model("users",Students);