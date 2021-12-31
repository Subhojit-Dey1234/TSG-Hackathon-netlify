const mongoose = require("mongoose")
const Schema  = mongoose.Schema;

const StudentAcheivementProfile = new Schema({
    rollNumber : {
        type:String,
        required:true
    },
    achievementTitle : {
        type:String,
        required:true
    },
    achievementDescription : {
        type:String,
        required:true
    },
    achievementCategory:{
        type:String
    },
    ranking:{
        type: String
    },
    certificates:{},
})

module.exports = StudentAcheivement = mongoose.model("StudentAcheivement", StudentAcheivementProfile);