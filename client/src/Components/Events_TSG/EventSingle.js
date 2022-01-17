import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Card, CardBody, CardHeader, CardImg, CardTitle } from 'reactstrap'
import { getEventsById } from './actions'

export default function EventSingle(props) {
    const { id } = useParams()
    const [ event, setEvent ] = useState(null)
    useEffect(()=>{
        axios.get(`/events/${id}`).then(res=>{
            setEvent(res.data[0])
        })
    },[])

    console.log(event)

    if(!event) return <h1>Loading</h1>
    return (
        <div style={{position:"relative",top:"10vh", width:"80vw",margin:"auto"}}>
            <Card>
                <CardImg top style={{width:"25vw"}} src={event.images}/>
                <CardBody>
                <CardTitle tag="h5">{event.name}</CardTitle>
                    <p>{event.description}</p>
                </CardBody>
            </Card>
        </div>
    )
}
