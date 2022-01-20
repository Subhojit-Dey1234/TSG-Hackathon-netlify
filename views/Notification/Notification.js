const Notification = require("../../models/Notification");

const router = require("express").Router();


router.get("/",async (req,res)=>{
    let notifications = await Notification.find({}).sort({date:-1})
    res.json(notifications)
})

router.patch("/:id",async(req,res)=>{
    let notification = await Notification.findOne({
        _id : req.params.id
    })

    notification.isRead = true;
    notification.save().then(()=>{
        res.json(notification)
    })
})


module.exports = router