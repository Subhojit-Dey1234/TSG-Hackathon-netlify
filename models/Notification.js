const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const Notification = new Schema({
    data :{},
    date:{
        type : Date,
        default : Date.now,
    },
    isRead : {
        type: Boolean,
        default : false
    }
})

module.exports = mongoose.model("Notification",Notification)