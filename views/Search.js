const router = require("express").Router();
const Events = require("../models/Events.js")


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


module.exports = router