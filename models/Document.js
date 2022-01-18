const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const Document = new Schema({
    document : {}
})

module.exports = mongoose.model("documents",Document)