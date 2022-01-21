const router = require("express").Router();
const Events = require("../models/Events.js")
const News = require("../models/News")


router.get("/events", async (req, res)=>{
    try{
        let filt = req.query
        let events = await Events.find({}).sort({date : -1})


        let filterData = events.filter((evnt)=>{
            let d = evnt.name + evnt.description
            if(d.toLowerCase().indexOf(filt.q.toLowerCase()) !== -1){
                return true
            }
            else{
                return false
            }
        })


        res.json(filterData)
    }
    catch(err){
        res.json(err)
    }
})
router.get("/news", async (req, res)=>{
    try{
        let filt = req.query
        let events = await News.find({}).sort({timestamp : -1})


        let filterData = events.filter((evnt)=>{
            let d = evnt.name + evnt.description
            if(d.toLowerCase().indexOf(filt.q.toLowerCase()) !== -1){
                return true
            }
            else{
                return false
            }
        })


        res.json(filterData)
    }
    catch(err){
        res.json(err)
    }
})


module.exports = router