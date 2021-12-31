const express = require("express");
const router = express.Router();
const Students = require("../models/Students.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Officials = require("./OfficialsLogin");
const Verify = require("../models/Verify.js");

router.use("/", Officials);

// For sending Mail
const transporter = nodemailer.createTransport({
	service: "gmail",
	port: 465,
	secure: true,
	auth: {
		user: "pcgaming1882020@gmail.com",
		pass: "6gQLum2$JMEHB6",
	},
	tls: {
		rejectUnauthorized: false,
	},
});

router.post("/login", async (req, res) => {
	let user;
	await Students.findOne({ mail: req.body.mail }).then((r) => {
		user = r;
	});
	if (user === null) {
		return res.status(400).send("Cannot find user");
	}
	try {
		const mail = req.body.mail;
		var val = Math.floor(1000 + Math.random() * 9000);
		let info = {
			from: "pcgaming1882020@gmail.com", // sender address
			to: mail, // list of receivers
			subject: "Otp for Login", // Subject line
			html: `<h2 style="text-align:center;font-size:35px">Login Otp </h2><div><h1 style="text-align:center;font-size:40px;border-radius:10px;background:#eaeaff;border:1px dashed black;"> ${val} <h1>`, // html body
		};

		await transporter.sendMail(info, async (err, success) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Success");
				let verifyObj = await Verify.findOne({
					mail: mail,
				});
				if (verifyObj) {
					verifyObj.otp = val;
					verifyObj.save().then(() =>
						res.json({
							otp: "Otp Send Successfully",
							user
						}),
					);
				} else {
					var verifyD = new Verify({
						mail: mail,
						otp: val,
					});
					verifyD.save().then(() =>
						res.json({
							otp: "Otp Send Successfully",
							user
						}),
					);
				}
			}
		});
	} catch {
		res.status(500).send();
	}
});

router.post("/verify", async (req, res) => {
	const mail = req.body.mail;
	const otp = req.body.otp;
	const user = {
		mail: mail,
		otp,
	};

	Verify.findOne({ mail: mail }, async function (err, re) {
		if (err) return err;
		else {
			if (re.otp.toString() === otp.toString()) {
				const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
				res.json({ accessToken });
			} else {
				// res.sendStatus(400)
				// res.json({
				// 	status: 400,
				// 	message: "Error in OTP",
				// });

				res.status(400).send("Error in OTP")
			}
		}
	});
});

router.post("/deleteOtp", (req, res) => {
	let verify = Verify.deleteOne({ mail: req.body.mail }, function (err, s) {
		console.log(err);
	});

	if (verify) res.send("Otp deleted");
});

module.exports = router;
