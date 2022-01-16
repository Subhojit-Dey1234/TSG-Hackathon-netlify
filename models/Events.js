const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const EventSchema = new Schema({
    name : {
        type:String,
        required: true
    },
    eventType : {
        type:String,
        required: true
    },
    status : {
        type:String,
        // required: true
    },
    reports: {},
    images : {},
    description : {
        type: String,
        required:true
    },
    eventStartTime : {
        type: Date,
        required: true
    },
    eventEndTime:{
        type: Date,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    },
    students : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "users"
        }
    ]
})

module.exports = mongoose.model("Events",EventSchema)