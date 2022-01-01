const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const StudentGrievance = new Schema({
    rollNumber : {
        type:String,
        required:true
    },
    studentName : {
        type:String,
        required:true
    },
    mail : {
        type:String,
        required:true
    },
    hallOfResidence : {
        type:String,
        required:true
    },
    subject : {
        type:String,
        required:true
    },
    grievanceDescription : {
        type:String,
        required:true
    },
    supportingFiles : {},
    timeStamp : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("studentGrievance",StudentGrievance)