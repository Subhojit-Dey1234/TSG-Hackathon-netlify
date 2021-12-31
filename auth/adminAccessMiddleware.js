const jwt = require("jsonwebtoken");

function adminAccessMiddleWare(req, res, next) {
	const userType = req.headers["user-type"]
	if (userType === undefined) return res.sendStatus(401);

    if(userType !== "student"){
        next();
    }
    else{
        return res.sendStatus(403)
    }
}

module.exports = adminAccessMiddleWare