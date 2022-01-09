const path = require("path");
const multer = require("multer");
const News = require("../../models/News");
const router = require("express").Router();

const storage = multer.diskStorage({
	destination: "./media/news/",
	filename: function (req, file, cb) {
		cb(null, "CERTIFICATES" + Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({
	storage: storage,
	dest: "uploads/",
}).fields([{ name: "image" }]);

const obj = (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.json({
				err: err,
			});
		} else {
			const news = new News();
			news.name = req.body.name;
			news.author = req.body.author;
			news.text = req.body.text;
			news.image = req.files.image;
			news.save().then(() => {
				res.send({ news, message: "uploaded successfully" });
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
		let news = await News.findOne({ _id: req.params.id });
		news.name = req.body.name ? req.body.name : news.name;
		news.author = req.body.author
			? req.body.author
			: news.verificationStatus;
		news.text = req.body.text ? req.body.text : news.text;
		news.image = req.files.image ? req.files.image : news.image;
		news.save().then(() => {
			res.send({
				message: "uploaded successfully",
				news,
			});
		});
    }
	});
});

router.delete('/:id',async(req,res)=>{
	let news = await News.find({ _id : req.params.id});
	news.remove();
	res.send("Delete Completed")
})


//get all the events
router.get("/", (req, res) => {
	News.find({}, (err, r) => {
		if (err) {
			res.send(500).json(err);
		} else {
			res.json(r);
		}
	});
});

router.get("/:id", async (req, res) => {
	News.find(
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
