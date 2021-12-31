const path = require("path");
const multer = require("multer");
const router = require("express").Router();
const StudentAcheivements = require('./StudentAchievements')
const StudentGrievance = require('./StudentGrievance');
const authenticateUser = require("../../auth/authMiddleware");



router.use('/acheivements',authenticateUser,StudentAcheivements)
router.use('/grievances',authenticateUser,StudentGrievance)


module.exports = router