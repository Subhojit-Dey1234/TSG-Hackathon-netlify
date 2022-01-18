const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const CareerPoint = new Schema({
    name: {
        type:String,
        required:true
    },
    links : String,
    field : {
        type:String,
        required:true,
    },
    document : {},
    text : {
        type : String,
    },
    date : {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("careerPoint",CareerPoint)