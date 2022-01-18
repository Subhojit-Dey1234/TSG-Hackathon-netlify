const path = require("path");
const multer = require("multer");
const AcademicPoint = require("../../models/AcademicsPoint.js");
const router = require("express").Router();

const storage = multer.diskStorage({
	destination: "./media/academics/",
	filename: function (req, file, cb) {
		cb(null, "ACADEMICPOINT" + Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({
	storage: storage,
	dest: "uploads/",
}).fields([{ name: "document" }]);

const obj = (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.json({
				err: err,
			});
		} else {
			const academicPoint = new AcademicPoint();
			academicPoint.name = req.body.name;
			academicPoint.books = req.body.books;
			academicPoint.notes = req.body.notes;
			academicPoint.pyqp = req.body.pyqp;
			academicPoint.subjectName = req.body.subjectName;
			academicPoint.subjectCode = req.body.subjectCode;
			academicPoint.year = req.body.year;
			academicPoint.department = req.body.department;
			// academicPoint.document = req.files.document;
			// if(req.files.document)
			// 	academicPoint.document = "/public/events/" + req.files.document[0].filename;
			academicPoint.save().then(() => {
				res.send({ academicPoint: academicPoint, message: "uploaded successfully" });
			});
		}
	});
};

// Adding a news achievements
router.post("/", obj);


// update
router.patch("/:id", async (req, res) => {
	upload(req, res, async (err) => {
        if(err){
            res.json(err)
        }else{
		let academicPoint = await AcademicPoint.findOne({ _id: req.params.id });
		academicPoint.date = new Date()
		academicPoint.name = req.body.name ? req.body.name : academicPoint.name;
		academicPoint.books = req.body.books
			? req.body.books
			: academicPoint.books;
		academicPoint.notes = req.body.notes
			? req.body.notes
			: academicPoint.notes;
		academicPoint.pyqp = req.body.pyqp
			? req.body.pyqp
			: academicPoint.pyqp;
		academicPoint.subjectName = req.body.subjectName ? req.body.subjectName : academicPoint.subjectName;
		academicPoint.subjectCode = req.body.subjectCode ? req.body.subjectCode : academicPoint.subjectCode;
		academicPoint.year = req.body.year ? req.body.year : academicPoint.year;
		academicPoint.department = req.body.department ? req.body.department : academicPoint.department;
		// if(req.files.document)
		// 		academicPoint.document = "/public/events/" + req.files.document[0].filename;
		academicPoint.save().then(() => {
			res.send({
				message: "uploaded successfully",
				academicPoint: academicPoint,
			});
		});
    }
	});
});

router.get('/query/',async(req,res)=>{
	try{
		console.log(req.query)
		let academicPoint = await AcademicPoint.find({
			year : req.query.year,
		})

		res.json(academicPoint)
	}
	catch(err){
		res.json(err)
	}
})
router.get('/query/department',async(req,res)=>{
	try{
		let academicPoint = await AcademicPoint.find({
			department : req.query.department,
		})

		res.json(academicPoint)
	}
	catch(err){
		res.json(err)
	}
})

router.delete('/:id',async(req,res)=>{
	try {
		AcademicPoint.deleteOne({ _id: req.params.id }, function (err, model) {
			if (!err) res.send("Delete Completed");
		});
	} catch (err) {
		console.log(err);
		res.send(err);
	}
})


//get all the events
router.get("/", (req, res) => {
	AcademicPoint.find({}, (err, r) => {
		if (err) {
			res.send(500).json(err);
		} else {
			res.json(r);
		}
	}).sort({ date: -1 });
});

router.get("/:id", async (req, res) => {
	AcademicPoint.find(
		{
			_id: req.params.id,
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

module.exports = router;
