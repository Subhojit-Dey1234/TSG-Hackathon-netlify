require("dotenv").config();
const express = require("express");
const router = express.Router();
const Students = require("../models/Students.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Verify = require("../models/Verify.js");
const Officials = require("../models/Officials.js")

router.post('/login-officials', async(req,res)=>{
    let officials = await Officials.findOne({
        mail : req.body.mail
    })

	let user = {
		mail : req.body.mail,
		password : req.body.password
	}

    if(officials){
		let userData = {
			_id : officials._id,
			mail : officials.mail,
			name : officials.name,
			username : officials.username,
			type : officials.type
		}	
        if(officials.password === req.body.password){
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

            res.json({
                success : "Password Matched.",
                accessToken,
				user : userData
            })
        }
    }
    else{
		console.log("No User Found")
        res.send(404)
    }
})


const sendingEmail = process.env.SENDING_EMAIL
const sendEmailPassword = process.env.EMAIL_PASSWORD

// For sending Mail
const transporter = nodemailer.createTransport({
	service: "gmail",
	port: 465,
	secure: true,
	auth: {
		user: sendingEmail,
		pass: sendEmailPassword,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

router.post("/login", async (req, res) => {
	let user;
	await Students.findOne({ mail: req.body.mail }).populate({
		path : "tsgParticipatedEvents",
		model : "Events"
	}).populate({
		path : "societyParticipatedEvents",
		model : "Events"
	}).then((r) => {
		user = r;
	});
	if (user === null) {
		return res.status(400).send("Cannot find user");
	}
	try {
		const mail = req.body.mail;
		var val = Math.floor(1000 + Math.random() * 9000);
		let info = {
			from: sendingEmail, // sender address
			to: mail, // list of receivers
			subject: "Otp for Login", // Subject line
			html: `<h2 style="text-align:center;font-size:35px">Login Otp </h2><div><h1 style="text-align:center;font-size:40px;border-radius:10px;background:#eaeaff;border:1px dashed black;"> ${val} <h1>`, // html body
		};

		await transporter.sendMail(info, async (err, success) => {
			if (err) {
				res.json({
					err
				})
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
