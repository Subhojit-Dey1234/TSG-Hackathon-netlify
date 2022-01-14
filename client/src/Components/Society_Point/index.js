import React, { useEffect, useState } from "react";
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
  Alert
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
import { downloadReport, uploadGrievances, participateEventSocio } from '../Events_TSG/actions'


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

const Example = (props) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef(null);
  const [subject, setSubject] = useState(null);
	const [grievanceDescription, setGrievanceDescription] = useState(null);
  const userType = useSelector((state) => state.userDetails.user.type);
  // const userType = "societyOfficial";
  const eventsData = useSelector((state) => state.eventDetails.events);
  const user = useSelector((state) => state.userDetails.user);

  const participatedEvents = useSelector(
		(state) => state.userDetails.user.societyParticipatedEvents,
	);

  function uploadGrievance(e) {
		e.preventDefault();
		var form = new FormData();
		form.append("rollNumber", user.rollNumber);
		form.append("hallOfResidence",user.hallOfResidence)
		form.append("mail", user.mail);
		form.append("studentName", user.name);
		form.append("grievanceDescription", grievanceDescription);
		form.append("subject", subject);

		console.log(subject, grievanceDescription);

		dispatch(
			uploadGrievances(form, (res) => {
				if(res.status === 200){
					setSubject(null)
					setGrievanceDescription(null)
				}
			}),
		);
	}


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

  // const userType = useSelector((state)=>state.userDetails.user.type);
  return (
    <div>
      <br />
      <br />
      <br />
      <h2 style={{ textAlign: "left", margin: "3% 5%", fontWeight: "bolder" }}>
        Recent Events!
      </h2>
      {eventsData.map((event)=>(
      <Card key={event._id}
        style={{ textAlign: "left", boxShadow: "2px grey", margin: "3% 5%" }}
      >
        <Row>
          <Col sm="3">
            <CardImg top width="auto" src={event.images} alt="Card image cap" />
          </Col>
          <Col sm="9">
            <CardBody>
              <CardTitle tag="h5">{eventTitle}</CardTitle>
              <p>
                {eventDate} | {event.eventType}
              </p>
              <CardText>
              {event.description}
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
																	`${event.reports[0].filename}`,
																);
															}),
														);
													}
												}}
											>
												Download Report
											</Button>{" "}
                      <Button onClick={()=>{
                        let isConfirmed = window.confirm(
                          "Are you Sure???"
                        );
                        if (isConfirmed) {
                          dispatch(
                            participateEventSocio(event._id, {
                              rollNumber: "19ME10087",
                            }),
                          );
                        }
                      }} color="warning">Participate Now</Button>
										</div>
									</div>
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>))}
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
          {/* </CardGroup> */}
          <br />
          <br />
          <br />
        </div>
      )}
      {userType !== "societyOfficial" ? (
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
      ) : (
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
              <FormGroup>
                <Input
                  name="name"
                  placeholder="Name of The Event"
                  type="name"
                />
              </FormGroup>
              <Row>
                <Col sm="6">
                  <FormGroup>
                    <Input
                      name="date"
                      placeholder="Schedule of The Event"
                      type="datetime-local"
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
                  <Input placeholder="Update Event Image" type="file"/>
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
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Example;
