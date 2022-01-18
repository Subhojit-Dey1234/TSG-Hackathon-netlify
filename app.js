require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoos = require("mongoose");
const app = express();
const cors = require("cors");
const login = require("./auth/Login.js");
const StudentsData = require("./views/Students/StudentsData.js");
const db = require("./config/keys.js").mongoURI;
const events = require("./views/Events/Events.js");
const societyPoint = require("./views/SocietyPoint/SocietyPoint.js");
const news = require("./views/News/News.js");
const search = require("./views/Search.js");
const academicPoint = require("./views/AcademicPoint/AcademicPoint.js");
const careerPoint = require("./views/CareerPoint/CareerPoint");
const placementData = require("./views/UploadCSV.js");
app.use(cors());

app.use(express.json());
mongoos
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("...Connected"))
	.catch((err) => console.log("Error", err));

app.use("/public", express.static("media"));
app.use("/auth", login);
app.use("/student", StudentsData);
app.use("/events", events);
app.use("/society-point", societyPoint);
app.use("/news", news);
app.use("/academics", academicPoint);
app.use("/careers", careerPoint);
app.use("/search", search);
app.use("/placementData", placementData);


if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const server = app.listen(process.env.PORT || 5000)
const io = require("socket.io")(server,{
	pingTimeout : 60000,
	cors : {
		origin : "http://localhost:3000"
	}
});

io.on("connection", (socket) => {
    console.log("Connection",socket.id)

	socket.on("disconnect", (reason) => {
		console.log(reason)
	})

	// socket.on("get_notification",data=>{
	// 	io.sockets.emit('get_notification',data)
	// })
})

function getSocketIo(){
    return io;
}

module.exports.getSocketIo=getSocketIo