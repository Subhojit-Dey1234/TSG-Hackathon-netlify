const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const Notification = new Schema({
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
    isRead : {
        type: Boolean,
        default : false
    }
})

module.exports = mongoose.model("Notification",Notification)