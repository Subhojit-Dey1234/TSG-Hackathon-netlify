const path = require("path");
const multer = require("multer");
const SocietyPoint = require("../../models/SocietyPoint");
const router = require("express").Router();

const storage = multer.diskStorage({
	destination: "./media/societyPoint/",
	filename: function (req, file, cb) {
		cb(null, "CERTIFICATES" + Date.now() + path.extname(file.originalname));
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
			const societyPoint = new SocietyPoint();
			societyPoint.rollNumber = req.body.rollNumber;
			societyPoint.verificationStatus = req.body.verificationStatus;
			societyPoint.status = req.body.status;
			societyPoint.remarks = req.files.remarks;
			societyPoint.save().then(() => {
				res.send({ societyPoint: societyPoint, message: "uploaded successfully" });
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
		let societyPoint = await SocietyPoint.findOne({ _id: req.params.id });
		societyPoint.rollNumber = req.body.rollNumber ? req.body.rollNumber : societyPoint.rollNumber;
		societyPoint.verificationStatus = req.body.verificationStatus
			? req.body.verificationStatus
			: societyPoint.verificationStatus;
		societyPoint.remarks = req.body.remarks ? req.body.remarks : societyPoint.remarks;
		societyPoint.document = req.files.document ? req.files.document : societyPoint.document;
		societyPoint.save().then(() => {
			res.send({
				message: "uploaded successfully",
				societyPoint: societyPoint,
			});
		});
    }
	});
});

router.delete('/:id',async(req,res)=>{
	let events = await SocietyPoint.find({ _id : req.params.id});
	events.remove();
	res.send("Delete Completed")
})


//get all the events
router.get("/", (req, res) => {
	SocietyPoint.find({}, (err, r) => {
		if (err) {
			res.send(500).json(err);
		} else {
			res.json(r);
		}
	});
});

router.get("/:id", async (req, res) => {
	SocietyPoint.find(
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
