import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardBody, CardHeader, Card, Table } from "reactstrap";
import { getEvents } from "../Events_TSG/actions";

export default function Notification({notification}) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (!notification) {
    return <h1>Loading.</h1>;
  }

  return (
    <div style={{ height: "50vh", overflowY: "scroll" }}>
      <Table borderless style={{ backgroundColor: "white" }}>
        {notification.map((notification) => (
          <tr style={{background:notification.isRead ? "#fff" :"#72bdbd"}}>
            <a href={()=>false} style={{textDecoration:"none",color:"black",cursor:"pointer"}} onClick={()=>{
              axios.patch("/notification/"+notification._id).then(res=>{
                if(res.status === 200){
                  localStorage.setItem("EventId",notification.data._id)
                  window.location.href = "/events-tsg"
                }
              })
            }}>
            <p style={{ padding: "3%" }}>
              The <b>Officials</b> posted an event <b>{notification.data.name}</b> <br />
              {new Date(notification.data.eventStartTime).getDate()}-
              {monthNames[new Date(notification.data.eventStartTime).getMonth()]}{" "}
              {new Date(notification.data.eventStartTime).getFullYear()} |{" "}
              {new Date(notification.data.eventEndTime).getDate()}-
              {monthNames[new Date(notification.data.eventEndTime).getMonth()]}{" "}
              {new Date(notification.data.eventEndTime).getFullYear()}
            </p>
            </a>
          </tr>
        ))}
      </Table>
    </div>
  );
}
