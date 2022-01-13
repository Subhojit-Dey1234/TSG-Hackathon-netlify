import React, { useState, useCallback, useEffect } from "react";
import main from "../../Images/MainImage.png";
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
import { useSelector, useDispatch } from 'react-redux'
import "react-calendar/dist/Calendar.css";
import { Calendar } from "@natscale/react-calendar";
import "@natscale/react-calendar/dist/main.css";
import Gallery from "react-photo-gallery";
import { photos } from "./Photos";
import { getEvents } from "../Events_TSG/actions";
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
  let events = useSelector(state=>state.eventDetails.events)
  events = events.slice(0,2);
  
  useEffect(()=>{
    dispatch(getEvents(res=>{
      console.log(res)
    }))
  },[])
  

  const months = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ]

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
            Lorem Ipsum Text
          </h1>
          <p
            style={{
              borderLeft: "4px solid #727dbd",
              padding: "2%",
              color: "black",
            }}
          >
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blandit praesentium voluptatum delis atque corrupti quos dolores
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
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blandit
          <br /> praesentium voluptatum delis atque corrupti quos dolores et
          quas
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
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blandit
          <br /> praesentium voluptatum delis atque corrupti quos dolores et
          quas
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
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blandit
          <br /> praesentium voluptatum delis atque corrupti quos dolores et
          quas
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
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blandit
          <br /> praesentium voluptatum delis atque corrupti quos dolores et
          quas
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
            <Card
              style={{
                textAlign: "left",
                boxShadow: "2px grey",
                margin: "2% 5%",
              }}
            >
              <Row>
                <Col
                  sm="3"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "2%",
                  }}
                >
                  <CardImg top width="auto" src={logo} alt="Card image cap" />
                </Col>
                <Col sm="9">
                  <CardBody>
                    <CardTitle tag="h5">Lorem Ipsum Dog Headline</CardTitle>
                  </CardBody>
                </Col>
              </Row>
            </Card>
            <Card
              style={{
                textAlign: "left",
                boxShadow: "2px grey",
                margin: "2% 5%",
              }}
            >
              <Row>
                <Col
                  sm="3"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "2%",
                  }}
                >
                  <CardImg
                    bottom
                    width="auto"
                    src={logo}
                    alt="Card image cap"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  />
                </Col>
                <Col sm="9">
                  <CardBody>
                    <CardTitle tag="h5">Lorem Ipsum Dog Headline</CardTitle>
                  </CardBody>
                </Col>
              </Row>
            </Card>
            <Card
              style={{
                textAlign: "left",
                boxShadow: "2px grey",
                margin: "2% 5%",
              }}
            >
              <Row>
                <Col sm="3">
                  <CardImg width="auto" src={logo} alt="Card image cap" />
                </Col>
                <Col sm="9">
                  <CardBody>
                    <CardTitle tag="h5">Lorem Ipsum Dog Headline</CardTitle>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Card>
          <Card
            style={{
              margin: "0 1%",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
          >
            <CardBody>
              <div>
                <h4 style={{ textAlign: "left" }}>Upcoming Events</h4>
                <br />
                {events.map((event)=>(
                <Row style={{ alignItems: "center", justifyContent: "center", marginTop:"10px", width:"auto"}}>
                  <Col
                    xs="6"
                    style={{
                      backgroundColor: "#7882bd",
                      borderRadius: "5px",
                      padding: "1% 0%",
                      color: "white",
                    }}
                  >
                    <div style={{ textAlign: "center", width:"100%"}}>
                      <h1>{new Date(event.eventStartTime).getDate()}</h1>
                      <p style={{ lineHeight: "0%" }}>{months[new Date(event.eventStartTime).getMonth()]}</p>
                    </div>
                  </Col>
                  <Col xs="6" style={{ padding: "5%" }}>
                    <CardTitle tag="h5">{event.name}</CardTitle>
                  </Col>
                </Row>
                ))}
                <br />
                <div style={{border:"#7882bd solid 2px",textAlign:"right", padding:"0.4em",width:"100px",position:"absolute",right:"20px",borderRadius:"5px"}}>
                  <a style={{color:"white", textDecoration:"none", fontWeight:"bolder" , color:"#7882bd"}} href="events-tsg">...More</a>
                </div>
              </div>
            </CardBody>
          </Card>
        </CardGroup>
        <br />
        <center>
          <h2 style={{ color: "#7882bd" }}>Highlights</h2>
        </center>
        <br />
        <Gallery photos={photos} direction={"column"} />
      </div>
    </div>
  );
}
