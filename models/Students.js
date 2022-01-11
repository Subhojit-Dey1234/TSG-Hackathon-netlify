const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const Students = new Schema({
    name : String,
    mail:{
        type:String,
        required:true,
    },
    name: String,
    hallOfResidence : {
        type: String,
        required: true
    },
    rollNumber: String,
    type : String,
    participatedEvents : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Events"
        }
    ]
})

module.exports = Student = mongoose.model("users",Students);