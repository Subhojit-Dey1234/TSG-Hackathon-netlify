const path = require("path");
const multer = require("multer");
const StudentGrievance = require("../../models/StudentGrievance");
const authenticateUser = require("../../auth/authMiddleware");
const adminAccessMiddleWare = require("../../auth/adminAccessMiddleware");
const router = require("express").Router();

// return all the grievances if admin / staffs
router.get("/", (req, res) => {
	StudentGrievance.find({}, (err, docs) => {
		if (err) {
			res.send(500).json({
				message: "There is an error in server",
			});
		} else {
			res.json(docs);
		}
	});
});

// Get by roll Number

router.get("/:rollNumber", (req, res) => {
	StudentGrievance.find({ rollNumber: req.params.rollNumber }, (err, docs) => {
		if (err) {
			res.send(500).json({
				message: "There is an error in server",
			});
		} else {
			res.json(docs);
		}
	});
});

// Get by id
router.get("/:id", (req, res) => {
	StudentGrievance.find({ id: req.params.id }, (err, docs) => {
		if (err) {
			res.send(500).json({
				message: "There is an error in server",
			});
		} else {
			res.json(docs);
		}
	});
});

// post grievances

const storage = multer.diskStorage({
	destination: "./media/studentsGrievances",
	filename: function (req, file, cb) {
		cb(null, "CERTIFICATES" + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage,
	dest: "uploads/",
}).array("supportingFiles");

router.post("/", (req, res) => {
	upload(req, res, () => {
		try {
			const studentGrievances = new StudentGrievance();
			studentGrievances.rollNumber = req.body.rollNumber;
			studentGrievances.studentName = req.body.studentName;
			studentGrievances.mail = req.body.mail;
			studentGrievances.hallOfResidence = req.body.hallOfResidence;
			studentGrievances.subject = req.body.subject;
			studentGrievances.grievanceDescription =
				req.body.grievanceDescription;

			studentGrievances.supportingFiles = req.files;
			studentGrievances.save().then(() => {
				res.send({studentGrievances, message: "uploaded successfully" });
			})
		} catch (err) {
			res.send({ message: "There is an error" });
		}
	});
});

// patch grievances
router.patch("/:id",async (req, res) => {
	upload(req, res, async () => {
		try {
			const studentGrievance = await StudentGrievance.findById({
				_id: req.params.id,
			});
			studentGrievance.rollNumber = req.body.rollNumber ? req.body.rollNumber : studentGrievance.rollNumber;
			studentGrievance.studentName = req.body.studentName ? req.body.studentName : studentGrievance.studentName;
			studentGrievance.mail = req.body.mail ? req.body.mail : studentGrievance.mail;
			studentGrievance.hallOfResidence = req.body.hallOfResidence ? req.body.hallOfResidence : studentGrievance.hallOfResidence ;
			studentGrievance.subject = req.body.subject ? req.body.subject : studentGrievance.subject;
			studentGrievance.grievanceDescription = req.body.grievanceDescription ? req.body.grievanceDescription : studentGrievance.grievanceDescription  ;
			studentGrievance.supportingFiles = req.files ? req.files : studentGrievance.supportingFiles;
			studentGrievance.save().then(() => {
				res.send({ data : studentGrievance, message: "uploaded successfully" });
			});
		} catch (err){
			res.send({ err, message: "There is an error" });
		}
	});
});
router.delete("/:id", (req, res) => {
	StudentGrievance.findById({ _id: req.params.id }).remove();
});

module.exports = router;
