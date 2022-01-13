const path = require("path");
const multer = require("multer");
const CareerPoint = require("../../models/CareerPoint.js");
const router = require("express").Router();

const storage = multer.diskStorage({
	destination: "./media/career/",
	filename: function (req, file, cb) {
		cb(null, "CAREER" + Date.now() + path.extname(file.originalname));
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
			const careerPoint = new CareerPoint();
			careerPoint.name = req.body.name;
			careerPoint.links = req.body.links;
			careerPoint.text = req.body.text;
			careerPoint.yearOfString = req.body.yearOfString;
			careerPoint.department = req.body.department;
			careerPoint.document = req.files.document;
			careerPoint.save().then(() => {
				res.send({ careerPoint: careerPoint, message: "uploaded successfully" });
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
		let careerPoint = await CareerPoint.findOne({ _id: req.params.id });
		careerPoint.name = req.body.name ? req.body.name : careerPoint.name;
		careerPoint.links = req.body.links
			? req.body.links
			: careerPoint.links;
		careerPoint.text = req.body.text ? req.body.text : careerPoint.text;
		careerPoint.yearOfString = req.body.yearOfString ? req.body.yearOfString : careerPoint.yearOfString;
		careerPoint.department = req.body.department ? req.body.department : careerPoint.department;
		careerPoint.document = req.files.document ? req.files.document : careerPoint.image;
		careerPoint.save().then(() => {
			res.send({
				message: "uploaded successfully",
				careerPoint: careerPoint,
			});
		});
    }
	});
});

router.delete('/:id',async(req,res)=>{
	let careerPoint = await CareerPoint.find({ _id : req.params.id});
	careerPoint.remove();
	res.send("Delete Completed")
})


//get all the events
router.get("/", (req, res) => {
	CareerPoint.find({}, (err, r) => {
		if (err) {
			res.send(500).json(err);
		} else {
			res.json(r);
		}
	});
});

router.get("/:id", async (req, res) => {
	CareerPoint.find(
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
