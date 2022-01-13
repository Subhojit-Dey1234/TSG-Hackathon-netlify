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
    }
})

module.exports = mongoose.model("careerPoint",CareerPoint)