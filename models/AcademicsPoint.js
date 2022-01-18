const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const AcademicsPoint = new Schema({
    name: {
        type:String,
        required:true
    },
    year : {
        type:String,
        required:true,
    },
    department : {
        type:String,
        required:true,
    },
    books : {},
    notes : {},
    pyqp : {},
    subjectCode : {
        type : String,
    },
    date : {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("academicPoint",AcademicsPoint)