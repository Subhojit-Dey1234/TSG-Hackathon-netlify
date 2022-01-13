const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const AcademicsPoint = new Schema({
    name: {
        type:String,
        required:true
    },
    links : String,
    yearOfString : {
        type:String,
        required:true,
    },
    department : {
        type:String,
        required:true,
    },
    document : {},
    text : {
        type : String,
    }
})

module.exports = mongoose.model("academicPoint",AcademicsPoint)