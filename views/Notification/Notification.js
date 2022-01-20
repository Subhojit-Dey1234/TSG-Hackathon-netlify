const Notification = require("../../models/Notification");

const router = require("express").Router();


router.get("/",(req,res)=>{
    let notifications = Notification.find({}).sort({date:-1})
    res.json(notifications)
})

router.patch("/:id",(req,res)=>{
    let notification = Notification.findOne({
        _id : req.params._id
    })

    notification.isRead = true;
    notification.save().then(()=>{
        res.json(notification)
    })
})


module.exports = router