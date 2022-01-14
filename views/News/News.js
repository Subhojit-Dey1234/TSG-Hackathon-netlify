const path = require("path");
const multer = require("multer");
const News = require("../../models/News");
const router = require("express").Router();

const storage = multer.diskStorage({
	destination: "./media/news/",
	filename: function (req, file, cb) {
		cb(null, "NEWS" + Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({
	storage: storage,
	dest: "uploads/",
}).fields([{ name: "image" }]);

const obj = (req, res) => {
	const url = req.protocol + "://" + req.get("host");
	upload(req, res, (err) => {
		if (err) {
			res.json({
				err: err,
			});
		} else {
			const news = new News();
			news.name = req.body.name;
			news.author = req.body.author;
			news.description = req.body.description;
			news.topic = req.body.topic;
			// news.image = req.files.image;
			if (req.files.image !== undefined)
				news.image = "/public/news/" + req.files.image[0].filename;
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
		news.timestamp = new Date()
		news.name = req.body.name ? req.body.name : news.name;
		news.author = req.body.author
			? req.body.author
			: news.verificationStatus;
		news.text = req.body.text ? req.body.text : news.text;
		news.topic = req.body.topic ? req.body.topic : news.topic;
		if (req.files.image !== undefined)
				news.image = "/public/news/" + req.files.image[0].filename;
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
router.get("/", async (req, res) => {
	try{
		let news = await News.find({}).sort({ timestamp: -1 });
		res.json(news)
	}
	catch(err){
		res.json(err)
	}
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
