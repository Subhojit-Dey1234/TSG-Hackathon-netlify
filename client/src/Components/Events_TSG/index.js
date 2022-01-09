import React, { useEffect, useState, useRef } from "react";
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
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import logo1 from "../../Images/logo1.png";
import logo2 from "../../Images/logo2.png";
import upload from "../../Images/upload.svg";
// import logo3 from "../../Images/logo3.png";
import logo4 from "../../Images/logo4.png";
import { Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import loadingUpload from "../../Images/loader.gif";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import main from "../../Images/FormImage.png";

import {
	downloadReport,
	getEvents,
	searchAction,
	uploadEvents,
	uploadReport,
} from "./actions";

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


	const events = useSelector((state) => state.eventDetails.events);

	useEffect(() => {
		dispatch(getEvents());
		// setEventData(eventData)
	}, []);

	const [nameEvent, setNameEvent] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [organizer, setOrganizer] = useState(null);
	const [description, setDescription] = useState(null);
	const [image, setImage] = useState(null);
	const [reportUpload, setReportUpload] = useState(null);
	const [searchString, setSearch] = useState("")
	// const [events, setEventData] = useState([])
	const [ isPressed, setPressed ] = useState(false)

	const scrollForm = useRef(null);

	function UploadEvent(e) {
		e.preventDefault();

		var form = new FormData();
		form.append("name", nameEvent);
		form.append("description", description);
		form.append("eventStartTime", startDate);
		form.append("eventEndTime", endDate);
		form.append("eventType", organizer);
		form.append("images", image[0]);

		dispatch(
			uploadEvents(form, (res) => {
				if (res.status === 200) {
					setNameEvent(null);
					setDescription(null);
					setStartDate(null);
					setEndDate(null);
					setOrganizer(null);
					setImage(null);
				}
			}),
		);
	}

	const UploadReport = (_id) => {
		var form = new FormData();
		form.append("reports", reportUpload[0]);

		dispatch(
			uploadReport(_id, form, (res) => {
				if (res.status === 200) {
					setModalOpen(false);
				}
			}),
		);
	};

	function downloadReportFrontend(blob, name) {
		if (window.navigator && window.navigator.msSaveOrOpenBlob)
			return window.navigator.msSaveOrOpenBlob(blob);

		// For other browsers:
		// Create a link pointing to the ObjectURL containing the blob.
		var binaryData = [];
		binaryData.push(blob);
		const data = window.URL.createObjectURL(
			new Blob(binaryData, { type: "application/pdf" }),
		);

		const link = document.createElement("a");
		link.href = data;
		link.download = name;

		// this is necessary as link.click() does not work on the latest firefox
		link.dispatchEvent(
			new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				view: window,
			}),
		);
	}

	// function search(e) {
	// 	if (e.target.value === "") {
	// 		dispatch(getEvents());
	// 	} else {
	// 		const res = eventData.filter((event) => {
	// 			let val = event.description + event.eventType;
	// 			if (val.toLowerCase().includes(e.target.value.toLowerCase())) {
	// 				return event;
	// 			}
	// 		});
	// 		// setEventData(res)
	// 	}

	// }

	const fileInput = React.useRef(null);
	const imageInput = React.useRef(null);
	const [isModalOpen, setModalOpen] = useState(false);
	const userType = "tsgOfficial";
	// const userType = useSelector((state)=>state.userDetails.user.type);
	return (
		<div>
			<br />
			<br />
			<br />
			<Button
				style={{ margin: "0 5%", background: "#727dbd" }}
				onClick={() => {
					scrollForm.current.scrollIntoView({
						behavior: "smooth",
					});
				}}
			>
				Upload Events
			</Button>
			<h2 style={{ textAlign: "left", margin: "3% 5%", fontWeight: "bolder" }}>
				Posted Events!
			</h2>
			<Input
				type="text"
				onChange={(e) => {
					// search(e);
				}}
			/>
			{events.map((event) => (
				<Card
					key={event._id}
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
								<CardTitle tag="h5">{event.name}</CardTitle>
								<p>
									{eventDate} | {event.eventType}
								</p>
								<CardText>
									{event.description}
									<br />
									<br />

									{userType !== "student" ? (
										<div>
											<Button
												disabled={!event.reports}
												style={{
													background: "#727dbd",
													color: "white",
													textDecoration: "none",
													cursor: "pointer",
												}}
												onClick={(e) => {
													if (event.reports) {
														dispatch(
															downloadReport(event._id, (res) => {
																downloadReportFrontend(
																	res,
																	`${event.reports[0].filename}`,
																);
															}),
														);
													}
												}}
											>
												Download Report
											</Button>{" "}
											<Button
												href={() => false}
												onClick={() => setModalOpen(true)}
												style={{
													background: "#ab0000",
													textDecoration: "none",
													border: "none",
													cursor: "pointer",
												}}
											>
												Upload Report
											</Button>
											<Button
												style={{ position: "absolute", right: "10px" }}
												color="danger"
											>
												Delete
											</Button>
											<Modal
												isOpen={isModalOpen}
												toggle={() => setModalOpen(false)}
												centered={true}
											>
												<ModalHeader>Upload the Report</ModalHeader>
												<ModalBody>
													<input
														accept="application/pdf, image/png, image/jpeg,"
														ref={fileInput}
														type="file"
														style={{ display: "none" }}
														onChange={(e) => {
															setReportUpload(e.target.files);
														}}
													/>
													<img
														src={upload}
														alt="upload-image"
														style={{
															width: "100px",
															position: "relative",
															left: "50%",
															transform: "translateX(-50%)",
															opacity: "0.9",
															cursor: "pointer",
														}}
														onClick={() => {
															fileInput.current.click();
														}}
													/>
													<ModalFooter>
														<Button
															disabled={!reportUpload}
															onClick={(e) => {
																UploadReport(event._id);
															}}
															style={{ background: "#727dbd" }}
														>
															Upload
														</Button>
													</ModalFooter>
												</ModalBody>
											</Modal>
											<input
												ref={fileInput}
												type="file"
												style={{ visibility: "hidden" }}
											/>
										</div>
									) : (
										<div>
											<a
												href={() => false}
												style={{ color: "#727dbd", textDecoration: "none" }}
											>
												Download Report
											</a>{" "}
											|{" "}
											<a
												href={() => false}
												style={{
													color: "red",
													textDecoration: "none",
												}}
											>
												Participate Now
											</a>
										</div>
									)}
								</CardText>
							</CardBody>
						</Col>
					</Row>
				</Card>
			))}
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
						<div>
							<Card style={{ margin: "0 1%", border: "none" }}>
								<CardImg
									top
									width="10%"
									src={participatedEvents.poster[0]}
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle tag="h6" style={{ textAlign: "center" }}>
										{participatedEvents.title[0]}: Organized By{" "}
										{participatedEvents.organizer[0]}
									</CardTitle>
								</CardBody>
							</Card>
						</div>
						<div>
							<Card style={{ margin: "0 1%", border: "none" }}>
								<CardImg
									top
									width="10%"
									src={participatedEvents.poster[1]}
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle tag="h6" style={{ textAlign: "center" }}>
										{participatedEvents.title[1]}: Organized By{" "}
										{participatedEvents.organizer[1]}
									</CardTitle>
								</CardBody>
							</Card>
						</div>
						<div>
							<Card style={{ margin: "0 1%", border: "none" }}>
								<CardImg
									top
									width="10%"
									src={participatedEvents.poster[2]}
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle tag="h6" style={{ textAlign: "center" }}>
										{participatedEvents.title[2]}: Organized By{" "}
										{participatedEvents.organizer[2]}
									</CardTitle>
								</CardBody>
							</Card>
						</div>
						<div>
							<Card style={{ margin: "0 1%", border: "none" }}>
								<CardImg
									top
									width="10%"
									src={participatedEvents.poster[3]}
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle tag="h6" style={{ textAlign: "center" }}>
										{participatedEvents.title[3]}: Organized By{" "}
										{participatedEvents.organizer[3]}
									</CardTitle>
								</CardBody>
							</Card>
						</div>
					</Carousel>
					{/* </CardGroup> */}
					<br />
					<br />
					<br />
				</div>
			)}
			{userType !== "tsgOfficial" ? (
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
											name="firstName"
											placeholder="First Name"
											type="name"
										/>
									</FormGroup>
								</Col>
								<Col sm="6">
									<FormGroup>
										<Input
											name="lastName"
											placeholder="Last Name"
											type="name"
										/>
									</FormGroup>
								</Col>
							</Row>
							<FormGroup>
								<Input name="mail" placeholder="Your Mail" type="email" />
							</FormGroup>
							<Row>
								<Col sm="6">
									<FormGroup>
										<Input name="roll" placeholder="Your Roll" type="name" />
									</FormGroup>
								</Col>
								<Col sm="6">
									<FormGroup>
										<Input
											name="hall"
											placeholder="Your Hall of Residence"
											type="name"
										/>
									</FormGroup>
								</Col>
							</Row>
							<FormGroup>
								<Input
									name="subject"
									placeholder="Request Subject"
									type="name"
								/>
							</FormGroup>
							<FormGroup>
								<Input name="message" placeholder="Your Message" type="name" />
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
			) : (
				<div ref={scrollForm}>
					<Row
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: "0 5%",
						}}
					>
						<h2 style={{ textAlign: "left", fontWeight: "bolder" }}>
							Upload Your Events
						</h2>
						<Col sm="6">
							<br />
							<img src={main} alt="MainImage" style={{ width: "100%" }} />
						</Col>
						<Col
							sm="6"
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<Form onSubmit={UploadEvent}>
								<FormGroup>
									<Input
										required={true}
										value={nameEvent ? nameEvent : ""}
										name="name"
										placeholder="Name of The Event"
										type="name"
										onChange={(e) => setNameEvent(e.target.value)}
									/>
								</FormGroup>
								<Row>
									<Col sm="6">
										<FormGroup>
											<Input
												required={true}
												value={startDate ? startDate : ""}
												name="date"
												placeholder="Schedule of The Event"
												type="datetime-local"
												onChange={(e) => setStartDate(e.target.value)}
											/>
										</FormGroup>
									</Col>
									<Col sm="6">
										<FormGroup>
											<Input
												required={true}
												value={endDate ? endDate : ""}
												name="date"
												placeholder="Schedule of The Event"
												type="datetime-local"
												onChange={(e) => setEndDate(e.target.value)}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Input
												required={true}
												value={organizer ? organizer : ""}
												name="organizer"
												placeholder="Enter Organizing Body"
												type="name"
												onChange={(e) => setOrganizer(e.target.value)}
											/>
										</FormGroup>
									</Col>
								</Row>
								<FormGroup>
									<Input
										required={true}
										value={description ? description : ""}
										name="description"
										placeholder="Enter Event Description"
										type="textarea"
										onChange={(e) => setDescription(e.target.value)}
									/>
								</FormGroup>
								<FormGroup>
									<FormGroup>
										<Input
											required={true}
											placeholder="Update Event Image"
											type="file"
											ref={imageInput}
											onChange={(e) => {
												setImage(e.target.files);
											}}
										/>
									</FormGroup>
								</FormGroup>
								<br />
								<center>
									<Button
										type="submit"
										style={{
											width: "200px",
											height: "50px",
											backgroundColor: "#727dbd",
											color: "white",
											border: "none",
										}}
									>
										{/* <img
										style={{ height: "100%" }}
										src={loadingUpload}
										alt="loader"
									/> */}
										Upload
									</Button>
								</center>
							</Form>
						</Col>
					</Row>
				</div>
			)}
		</div>
	);
};

export default Example;
