require("dotenv").config();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const Students = require('./models/Students.js')
const express = require("express");
const mongoos = require("mongoose")
const app = express();
const cors = require('cors');
const login = require('./auth/Login.js');
const StudentsData = require("./views/Students/StudentsData.js");


app.use(cors());

app.use(express.json());

// Connecting to Database
const db = require("./config/keys.js").mongoURI;


mongoos.connect(db,{ useNewUrlParser: true , useUnifiedTopology: true })
.then(()=>console.log("...Connected"))
.catch((err)=>console.log("Error",err))

app.post('/signup', async (req, res) => {
    try {
      if(!req.body.mail) return res.status(500).send("Invalid User")
      const user = { mail: req.body.mail}

      const newUser = new Students(user);

      newUser.save().then(item => res.json({item : item,success:true}))
    } catch (err){
        console.log(err)
        res.status(500).send(err)
    }
  })

if(process.env.NODE_ENV === "production"){
  app.use(express.static('../frontend/build'))

  app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.use('/auth',login)
app.use('/student',StudentsData);
app.listen(5000);
