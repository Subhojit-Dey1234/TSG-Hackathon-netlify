import React, { useEffect } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardGroup,
	Input,
	InputGroup,
	Button,
	Form,
	FormGroup,
} from "reactstrap";
import logo1 from "../../Images/logo1.png";
import logo2 from "../../Images/logo2.png";
// import logo3 from "../../Images/logo3.png";
import logo4 from "../../Images/logo4.png";
import { Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import main from "../../Images/FormImage.png";
import { reloadParticipatedEvents } from "../Events_TSG/actions";
const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};
const eventTitle = "Event Title";
const eventDescription =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
const eventDate = "22nd November 2022";
const eventOrganizer = "TSG IIT Kharagpur";
const eventPoster = logo4;
const participatedEvents = {
	title: ["Event One", "Event Two", "Event Three", "Event Four"],
	organizer: [
		"TSG IIT Kharagpur",
		"Debsoc IIT Kharagpur",
		"TDS IIT Kharagpur",
		"Spectra IIT Kharagpur",
	],
	poster: [logo1, logo2, logo1, logo2],
};

const Example = (props) => {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.userDetails.user._id);
	const userType = useSelector((state) => state.userDetails.user.type);
	let eventsData = useSelector((state) => state.eventDetails.events);
	eventsData = eventsData.slice(0, 2);
	const participatedEvents = useSelector(
		(state) => state.userDetails.user.tsgParticipatedEvents,
	);

	useEffect(() => {
		if (userId && userType === "student")
			dispatch(reloadParticipatedEvents(userId));
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

	return (
		<div>
			<br />
			<br />
			<br />
			<h2 style={{ textAlign: "left", margin: "3% 5%", fontWeight: "bolder" }}>
				Recent Events!
			</h2>
			{eventsData.map((event) => (
				<Card
					style={{ textAlign: "left", boxShadow: "2px grey", margin: "3% 5%" }}
				>
					<Row>
						<Col sm="3">
							<CardImg
								top
								width="auto"
								src={event.images}
								alt="Card image cap"
							/>
						</Col>
						<Col sm="9">
							<CardBody>
								<CardTitle style={{fontWeight:"bolder",color: "#7882bd"}} tag="h5">{event.name}</CardTitle>
								<p>
									{new Date(event.eventStartTime).getDate()}-
									{monthNames[new Date(event.eventStartTime).getMonth()]}{" "}
									{new Date(event.eventStartTime).getFullYear()} |{" "}
									{event.eventType}
								</p>
								<CardText>
									{eventDescription}
									{/* <br />
                <a
                  href="/"
                  style={{ color: "#727dbd", textDecoration: "none" }}
                >
                  View More
                </a> */}
								</CardText>
							</CardBody>
						</Col>
					</Row>
				</Card>
			))}

			<div
				style={{
					border: "#7882bd solid 2px",
					textAlign: "right",
					padding: "0.4em",
          paddingRight:"1em",
					width: "100px",
					position: "absolute",
					right: "30px",
					borderRadius: "5px",
				}}
			>
				<a
					style={{
						textDecoration: "none",
						fontWeight: "bolder",
						color: "#7882bd",
					}}
					href="events-tsg"
				>
					...More
				</a>
			</div>
			<br />
			<br />
			{userType !== "student" ? (
				<div style={{ padding: "3% 5%" }}>
					<h2 style={{ textAlign: "left", fontWeight: "bolder" }}>
						Some Reads For You
					</h2>
					<p style={{ textAlign: "left" }}>
						Learn more about research in the other IITs
					</p>
					<CardGroup style={{ padding: "3%" }}>
						<Card style={{ margin: "0 1%", border: "none" }}>
							<CardImg top width="10%" src={logo1} alt="Card image cap" />
							<CardBody>
								<CardTitle tag="h6">
									Flying high with the best drone tech : The inspiring tale of
									Urban Matrix
								</CardTitle>
							</CardBody>
						</Card>
						<Card style={{ margin: "0 1%", border: "none" }}>
							<CardImg top width="10%" src={logo2} alt="Card image cap" />
							<CardBody>
								<CardTitle tag="h6">
									Dioxane: A Harmful Pollutant and the Search for its Sensor
								</CardTitle>
							</CardBody>
						</Card>
						<Card style={{ margin: "0 1%", border: "none" }}>
							<CardImg top width="10%" src={logo1} alt="Card image cap" />
							<CardBody>
								<CardTitle tag="h6">
									Breaking a Virus 2: COVIRAP and where it goes from here
								</CardTitle>
							</CardBody>
						</Card>
					</CardGroup>
				</div>
			) : (
				<div style={{ padding: "3% 5%" }}>
					<h2 style={{ textAlign: "left", fontWeight: "bolder" }}>
						Participated Events
					</h2>
					<p style={{ textAlign: "left" }}>
						Click On The Event's Title To Download Your Certificate
					</p>
					{/* <CardGroup style={{ padding: "3%" }}> */}
					<Carousel responsive={responsive}>
						{participatedEvents.map((participatedEvent) => (
							<div>
								<Card style={{ margin: "0 1%", border: "none" }}>
									<CardImg
										top
										width="10%"
										src={participatedEvent.images}
										alt="Card image cap"
									/>
									<CardBody>
										<CardTitle tag="h6" style={{ textAlign: "center" }}>
											{participatedEvent.name}:
											<i style={{ fontWeight: "lighter" }}> Organized By </i>
											{participatedEvent.eventType}
										</CardTitle>
									</CardBody>
								</Card>
							</div>
						))}
					</Carousel>
					<br />
					<br />
					<br />
					<Row
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: "0 5%",
						}}
					>
						<Col sm="6">
							<br />
							<img src={main} alt="MainImage" style={{ width: "100%" }} />
						</Col>
						<Col
							sm="6"
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<Form>
								<Row>
									<Col sm="6">
										<FormGroup>
											<Input
												name="name"
												placeholder="Other Events You Have Participated"
												type="name"
											/>
										</FormGroup>
									</Col>
									<Col sm="6">
										<FormGroup>
											<Input
												name="organizer"
												placeholder="Enter Organizing Body"
												type="name"
											/>
										</FormGroup>
									</Col>
								</Row>
								<FormGroup>
									<Input
										name="description"
										placeholder="Enter Event Description"
										type="name"
									/>
								</FormGroup>
								<FormGroup>
									<InputGroup>
										<Input placeholder="Update Your Certificate" />
										<Button style={{ backgroundColor: "#727dbd" }}>
											Upload Certificate
										</Button>
									</InputGroup>
								</FormGroup>
								<br />
								<center>
									<Button
										style={{
											width: "200px",
											height: "50px",
											backgroundColor: "#727dbd",
											color: "white",
											border: "none",
										}}
									>
										Update Information
									</Button>
								</center>
							</Form>
							<br />
						</Col>
					</Row>
				</div>
			)}
		</div>
	);
};

export default Example;
