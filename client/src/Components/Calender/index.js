import React, { useEffect } from "react";
import Calendar from "react-awesome-calendar";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../Events_TSG/actions";
export default function Index() {
	const dispatch = useDispatch();
	const eventsData = useSelector((state) => state.eventDetails.events);

	useEffect(() => {
		dispatch(
			getEvents((res) => {
				console.log(res);
			}),
		);
	}, []);

	const data = [];
    let color = ["#fd3153","#1ccb9e","#3694DF"]
	for (let event of eventsData) {
		let d = {
			id: event._id,
            color: color[eventsData.indexOf(event) % 3],
			from: event.eventStartTime.slice(0, event.eventStartTime.length - 1),
			to: event.eventEndTime.slice(0, event.eventEndTime.length - 1),
			title: event.name,
		};

		data.push(d);
	}
	return (
		<div style={{ margin: "2vh 4vw", overflow: "scroll" }}>
			<Calendar events={data} />
		</div>
	);
}
