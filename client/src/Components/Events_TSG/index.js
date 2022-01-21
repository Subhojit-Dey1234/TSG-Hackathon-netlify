import React, { useEffect, useState, useRef, createRef } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardGroup,
	Input,
	Button,
	Form,
	FormGroup,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Alert,
	Table,
} from "reactstrap";
import logo1 from "../../Images/logo1.png";
import logo2 from "../../Images/logo2.png";
import upload from "../../Images/upload.svg";
// import logo3 from "../../Images/logo3.png";
import deleteImg from "../../Images/delete.svg";
import editImg from "../../Images/edit.svg";
import { Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import loadingUpload from "../../Images/loader.gif";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import main from "../../Images/FormImage.png";
import {
	deleteEvents,
	downloadReport,
	getEvents,
	participateEvent,
	reloadParticipatedEvents,
	uploadEvents,
	uploadReport,
	uploadGrievances,
	searchEvents,
} from "./actions";
import io from "socket.io-client";

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

var socket = io("https://hackathon-tsg.herokuapp.com/");

const Example = (props) => {
	const dispatch = useDispatch();
	// const [ socket , setSocket ] = useState(null)

	const eventsData = useSelector((state) => state.eventDetails.events);
	const userId = useSelector((state) => state.userDetails.user._id);
	const userType = useSelector((state) => state.userDetails.user.type);
	var host = window.location.origin;

	// const userType = "student";
	useEffect(() => {
		// socket.on("get_notification",data=>{
		//   console.log(data)
		// })
		dispatch(
			getEvents((res) => {
				// console.log(res)
			}),
		);
		if (userType === "student" && userId) {
			dispatch(reloadParticipatedEvents(userId));
		}
	}, []);

	const user = useSelector((state) => state.userDetails.user);

	const imageInput = React.useRef(null);

	const [nameEvent, setNameEvent] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [organizer, setOrganizer] = useState(null);
	const [description, setDescription] = useState(null);
	const [image, setImage] = useState(null);
	const [reportUpload, setReportUpload] = useState(null);
	const [alartView, setalartView] = useState(false);
	const scrollForm = useRef(null);
	const [eventId, setEventId] = useState(null);
	const [studentData, setStudentData] = useState([]);
	const [updateModal, setUpdateModal] = useState(false);
	const [updateModal1, setUpdateModal1] = useState(false);
	// Grievance
	const [subject, setSubject] = useState(null);
	const [grievanceDescription, setGrievanceDescription] = useState(null);

	function uploadGrievance(e) {
		e.preventDefault();
		var form = new FormData();
		form.append("rollNumber", user.rollNumber);
		form.append("hallOfResidence", user.hallOfResidence);
		form.append("mail", user.mail);
		form.append("studentName", user.name);
		form.append("grievanceDescription", grievanceDescription);
		form.append("subject", subject);

		// console.log(subject, grievanceDescription);

		dispatch(
			uploadGrievances(form, (res) => {
				if (res.status === 200) {
					setSubject(null);
					setGrievanceDescription(null);
				}
			}),
		);
	}

	function UploadEvent(e) {
		socket.emit("get_notification");
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
					imageInput.current.value = "";
				}
			}),
		);
	}

	function UpdateEvent(e) {
		e.preventDefault();

		var form = new FormData();
		form.append("name", nameEvent);
		form.append("description", description);
		form.append("eventStartTime", startDate);
		form.append("eventEndTime", endDate);
		form.append("eventType", organizer);
		if (image) form.append("images", image[0]);

		dispatch(
			uploadReport(eventId, form, (res) => {
				if (res.status === 200) {
					setNameEvent(null);
					setDescription(null);
					setStartDate(null);
					setEndDate(null);
					setOrganizer(null);
					setImage(null);
					imageInput.current.value = "";
					setUpdateModal(false);
				}
			}),
		);
	}

	const UploadReport = (_id) => {
		// console.log(reportUpload);
		var form = new FormData();
		form.append("reports", reportUpload[0]);

		dispatch(
			uploadReport(_id, form, (res) => {
				if (res.status === 200) {
					setalartView(true);
					setTimeout(() => {
						setModalOpen(false);
						setalartView(false);
					}, 1000);

					setReportUpload(null);
					fileInput.current.value = "";
				}
			}),
		);
	};

	function downloadReportFrontend(blob, name) {
		if (window.navigator && window.navigator.msSaveOrOpenBlob)
			return window.navigator.msSaveOrOpenBlob(blob);

		var binaryData = [];
		binaryData.push(blob);
		const data = window.URL.createObjectURL(
			new Blob(binaryData, { type: "application/pdf" }),
		);

		const link = document.createElement("a");
		link.href = data;
		link.download = name;

		link.dispatchEvent(
			new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				view: window,
			}),
		);
	}

	const debounce = function (fn, d) {
		let timer;
		return function () {
			let context = this,
				args = arguments;
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn.apply(context, args);
			}, d);
		};
	};

	function search(e) {
		debounce(
			dispatch(
				searchEvents(e.target.value, (res) => {
					console.log(res);
				}),
			),
			500,
		);
	}

	const fileInput = React.useRef(null);

	const [isModalOpen, setModalOpen] = useState(false);
	const [isExtended, setExtendedModalOpen] = useState(false);
	const [isParticipateModal, setParticipateModal] = useState(false);
	const s = useSelector((state) => state.userDetails.user);
	// console.log(s);

	const [elRefs, setElRefs] = useState([]);

	React.useEffect(() => {
		// add or remove refs
		setElRefs((elRefs) =>
			Array(eventsData.length)
				.fill()
				.map((_, i) => elRefs[i] || createRef()),
		);
	}, [eventsData.length]);

	const participatedEvents = useSelector(
		(state) => state.userDetails.user.tsgParticipatedEvents,
	);

	if (localStorage.getItem("EventId")) {
		let el = elRefs.filter((el) => {
			if (el.current)
				return (
					el.current.getAttribute("eventId") === localStorage.getItem("EventId")
				);
		});
		if (el[0] !== undefined) {
			window.scrollTo({
				behavior: "smooth",
				left: 0,
				top: el[0].current.offsetTop,
			});
		}
	}

	window.onload = function () {
		setTimeout(() => {
			localStorage.removeItem("EventId");
		}, 1000);
	};

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
	// console.log(startDate);
	return (
		<div>
			<br />
			<br />
			<br />

			{/* <Button
				style={{ margin: "0 5%", background: "#727dbd" }}
				onClick={() => {
					scrollForm.current.scrollIntoView({
						behavior: "smooth",
					});
				}}
			>
				Upload Events
			</Button> */}
			<Row>
				<Col sm="6">
					<h2
						style={{
							textAlign: "left",
							margin: "3% 5% 0 5%",
							fontWeight: "bolder",
						}}
					>
						See Posted Events!
					</h2>
					<a
						href={() => false}
						onClick={() => {
							scrollForm.current.scrollIntoView({
								behavior: "smooth",
							});
						}}
						style={{
							textDecoration: "none",
							margin: "3% 5% 0 5%",
							color: "blue",
							cursor: "pointer",
							display: userType === "student" ? "none" : "",
						}}
					>
						Want to Create An Event Now?
					</a>
				</Col>
				<Col sm="6">
					<Input
						style={{
							borderRadius: "10px",
							border: "6px solid #eaeaea",
							margin: "5%",
							width: "87.5%",
						}}
						placeholder="Search Your Event By Typing..."
						type="text"
						onChange={(e) => {
							search(e);
						}}
					/>
				</Col>
			</Row>

			<br />
			<br />

			{eventsData.map((event, i) => (
				<div ref={elRefs[i]} eventId={event._id}>
					<Card
						key={event._id}
						style={{
							textAlign: "left",
							boxShadow: "2px grey",
							margin: "3% 5%",
						}}
					>
						<Row style={{ alignItems: "center", justifyContent: "center" }}>
							<Col sm="3">
								<center>
									<CardImg
										top
										src={host + event.images}
										alt="Card image cap"
										style={{
											objectFit: "cover",
											width: "20em",
											height: "20em",
											//   display: window.innerWidth < 900 ? "none" : "block",
										}}
									/>
								</center>
							</Col>
							<Col sm="9">
								<CardBody>
									<CardTitle tag="h5">{event.name}</CardTitle>
									<p>
										{new Date(event.eventStartTime).getDate()}-
										{monthNames[new Date(event.eventStartTime).getMonth()]}{" "}
										{new Date(event.eventStartTime).getFullYear()} |{" "}
										{new Date(event.eventEndTime).getDate()}-
										{monthNames[new Date(event.eventEndTime).getMonth()]}{" "}
										{new Date(event.eventEndTime).getFullYear()} |{" "}
										{event.eventType}
									</p>
									<CardText>
										<CardText>
											{event.description.length < 475
												? `${event.description}`
												: `${event.description.substring(0, 476)}...`}
											<br />
											<a
												href={() => false}
												onClick={() => {
													setExtendedModalOpen(true);
													setNameEvent(event.name);
													setDescription(event.description);
													setStartDate(event.eventStartTime);
													setEndDate(event.eventEndTime);
													setImage(event.images);
												}}
												style={{
													display: event.description.length < 475 ? "none" : "",
													textDecoration: "none",
													color: "#727dbd",
													fontWeight: "bolder",
													cursor: "pointer",
												}}
											>
												Read More
											</a>
										</CardText>
										<br />
										<br />
										<div>
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
																		`${host} + ${event.reports[0].filename}`,
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
													onClick={() => {
														setModalOpen(true);
														setEventId(event._id);
													}}
													style={{
														background: "#ab0000",
														textDecoration: "none",
														border: "none",
														cursor: "pointer",
														display: userType === "student" ? "none" : "",
													}}
												>
													Upload Report
												</Button>{" "}
												<Button
													onClick={(e) => {
														setEventId(event._id);
														setParticipateModal(true);
													}}
													color="danger"
													style={{
														textDecoration: "none",
														display: userType === "student" ? "" : "none",
													}}
												>
													Participate Now
												</Button>{" "}
												<Button
													style={{
														position: "absolute",
														right: "60px",
														top: "10px",
														display: userType === "student" ? "none" : "",
													}}
													color="danger"
													onClick={(e) => {
														dispatch(
															deleteEvents(event._id, (res) => {
																console.log(res);
																if (res.status === 200) {
																	// setEventData(
																	// 	eventsData.filter(
																	// 		(ev) => ev._id !== event._id,
																	// 	),
																	// );
																}
															}),
														);
													}}
												>
													<img src={deleteImg} style={{ width: "20px" }} />
												</Button>
												<Button
													style={{
														position: "absolute",
														right: "10px",
														top: "10px",
														display: userType === "student" ? "none" : "",
													}}
													color="warning"
													onClick={(e) => {
														setUpdateModal(true);
														setEventId(event._id);
														setNameEvent(event.name);
														setStartDate(
															event.eventStartTime.slice(
																0,
																event.eventStartTime.length - 1,
															),
														);
														setEndDate(
															event.eventEndTime.slice(
																0,
																event.eventEndTime.length - 1,
															),
														);
														setOrganizer(event.eventType);
														setDescription(event.description);
													}}
												>
													<img src={editImg} style={{ width: "20px" }} />
												</Button>
												<Button
													style={{
														position: "absolute",
														right: "110px",
														top: "10px",
														display: userType === "student" ? "none" : "",
													}}
													color="success"
													onClick={() => {
														setUpdateModal1(true);
														setStudentData(event.students);
													}}
												>
													<img src={editImg} style={{ width: "20px" }} />
												</Button>{" "}
											</div>
										</div>
									</CardText>
								</CardBody>
							</Col>
						</Row>
					</Card>
				</div>
			))}

			<Modal
				isOpen={isExtended}
				toggle={() => {
					setNameEvent(null);
					setDescription(null);
					setEndDate(null);
					setOrganizer(null);
					setStartDate(null);
					setImage(null);
					setExtendedModalOpen(false);
				}}
			>
				<ModalHeader>{nameEvent}</ModalHeader>
				<ModalBody>
					<Card>
						<CardImg src={image} />
						<CardBody>{description}</CardBody>
					</Card>
				</ModalBody>
			</Modal>
			<Modal
				isOpen={isModalOpen}
				toggle={() => {
					setNameEvent(null);
					setDescription(null);
					setEndDate(null);
					setOrganizer(null);
					setStartDate(null);
					setImage(null);
					setModalOpen(false);
				}}
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
					<div style={{ display: alartView ? "block" : "none" }}>
						<Alert>PDF Uploaded Successfully</Alert>
					</div>
					<ModalFooter>
						<Button
							disabled={!reportUpload}
							onClick={(e) => {
								UploadReport(eventId);
							}}
							style={{ background: "#727dbd" }}
						>
							Upload
						</Button>
					</ModalFooter>
				</ModalBody>
			</Modal>
			<input
				accept="image/png, image/jpeg,"
				ref={fileInput}
				type="file"
				style={{ visibility: "hidden" }}
			/>
			<Modal
				isOpen={isParticipateModal}
				toggle={() => setParticipateModal(false)}
				centered={true}
			>
				<ModalHeader>Confirm to Continue</ModalHeader>
				<ModalFooter>
					<Button
						color="success"
						onClick={() => {
							dispatch(
								participateEvent(
									eventId,
									{
										rollNumber: "19ME10087",
									},
									(res) => {
										if (res.status === 200) {
											setParticipateModal(false);
										}
									},
								),
							);
						}}
					>
						Confirm
					</Button>
				</ModalFooter>
			</Modal>
			<Modal
				centered
				isOpen={updateModal}
				toggle={() => {
					setUpdateModal(false);
				}}
			>
				<ModalHeader>Edit</ModalHeader>
				<ModalBody>
					<Form onSubmit={UpdateEvent}>
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
								<input
									// required={true}
									accept="image/png,image/jpeg,image/jpg"
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
								// disabled={!image}
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
				</ModalBody>
			</Modal>
			<Modal
				centered
				isOpen={updateModal1}
				toggle={() => {
					setUpdateModal1(false);
				}}
			>
				<ModalHeader>
					<center>
						<h4
							style={{
								textAlign: "center",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							List of The Participants
						</h4>
					</center>
				</ModalHeader>
				<ModalBody>
					<Table borderless style={{ backgroundColor: "white" }}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Roll No.</th>
								<th>Email</th>
							</tr>
						</thead>
						{studentData.map((student) => (
							<tr>
								<td>{student.name}</td>
								<td>{student.rollNumber}</td>
								<td>{student.mail}</td>
							</tr>
						))}
					</Table>
				</ModalBody>
			</Modal>
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
						Participated Events By TSG
					</h2>
					<p style={{ textAlign: "left" }}>
						Click On The Event's Title To Download Your Certificate
					</p>
					{/* <CardGroup style={{ padding: "3%" }}> */}
					{participatedEvents === undefined ? (
						<div>Empty</div>
					) : (
						<Carousel responsive={responsive}>
							{participatedEvents.map((participatedEvent) => (
								<div style={{ height: "40em" }}>
									<Card style={{ margin: "0 1%", border: "none" }}>
										<div
											style={{ height: "25em", width: "25em", margin: "auto" }}
										>
											<CardImg
												top
												style={{ objectFit: "contain" }}
												src={host + participatedEvent.images}
												alt="Card image cap"
											/>
										</div>
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
					)}
					{/* </CardGroup> */}
					<br />
					<br />
					<br />
				</div>
			)}
			{userType !== "tsgOfficial" ? (
				<div ref={scrollForm}>
					<Row
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: "0 5%",
						}}
					>
						<h2 style={{ textAlign: "left", fontWeight: "bolder" }}>
							Upload Your Grievances
						</h2>
						<Col sm="6">
							<br />
							<img src={main} alt="MainImage" style={{ width: "100%" }} />
						</Col>
						<Col
							sm="6"
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<Form onSubmit={uploadGrievance}>
								<Row>
									<Col sm="12">
										<FormGroup>
											<Input
												value={user.name}
												disabled
												required={true}
												name="firstName"
												placeholder="Name"
												type="name"
											/>
										</FormGroup>
									</Col>
								</Row>
								<FormGroup>
									<Input
										disabled
										value={user.mail}
										name="mail"
										placeholder="Your Mail"
										type="email"
									/>
								</FormGroup>
								<Row>
									<Col sm="6">
										<FormGroup>
											<Input
												disabled
												value={user.rollNumber}
												name="roll"
												placeholder="Your Roll"
												type="name"
											/>
										</FormGroup>
									</Col>
									<Col sm="6">
										<FormGroup>
											<Input
												value={user.hallOfResidence}
												disabled
												name="hall"
												placeholder="Your Hall of Residence"
												type="name"
											/>
										</FormGroup>
									</Col>
								</Row>
								<FormGroup>
									<Input
										required={true}
										value={subject ? subject : ""}
										name="subject"
										placeholder="Request Subject"
										type="name"
										onChange={(e) => {
											setSubject(e.target.value);
										}}
									/>
								</FormGroup>
								<FormGroup>
									<Input
										required={true}
										value={grievanceDescription ? grievanceDescription : ""}
										name="message"
										placeholder="Your Message"
										type="textarea"
										onChange={(e) => {
											setGrievanceDescription(e.target.value);
										}}
									/>
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
										Upload Grievances
									</Button>
								</center>
							</Form>
							<br />
						</Col>
					</Row>
				</div>
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
										<input
											required={true}
											accept="image/png,image/jpeg,image/jpg"
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
										disabled={!image}
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
