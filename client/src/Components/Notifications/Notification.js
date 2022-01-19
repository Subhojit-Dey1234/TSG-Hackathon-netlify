import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardBody, CardHeader, Card, Table } from "reactstrap";
import { getEvents } from "../Events_TSG/actions";

export default function Notification() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventDetails.events);
  useEffect(() => {
    dispatch(getEvents((res) => {}));
  }, []);
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
  if (!events) {
    return <h1>Loading.</h1>;
  }

  return (
    <div style={{ height: "50vh", overflowY: "scroll" }}>
      <Table borderless style={{ backgroundColor: "white" }}>
        {events.map((event) => (
          <tr>
            <p style={{ padding: "3%" }}>
              The <b>Officials</b> posted an event <b>{event.name}</b> <br />
              {new Date(event.eventStartTime).getDate()}-
              {monthNames[new Date(event.eventStartTime).getMonth()]}{" "}
              {new Date(event.eventStartTime).getFullYear()} |{" "}
              {new Date(event.eventEndTime).getDate()}-
              {monthNames[new Date(event.eventEndTime).getMonth()]}{" "}
              {new Date(event.eventEndTime).getFullYear()}
            </p>
          </tr>
        ))}
      </Table>
    </div>
  );
}
