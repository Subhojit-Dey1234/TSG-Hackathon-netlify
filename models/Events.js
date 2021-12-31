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
        required: true
    },
    report : {},
    image : {},
    description : {
        type: String
    },
    eventStartTime : {
        type: Date,
        required: true
    },
    eventEndTime:{
        type: Date,
        required:true
    }
})

module.exports = mongoose.model("events",EventSchema)