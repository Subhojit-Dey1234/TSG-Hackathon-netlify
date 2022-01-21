import React, { useEffect, useState } from "react";
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
import { downloadReport, getAcheivement, uploadAcheivement } from "./actions";
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

const Example = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userDetails.user._id);
  const userType = useSelector((state) => state.userDetails.user.type);
  const userRoll = useSelector((state) => state.userDetails.user.rollNumber);

  const acheivements = useSelector((state) => state.achievementsDetils.events);

  let eventsData = useSelector((state) => state.eventDetails.events);
  eventsData = eventsData.slice(0, 2);
  const participatedEvents = useSelector(
    (state) => state.userDetails.user.tsgParticipatedEvents
  );

  function downloadReportFrontend(blob, name) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob)
      return window.navigator.msSaveOrOpenBlob(blob);

    var binaryData = [];
    binaryData.push(blob);
    const data = window.URL.createObjectURL(
      new Blob(binaryData, { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = data;
    link.download = name;

    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
  }

  const [achievementTitle, setachievementTitle] = useState(null);
  const [achievementDescription, setAchievementDescription] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [certificates, setCertificates] = useState(null);

  function uploadAcheivements(e) {
    console.log(certificates, ranking);
    e.preventDefault();

    var form = new FormData();
    form.append("rollNumber", userRoll);
    form.append("achievementTitle", achievementTitle);
    form.append("achievementDescription", achievementDescription);
    form.append("ranking", ranking);
    form.append("certificates", certificates[0]);

    console.log(userRoll, ranking, achievementDescription, certificates);

    dispatch(
      uploadAcheivement(form, (res) => {
        console.log(res);
      })
    );
  }

  useEffect(() => {
    if (userId && userType === "student") {
      dispatch(reloadParticipatedEvents(userId));
      dispatch(
        getAcheivement(userRoll, (res) => {
          console.log(res);
        })
      );
    }
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
      <h2 style={{ textAlign: "left", margin: "3% 5%", fontWeight: "bolder" }}>
        Recent Events!
      </h2>
      {eventsData.map((event) => (
        <Card
          style={{ textAlign: "left", boxShadow: "2px grey", margin: "3% 5%" }}
        >
          <Row style={{ alignItems: "center", justifyContent: "center" }}>
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
                <CardTitle
                  style={{ fontWeight: "bolder", color: "#7882bd" }}
                  tag="h5"
                >
                  {event.name}
                </CardTitle>
                <p>
                  {new Date(event.eventStartTime).getDate()}-
                  {monthNames[new Date(event.eventStartTime).getMonth()]}{" "}
                  {new Date(event.eventStartTime).getFullYear()} |{" "}
                  {event.eventType}
                </p>
                <CardText>
                  {event.description.length < 475
                    ? `${event.description}`
                    : `${event.description.substring(0, 476)}...`}
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
          paddingRight: "1em",
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
            Check Out All The Events You Have Participated
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
              <Form onSubmit={uploadAcheivements}>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Input
                        name="name"
                        placeholder="Other Events/Hackathons You've Participated (Achievements)"
                        type="name"
                        onChange={(e) => setachievementTitle(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Input
                        value={ranking}
                        placeholder="Ranking "
                        type="name"
                        onChange={(e) => setRanking(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Input
                    name="description"
                    placeholder="Enter The Description"
                    type="name"
                    onChange={(e) => setAchievementDescription(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    // required={true}
                    accept="image/png,image/jpeg,image/jpg"
                    placeholder="Update Certificate"
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files);
                      setCertificates(e.target.files);
                    }}
                  />
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
                    Update Certificates
                  </Button>
                </center>
              </Form>
              <br />
            </Col>
          </Row>
        </div>
      )}

      <div style={{ display: userType !== "student" ? "none" : "", margin:"3% 5%" }}>
        <h2
          style={{ textAlign: "left", fontWeight: "bolder" }}
        >
          My Achievements
        </h2>
		<p style={{ textAlign: "left" }}>
            Check Out All Your Achievements Here
          </p>
        <marquee
          behaviour="alternate"
          scrollamount="15"
          style={{ margin: "0% 10% 0 10%" }}
        >
          <CardGroup style={{ margin: "2% 4% 0 4%" }}>
            {acheivements.map((achievement) => (
              <Card body style={{ margin: "2%" }}>
                <center>
                  <CardImg
                    style={{ width: "100%" }}
                    src="https://www.knowafest.com/files/uploads/Inter%20IIT%20LOGO-2019102501.jpg"
                  />
                  <CardTitle tag="h5">{achievement.achievementTitle}</CardTitle>
                  <CardText>{achievement.achievementCategory}</CardText>
                </center>
                <Button
                  onClick={() => {
                    console.log(achievement.certificates);
                    dispatch(
                      downloadReport(achievement._id, (res) => {
                        downloadReportFrontend(
                          res,
                          `${achievement.certificates[0].filename}`
                        );
                      })
                    );
                  }}
                  style={{ backgroundColor: "#727dbd", border: "none" }}
                >
                  Download Certificate Now
                </Button>
              </Card>
            ))}
          </CardGroup>
        </marquee>
        {/* <Card body>
          <CardTitle tag="h5">Special Title Treatment</CardTitle>
          <CardText>
            With supporting text below as a natural lead-in to additional
            content.
          </CardText>
          <Button>Go somewhere</Button>
        </Card> */}
        {/* {acheivements.map((acheivement) => (
          <Card
            style={{
              textAlign: "left",
              boxShadow: "2px grey",
              margin: "3% 5%",
            }}
          >
            <Row style={{ alignItems: "center", justifyContent: "center" }}>
              <Col sm="12">
                <CardBody>
                  <CardTitle
                    style={{ fontWeight: "bolder", color: "#7882bd" }}
                    tag="h5"
                  >
                    {acheivement.achievementTitle}
                  </CardTitle>
                  <CardText>
                    {acheivement.achievementDescription}{" "}
                    <i>{acheivement.achievementCategory}</i>
                  </CardText>
                  <Button
                    onClick={() => {
                      console.log(acheivement.certificates);
                      dispatch(
                        downloadReport(acheivement._id, (res) => {
                          downloadReportFrontend(
                            res,
                            `${acheivement.certificates[0].filename}`
                          );
                        })
                      );
                    }}
                  >
                    Download
                  </Button>
                </CardBody>
              </Col>
            </Row>
          </Card>
        ))} */}
      </div>
    </div>
  );
};

export default Example;
