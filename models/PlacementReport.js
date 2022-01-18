const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const Data = new Schema({
    branch : {
        type : String,
        required : true,
    },
    count : {
        type : Number,
        required : true,
    }
})

const PlacementReport = new Schema({
    report : {},
    reports : []
})

module.exports = mongoose.model("placementReport",PlacementReport)