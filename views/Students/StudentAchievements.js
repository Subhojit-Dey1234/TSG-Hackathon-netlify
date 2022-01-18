const path = require("path");
const multer = require("multer");
const router = require("express").Router();
const StudentAcheivements = require("../../models/StudentAcheivements");
const authMiddleware = require("../../auth/authMiddleware");

const storage = multer.diskStorage({
	destination: "./media/studentsCertificates",
	filename: function (req, file, cb) {
		cb(null, "CERTIFICATES" + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage,
	dest: "uploads/",
}).fields([{ name: "certificates" }]);

const obj = (req, res) => {
	upload(req, res, () => {
		console.log(req.files);
		const studentAcheivementProfile = new StudentAcheivements();
		studentAcheivementProfile.rollNumber = req.body.rollNumber;
		studentAcheivementProfile.achievementTitle = req.body.achievementTitle;
		studentAcheivementProfile.achievementDescription =
			req.body.achievementDescription;
		studentAcheivementProfile.achievementCategory =
			req.body.achievementCategory;
		studentAcheivementProfile.ranking = req.body.ranking;
		studentAcheivementProfile.certificates = req.files.certificates;
		console.log(studentAcheivementProfile);
		studentAcheivementProfile.save().then(() => {
			res.send({ message: "uploaded successfully", studentAcheivementProfile });
		});
	});
};

// Adding a news achievements
router.post("/", obj);

// Updating a achievements
router.patch("/:id", async (req, res) => {
	upload(req, res, async () => {
		let studentAcheivementProfile = await StudentAcheivements.findOne({
			_id: req.params.id,
		});
		studentAcheivementProfile.studentRoll = req.body.studentRoll;
		studentAcheivementProfile.achievementTitle = req.body.achievementTitle;
		studentAcheivementProfile.achievementDescription =
			req.body.achievementDescription;
		studentAcheivementProfile.achievementCategory =
			req.body.achievementCategory;

		studentAcheivementProfile.certificates = req.files.certificates;
		studentAcheivementProfile.save().then(() => {
			res.send({ message: "uploaded successfully", studentAcheivementProfile });
		});
	});
});

router.get("/downloads/:id", async (req, res) => {
	try {
		let events = await StudentAcheivements.find({ _id: req.params.id });
		res.download(events[0].certificates[0].path);
	} catch (err) {
		res.json(err);
	}
});

// Delete a particular achievements
router.delete("/:id", async (req, res) => {
	let achievements = await StudentAcheivements.find({ _id: req.params.id });
	achievements.remove();

	res.send("Delete Completed");
});

// get all the acheivements by Roll Number
router.get("/:roll", async (req, res) => {
	let achievements = await StudentAcheivements.find({
		studentRoll: req.params.roll,
	}).sort({ date: -1 });
	res.json({
		achievements,
	});
});

// get by roll number and category
router.get("/:roll/:category", async (req, res) => {
	StudentAcheivements.find(
		{
			studentRoll: req.params.roll,
			achievementCategory: req.params.category,
		},
		function (err, r) {
			if (err) {
				res.send(500).json({
					message: "There is an error in server",
				});
			} else {
				res.json({
					r,
				});
			}
		},
	);
});

module.exports = router;
