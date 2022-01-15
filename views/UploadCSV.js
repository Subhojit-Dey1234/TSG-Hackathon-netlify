const fs = require("fs");
const csvParser = require("csv-parser");
const csv = require("csvtojson")
const path = require("path");
const multer = require("multer");
const PlacementReport = require("../models/PlacementReport");
const router = require("express").Router();

const storage = multer.diskStorage({
	destination: "./media/graph/",
	filename: function (req, file, cb) {
		cb(null, "GRAPH" + Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({
	storage: storage,
	dest: "uploads/",
}).fields([{ name: "report" }]);

const obj = async (req, res) => {
	const url = req.protocol + "://" + req.get("host");
	upload(req, res, (err) =>  {
		if (err) {
			res.json({
				err: err,
			});
		} else {
			const placementReport = new PlacementReport();
			if (req.files.report !== undefined)
            {
                csv().fromFile(req.files.report[0].path).then(data=>{
                    placementReport.report = "/public/news/" + req.files.report[0].filename
                    placementReport.reports = filterData(data)
                    placementReport.save().then(() => {
                    	res.send({ placementReport, message: "uploaded successfully" });
                    });
                })
            }
		}
	});
};
router.post("/", obj);

function filterData(data){
    var ans = []
    var dept = ["AE","AG","AR","BT","CH","CY","CE","CS","EE","ECE","GG","EX","MA","ME","MI","MT","NA","PH"]
    for(var d of dept){
        res = {};
        let v = data.filter((dat)=>{
            return dat["ROLL NO"].indexOf(d) !== -1
        })
        res.dept = d
        res.count = v.length
        ans.push(res)
    }

    return ans
}

router.get("/", async (req, res) => {
    try{
        const placementReport = await PlacementReport.find({})
        res.json(placementReport)
    }
    catch(err){
        res.json(err)
    }
    
});

module.exports = router;
