const path = require("path");
const multer = require("multer");
const SocietyPoint = require("../../models/SocietyPoint");
const Students = require("../../models/Students");
const router = require("express").Router();

const storage = multer.diskStorage({
	destination: "./media/society-point/",
	filename: function (req, file, cb) {
		cb(null, "CERTIFICATES" + Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({
	storage: storage,
	dest: "uploads/",
}).fields([
	{ name: "reports", maxCount: 1 },
	{ name: "images", maxCount: 1 },
]);

const obj = (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.json({
				err: err,
			});
		} else {
			const societyPoint = new SocietyPoint();
			societyPoint.name = req.body.name;
			societyPoint.eventType = req.body.eventType;
			societyPoint.status = req.body.status;
			societyPoint.description = req.body.description;
			societyPoint.eventStartTime = req.body.eventStartTime;
			societyPoint.eventEndTime = req.body.eventEndTime;
			if (req.files.reports)
				societyPoint.reports = req.files.reports;
			if (req.files.images)
				societyPoint.images = "/public/events/" + req.files.images[0].filename;
			
			// console.log(societyPoint)
			societyPoint.save().then(() => {
				res.send({ events: societyPoint, message: "uploaded successfully" });
			});
		}
	});
};

// Adding a news achievements
router.post("/", obj);

// update
router.patch("/:id", async (req, res) => {
	upload(req, res, async (err) => {
		if (err) {
			res.json(err);
		} else {
			let societyPoint = await SocietyPoint.findOne({ _id: req.params.id });
			societyPoint.date = new Date();
			societyPoint.name = req.body.name ? req.body.name : societyPoint.name;
			societyPoint.eventType = req.body.eventType
				? req.body.eventType
				: societyPoint.eventType;
			societyPoint.status = req.body.status ? req.body.status : societyPoint.status;
			societyPoint.description = req.body.description
				? req.body.description
				: societyPoint.description;
			societyPoint.eventStartTime = req.body.eventStartTime
				? req.body.eventStartTime
				: societyPoint.eventStartTime;
			societyPoint.eventEndTime = req.body.eventEndTime
				? req.body.eventEndTime
				: societyPoint.eventEndTime;
			if (req.files.reports)
				societyPoint.reports = req.files.reports;
			if (req.files.images)
				societyPoint.images = "/public/events/" + req.files.images[0].filename;

			console.log(req.files,societyPoint)
			societyPoint.save().then(() => {
				res.send({
					message: "uploaded successfully",
					events: societyPoint,
				});
			});
		}
	});
});

router.delete("/:id", async (req, res) => {
	try {
		SocietyPoint.deleteOne({ _id: req.params.id }, function (err, model) {
			if (!err) res.send("Delete Completed");
		});
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

router.get("/downloads/:id", async (req, res) => {
	try {
		let societyPoint = await SocietyPoint.findOne({ _id: req.params.id });
		res.download(societyPoint.reports[0].path,societyPoint.reports[0].filename);
	} catch (err) {
		res.json(err);
	}
});

//get all the events
router.get("/", async (req, res) => {
	try {
		let events = await SocietyPoint.find({}).populate({
			path : "students",
			model : "users"
		}).populate({
			path : "students",
			model : "users"
		}).sort({ date: -1 });


		res.json(events);
	} catch (err) {
		res.send(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	SocietyPoint.find(
		{
			studentRoll: req.params.id,
		},
		function (err, r) {
			if (err) {
				res.send(500).json({
					message: "There is an error in Events Backend",
				});
			} else {
				res.json({
					r,
				});
			}
		},
	).populate({
			path : "students",
			model : "users"
		});
});

// participated events by students

router.post("/tsg-participate/:id", async (req, res) => {
	try {
		let event = await SocietyPoint.findOne({ _id: req.params.id });
		let student = await Students.findOneAndUpdate(
			{
				rollNumber: req.body.rollNumber,
			},
			{
				$addToSet: {
					tsgParticipatedEvents: event._id,
				},
			},
			{ new: true, useFindAndModify: false },
		).populate({
			path: "tsgParticipatedEvents",
			model: "Events",
		});

		res.json(student);
	} catch (err) {
		res.json(err);
	}
});

router.post("/society-participate/:id", async (req, res) => {
	try {
		let event = await SocietyPoint.findOne({ _id: req.params.id });
		let student = await Students.findOneAndUpdate(
			{
				rollNumber: req.body.rollNumber,
			},
			{
				$addToSet: {
					societyParticipatedEvents: event._id,
				},
			},
			{ new: true, useFindAndModify: false },
		).populate({
			path: "societyParticipatedEvents",
			model: "SocietyPoint",
		});

		let eventData = await SocietyPoint.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				$addToSet: {
					students: student._id,
				},
			},
			{ new: true, useFindAndModify: false },
		).populate({
			path : "students",
			model : "users"
		})

		res.json(student);
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;