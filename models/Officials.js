const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const Officials = new Schema({
    mail:{
        type:String,
        required:true,
    },
    name: String,
    username: String,
    password: String,
    type : String
})

module.exports = mongoose.model("officials",Officials)