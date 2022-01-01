require("dotenv").config();

let password = process.env.DATABASE_PASSWORD

module.exports = {
    mongoURI : `mongodb+srv://Subhojit:${password}@cluster0.c38hy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}
