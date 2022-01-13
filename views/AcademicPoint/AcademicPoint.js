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
			academicPoint.links = req.body.links;
			academicPoint.text = req.body.text;
			academicPoint.yearOfString = req.body.yearOfString;
			academicPoint.department = req.body.department;
			academicPoint.document = req.files.document;
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
		academicPoint.name = req.body.name ? req.body.name : academicPoint.name;
		academicPoint.links = req.body.links
			? req.body.links
			: academicPoint.links;
		academicPoint.text = req.body.text ? req.body.text : academicPoint.text;
		academicPoint.yearOfString = req.body.yearOfString ? req.body.yearOfString : academicPoint.yearOfString;
		academicPoint.department = req.body.department ? req.body.department : academicPoint.department;
		academicPoint.document = req.files.document ? req.files.document : academicPoint.image;
		academicPoint.save().then(() => {
			res.send({
				message: "uploaded successfully",
				news: academicPoint,
			});
		});
    }
	});
});

router.delete('/:id',async(req,res)=>{
	let news = await AcademicPoint.find({ _id : req.params.id});
	news.remove();
	res.send("Delete Completed")
})


//get all the events
router.get("/", (req, res) => {
	AcademicPoint.find({}, (err, r) => {
		if (err) {
			res.send(500).json(err);
		} else {
			res.json(r);
		}
	});
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
