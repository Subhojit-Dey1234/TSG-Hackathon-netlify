import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardHeader,Card } from 'reactstrap'
import { getEvents } from '../Events_TSG/actions'

export default function Notification() {
    const dispatch = useDispatch()
    const events = useSelector(state=>state.eventDetails.events)
    useEffect(()=>{
        dispatch(getEvents(res=>{}))
    },[])

    if(!events){
        return <h1>Loading.</h1>
    }

    return (
        <div style={{height:"50vh",overflowY:"scroll"}}>
           {events.map((event)=>(
               <a href={`/events-tsg/`} style={{textDecoration:"none",color:"black"}}>
               <div style={{padding:"10px 0 0 10px"}}>
               <Card style={{border:"0.4px solid #ededed"}}>
                   <h4 style={{paddingLeft:"5px"}}>{event.name}</h4>
                   <p style={{paddingLeft:"5px"}}>{event.description}</p>
               </Card>
               </div>
               </a>
           ))}
        </div>
    )
}
