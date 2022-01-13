const path = require("path");
const multer = require("multer");
const Events = require("../../models/Events");
const Students = require("../../models/Students");
const router = require("express").Router();

const storage = multer.diskStorage({
	destination: "./media/events/",
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
	const url = req.protocol + "://" + req.get("host");
	upload(req, res, (err) => {
		if (err) {
			res.json({
				err: err,
			});
		} else {
			const events = new Events();
			events.name = req.body.name;
			events.eventType = req.body.eventType;
			events.status = req.body.status;
			events.description = req.body.description;
			events.eventStartTime = req.body.eventStartTime;
			events.eventEndTime = req.body.eventEndTime;
			if (req.files.reports)
				events.reports =
					url + "/public/events/" + req.files.reports[0].filename;
			if (req.files.images)
				events.images = url + "/public/events/" + req.files.images[0].filename;
			events.save().then(() => {
				res.send({ events, message: "uploaded successfully" });
			});
		}
	});
};

// Adding a news achievements
router.post("/", obj);

// update
router.patch("/:id", async (req, res) => {
	const url = req.protocol + "://" + req.get("host");
	upload(req, res, async (err) => {
		if (err) {
			res.json(err);
		} else {
			let events = await Events.findOne({ _id: req.params.id });
			events.date = new Date();
			events.name = req.body.name ? req.body.name : events.name;
			events.eventType = req.body.eventType
				? req.body.eventType
				: events.eventType;
			events.status = req.body.status ? req.body.status : events.status;
			events.description = req.body.description
				? req.body.description
				: events.description;
			events.eventStartTime = req.body.eventStartTime
				? req.body.eventStartTime
				: events.eventStartTime;
			events.eventEndTime = req.body.eventEndTime
				? req.body.eventEndTime
				: events.eventEndTime;
			if (req.files.reports)
				events.reports =
					url + "/public/events/" + req.files.reports[0].filename;
			if (req.files.images)
				events.images = url + "/public/events/" + req.files.images[0].filename;
			events.save().then(() => {
				res.send({
					message: "uploaded successfully",
					events: events,
				});
			});
		}
	});
});

router.delete("/:id", async (req, res) => {
	try {
		Events.deleteOne({ _id: req.params.id }, function (err, model) {
			if (!err) res.send("Delete Completed");
		});
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

router.get("/downloads/:id", async (req, res) => {
	try {
		let events = await Events.find({ _id: req.params.id });
		res.download(events[0].reports[0].path);
	} catch (err) {
		res.json(err);
	}
});

//get all the events
router.get("/", async (req, res) => {
	try {
		let events = await Events.find({}).sort({ date: -1 });
		res.json(events);
	} catch (err) {
		res.send(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	Events.find(
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
	);
});

// participated events by students

router.post("/tsg-participate/:id", async (req, res) => {
	try {
		let event = await Events.findOne({ _id: req.params.id });
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
		let event = await Events.findOne({ _id: req.params.id });
		console.log(event, req.params.id);
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
			model: "Events",
		});

		res.json(student);
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
