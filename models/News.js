const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const News = new Schema({
    name:{
        type:String,
        required: true
    },
    author:{
        type: String,
        required:true
    },
    topic:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    image:{},
    timestamp : {
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model("News",News)