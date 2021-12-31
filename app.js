require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Students = require("./models/Students.js");
const path = require("path");
const express = require("express");
const mongoos = require("mongoose");
const app = express();
const cors = require("cors");
const login = require("./auth/Login.js");
const StudentsData = require("./views/Students/StudentsData.js");

app.use(cors());

app.use(express.json());

// Connecting to Database
const db = require("./config/keys.js").mongoURI;

mongoos
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("...Connected"))
	.catch((err) => console.log("Error", err));

app.use("/auth", login);
app.use("/student", StudentsData);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}


app.listen(process.env.PORT || 5000);
