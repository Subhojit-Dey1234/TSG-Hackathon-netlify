const path = require("path");
const multer = require("multer");
const router = require("express").Router();
const StudentAcheivements = require('./StudentAchievements')
const StudentGrievance = require('./StudentGrievance');
const authenticateUser = require("../../auth/authMiddleware");
const Students = require("../../models/Students");



router.use('/acheivements',StudentAcheivements)
router.use('/grievances',StudentGrievance)


router.get("/user/:id",async(req,res)=>{

    try{
        let student = await Students.findOne({
            _id : req.params.id
        }).populate({
            path: "tsgParticipatedEvents",
            model: "Events",
        }).populate({
            path: "societyParticipatedEvents",
            model: "SocietyPoint",
        })

        res.json(student)
    }
	catch(err){
        res.json(err)
    }


})



module.exports = router