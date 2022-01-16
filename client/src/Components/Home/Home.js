import React, { useState, useCallback, useEffect } from "react";
import main from "../../Images/MainImage.png";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import "./style.css";
import logo from "./logo.svg";
import {
  Row,
  Col,
  Button,
  CardGroup,
  CardTitle,
  CardBody,
  CardImg,
  Card,
} from "reactstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector, useDispatch } from "react-redux";
import "react-calendar/dist/Calendar.css";
import { Calendar } from "@natscale/react-calendar";
import "@natscale/react-calendar/dist/main.css";
import Gallery from "react-photo-gallery";
import { photos } from "./Photos";
import { getEvents } from "../Events_TSG/actions";
import { getNews } from "../News/actions";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Home() {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  let events = useSelector((state) => state.eventDetails.events);
  events = events.slice(0, 3);

  const news = useSelector((state) => state.news.news);

  let data = {
    placementReport: {
      reports: [
        {
          dept: "AE",
          count: 6,
        },
        {
          dept: "AG",
          count: 6,
        },
        {
          dept: "AR",
          count: 6,
        },
        {
          dept: "BT",
          count: 1,
        },
        {
          dept: "CH",
          count: 21,
        },
        {
          dept: "CY",
          count: 4,
        },
        {
          dept: "CE",
          count: 11,
        },
        {
          dept: "CS",
          count: 46,
        },
        {
          dept: "EE",
          count: 11,
        },
        {
          dept: "ECE",
          count: 0,
        },
        {
          dept: "GG",
          count: 7,
        },
        {
          dept: "EX",
          count: 9,
        },
        {
          dept: "MA",
          count: 15,
        },
        {
          dept: "ME",
          count: 16,
        },
        {
          dept: "MI",
          count: 11,
        },
        {
          dept: "MT",
          count: 5,
        },
        {
          dept: "NA",
          count: 4,
        },
        {
          dept: "PH",
          count: 2,
        },
      ],
      _id: "61e2d1682b1f2a3a7fd927f3",
      __v: 0,
    },
    message: "uploaded successfully",
  };

  // console.log(news)

  const [chartDataLabels, setChartDataLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chart, setChart] = useState({});

  const carouselItem_One = "COVID tests have been initiated and are currently being conducted on a primary contact basis. If any boarder has symptoms mentioned below,they are advised to contact their HP/SSM/Hall Council Member immediately to get tested. If someone is showing any of these signs, seek emergency medical care immediately (BC Roy Technology Hospital): Trouble breathing, persistent pain or pressure in the chest, inability to wake or stay awake, pale, gray, or blue-coloured skin, lips, or nail beds, depending on skin tone."
  const carouselItem_Two = "Makar Sakranti embodies the incessant movement in life. Sakranti means movement and this day signify the transit of sun into a new Zodiac symbolising the evolution of nature. Around the country it is celebrated pompously as a harvest festival with auspicious belief of tenacity and gratuity."
  const carouselItem_Three = "As we step into another year, let us embrace it with joy, hope and belief. Ink a new chapter with renewed beliefs, redirected path, revived attitude and rejuvenated actions. Let this year be the year you seek progress rather than perfection and enjoy every victory you win along the way to your goals."
  useEffect(() => {
    dispatch(
      getNews((res) => {
        // console.log(res)
      })
    );
    dispatch(
      getEvents((res) => {
        // console.log(res)
      })
    );
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var delayed;
  const onChange = useCallback(
    (value) => {
      setValue(value);
    },
    [setValue]
  );
  return (
    <div>
      <Row
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "5%",
        }}
      >
        <Col sm="6">
          <h1 style={{ color: "#727dbd", fontWeight: "bolder" }}>
            Welcome To TSG Site
          </h1>
          <p
            style={{
              borderLeft: "4px solid #727dbd",
              padding: "2%",
              color: "black",
            }}
          >
            A Hub of the numerous extra-curricular and co-curricular activities in IIT Kharagpur ranging from sports to socio-cultural
          </p>
          <Button
            style={{
              width: "200px",
              height: "50px",
              backgroundColor: "#727dbd",
              color: "white",
              border: "none",
            }}
          >
            Get Started
          </Button>
          <br />
        </Col>
        <Col sm="6">
          <br />
          <img src={main} alt="MainImage" style={{ width: "100%" }} />
        </Col>
      </Row>
      <Carousel responsive={responsive} style={{ backgroundColor: "#7882bd" }}>
        <div
          style={{
            backgroundColor: "#7882bd",
            alignItems: "center",
            textAlign: "center",
            padding: "5%",
            color: "white",
          }}
        >
       {window.innerWidth > 900 ? (carouselItem_One):(carouselItem_One.slice(0,70))+"..."}
        </div>
        <div
          style={{
            backgroundColor: "#7882bd",
            alignItems: "center",
            textAlign: "center",
            padding: "5%",
            color: "white",
          }}
        >
          {window.innerWidth > 900 ? (carouselItem_Two):(carouselItem_Two.slice(0,70))+"..."}
        </div>
        <div
          style={{
            backgroundColor: "#7882bd",
            alignItems: "center",
            textAlign: "center",
            padding: "5%",
            color: "white",
          }}
        >
          {window.innerWidth > 900 ? (carouselItem_Three):(carouselItem_Three.slice(0,70))+"..."}
        </div>
      </Carousel>
      <div style={{ padding: "3% 5%" }}>
        <CardGroup style={{ padding: "3%" }}>
          <Card
            style={{
              alignItems: "center",
              border: "none",
              justifyContent: "center",
            }}
          >
            <Calendar value={value} onChange={onChange} />
          </Card>
          <Card
            style={{
              alignItems: "center",
              border: "none",
              justifyContent: "center",
            }}
          >
            <CardBody style={{ height: "15em" }}>
              <a
                style={{ color: "#7882bd", textDecoration: "none" }}
                href="news-client"
              >
                <h4
                  style={{ textAlign: "center", marginBottom: "2em" }}
                  className="cdchover"
                >
                  Highlighting News
                </h4>
              </a>
              {news.slice(0, 2).map((ne) => (
                <Card
                  style={{
                    textAlign: "left",
                    boxShadow: "2px grey",
                    margin: "2% 5%",
                  }}
                >
                  <Row>
                    <Col
                      sm="4"
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: "2%",
                      }}
                    >
                      <CardImg
                        top
                        width="auto"
                        src={ne.image}
                        alt="Card image cap"
                      />
                    </Col>
                    <Col sm="8">
                      <CardBody>
                        <h5>{ne.name}</h5>
                        <i>Topic - {ne.topic}</i>
                        <CardTitle>
                          {ne.description.slice(0, 40)}
                          {ne.description.length > 40 ? "..." : ""}
                        </CardTitle>
                      </CardBody>
                    </Col>
                  </Row>
                </Card>
              ))}
            </CardBody>
          </Card>
          <Card
            style={{
              margin: "0 1%",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
          >
            <CardBody style={{ height: "30em" }}>
              <div>
                <a
                  style={{ color: "#7882bd", textDecoration: "none" }}
                  href="/events-tsg"
                >
                  <h4 style={{ textAlign: "left" }} className="cdchover">
                    Upcoming Events
                  </h4>
                </a>
                <br />
                {events.map((event) => (
                  <Row
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "10px",
                      width: "auto",
                    }}
                  >
                    <Col
                      xs="6"
                      style={{
                        backgroundColor: "#7882bd",
                        borderRadius: "5px",
                        padding: "1% 0%",
                        color: "white",
                      }}
                    >
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <h1>{new Date(event.eventStartTime).getDate()}</h1>
                        <p style={{ lineHeight: "0%" }}>
                          {months[new Date(event.eventStartTime).getMonth()]}
                        </p>
                      </div>
                    </Col>
                    <Col xs="6" style={{ padding: "5%" }}>
                      <CardTitle tag="h5">{event.name}</CardTitle>
                    </Col>
                  </Row>
                ))}
                <br />
              </div>
            </CardBody>
          </Card>
        </CardGroup>
        <br />
        <center>
          <h2
            style={{ color: "#7882bd", textDecoration: "none" }}
            className="cdchover"
          >
            CDC Statistics
          </h2>
          <Row>
            <Col xl="6">
              <Bar
                data={{
                  labels: data.placementReport.reports.map((e) => {
                    return e.dept;
                  }),
                  datasets: [
                    {
                      label: "Total",
                      data: data.placementReport.reports.map((e) => {
                        return e.count;
                      }),
                      backgroundColor: [
                        "rgba(255, 0, 0, 0.4)",
                        "rgba(0, 255, 0, 0.4)",
                        "rgba(0, 0, 255, 0.4)",
                      ],
                      borderWidth: 2,
                      borderColor: [
                        "rgba(255, 0, 0, 1)",
                        "rgba(0, 255, 0, 1)",
                        "rgba(0, 0, 255, 1)",
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "PLACEMENT DATA",
                    },
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                  animation: {
                    onComplete: () => {
                      delayed = true;
                    },
                    delay: (context) => {
                      let delay = 0;
                      if (
                        context.type === "data" &&
                        context.mode === "default" &&
                        !delayed
                      ) {
                        delay =
                          context.dataIndex * 150 + context.datasetIndex * 50;
                      }
                      return delay;
                    },
                  },
                }}
              />
            </Col>
            <Col
              onScroll={(e) => {
                console.log(e);
              }}
              xl="6"
            >
              <Bar
                data={{
                  labels: data.placementReport.reports.map((e) => {
                    return e.dept;
                  }),
                  datasets: [
                    {
                      label: "Total",
                      data: data.placementReport.reports.map((e) => {
                        return e.count;
                      }),
                      backgroundColor: [
                        "rgba(255, 0, 0, 0.4)",
                        "rgba(0, 255, 0, 0.4)",
                        "rgba(0, 0, 255, 0.4)",
                      ],
                      borderWidth: 2,
                      borderColor: [
                        "rgba(255, 0, 0, 1)",
                        "rgba(0, 255, 0, 1)",
                        "rgba(0, 0, 255, 1)",
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "INTERNSHIP DATA",
                    },
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                  animation: {
                    onComplete: () => {
                      delayed = true;
                    },
                    delay: (context) => {
                      let delay = 0;
                      if (
                        context.type === "data" &&
                        context.mode === "default" &&
                        !delayed
                      ) {
                        delay =
                          context.dataIndex * 150 + context.datasetIndex * 50;
                      }
                      return delay;
                    },
                  },
                  responsive: true,
                }}
              />
            </Col>
          </Row>
          <br />
          <br />
          <br />
        </center>
        <br />
        {/* <center>
          <h2 style={{ color: "#7882bd" }}>CDC Reports</h2>
        </center> */}
        <center>
          <h2 style={{ color: "#7882bd" }}>View Our Gallery</h2>
        </center>
        <br />
        <br />
        <Gallery photos={photos} direction={"row"} />
      </div>
    </div>
  );
}
