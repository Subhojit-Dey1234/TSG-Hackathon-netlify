const path = require("path");
const multer = require("multer");
const router = require("express").Router();
const StudentAcheivements = require("../../models/StudentAcheivements");
const authMiddleware = require('../../auth/authMiddleware')

const storage = multer.diskStorage({
	destination: "./media/studentsCertificates",
	filename: function (req, file, cb) {
		cb(null, "CERTIFICATES" + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage,
	dest:'uploads/'
}).array('certificates')

const obj = (req, res) => {
	upload(req, res, () => {
		const studentAcheivementProfile = new StudentAcheivements();
		studentAcheivementProfile.rollNumber = req.body.rollNumber
		studentAcheivementProfile.achievementTitle = req.body.achievementTitle
		studentAcheivementProfile.achievementDescription = req.body.achievementDescription
		studentAcheivementProfile.achievementCategory = req.body.achievementCategory

		studentAcheivementProfile.certificates = req.files;
		studentAcheivementProfile.save().then(() => {
			res.send({ message: "uploaded successfully" });
		});
	});
};


// Adding a news achievements
router.post("/", obj);


// Updating a achievements
router.patch('/:id', async (req,res)=>{
	upload(req, res, async() => {
		let studentAcheivementProfile = await StudentAcheivements.findOne({ _id : req.params.id});
		studentAcheivementProfile.studentRoll = req.body.studentRoll
		studentAcheivementProfile.achievementTitle = req.body.achievementTitle
		studentAcheivementProfile.achievementDescription = req.body.achievementDescription
		studentAcheivementProfile.achievementCategory = req.body.achievementCategory

		studentAcheivementProfile.certificates = req.files;
		studentAcheivementProfile.save().then(() => {
			res.send({ message: "uploaded successfully" , studentAcheivementProfile});
		});
	});
})


// Delete a particular achievements
router.delete('/:id',async(req,res)=>{
	let achievements = await StudentAcheivements.find({ _id : req.params.id});
	achievements.remove();

	res.send("Delete Completed")
})


// get all the acheivements by Roll Number
router.get('/:roll',async (req,res)=>{
	let achievements = await StudentAcheivements.find({ studentRoll : req.params.roll});
	res.json({
		achievements
	})
})

// get by roll number and category
router.get('/:roll/:category',async (req,res)=>{
	StudentAcheivements.find({
		studentRoll: req.params.roll,
		achievementCategory:req.params.category
	},function(err,r){
		if(err){
			res.send(500).json({
				message : "There is an error in server"
			})
		}
		else{
			res.json({
				r
			})
		}
	})
})


module.exports = router;