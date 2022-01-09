require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoos = require("mongoose");
const app = express();
const cors = require("cors");
const login = require("./auth/Login.js");
const StudentsData = require("./views/Students/StudentsData.js");
const db = require("./config/keys.js").mongoURI;
const events = require("./views/Events/Events.js")
const societyPoint = require("./views/SocietyPoint/SocietyPoint.js")
const news = require('./views/News/News.js')
app.use(cors());

app.use(express.json());

// Connecting to Database


mongoos
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("...Connected"))
	.catch((err) => console.log("Error", err));

app.use('/public', express.static('media'));
app.use("/auth", login);
app.use("/student", StudentsData);
app.use("/events", events);
app.use("/bill_reimbursements", societyPoint);
app.use("/news",news)

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}


app.listen(process.env.PORT || 5000);
