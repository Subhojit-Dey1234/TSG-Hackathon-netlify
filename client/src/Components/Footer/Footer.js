import React from "react";
import "./style.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row style={{ padding: "2% 0%" }}>
          <Col sm="4">
            <Card className="footer-card" style={{ border: "none" }}>
              <CardBody>
                <CardTitle className="footer-header">TSG IIT KGP</CardTitle>
                <CardText>
                  Technology Students’ Gymkhana is the hub of the
                  extra-curricular and co-curricular activities in IIT Kharagpur
                  ranging from sports to socio-cultural.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4" xs="6">
            <Card className="footer-card" style={{ border: "none" }}>
              <CardBody>
                <CardTitle className="footer-header">Reach Us</CardTitle>
                <CardSubtitle style={{ cursor: "pointer" }}>
                  <a
                    href="http://www.counsellingcentre.iitkgp.ac.in/"
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Counselling Centre
                  </a>
                </CardSubtitle>
                <CardSubtitle style={{ cursor: "pointer" }}>
                  <a
                    href="https://wiki.metakgp.org/w/Yellow_pages/"
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Your Dost
                  </a>
                </CardSubtitle>
                <CardSubtitle style={{ cursor: "pointer" }}>
                  <a
                    href="http://www.hmc.iitkgp.ac.in/web/"
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Hall Management Centre
                  </a>
                </CardSubtitle>
                <CardSubtitle style={{ cursor: "pointer" }}>
                  <a
                    href="https://wiki.metakgp.org/w/Yellow_pages"
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Yellow Pages
                  </a>
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4" xs="6">
            <Card className="footer-card" style={{ border: "none" }}>
              <CardBody>
                <CardTitle className="footer-header">Quick Link</CardTitle>
                <CardSubtitle style={{ cursor: "pointer" }}>
                  <a
                    href="http://www.iitkgp.ac.in/"
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Website
                  </a>
                </CardSubtitle>
                <CardSubtitle style={{ cursor: "pointer" }}>
                  <a
                    href="https://erp.iitkgp.ernet.in/"
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    ERP
                  </a>
                </CardSubtitle>
                <CardSubtitle style={{ cursor: "pointer" }}>
                  <a
                    href="https://iitkgpmail.iitkgp.ac.in/"
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Zimbra
                  </a>
                </CardSubtitle>
                <CardSubtitle style={{ cursor: "pointer" }}>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSft9FXZYvLiNt3oy0K3Iu4d6HoE830RhNWFHMXx1R4IjlhHKA/viewform"
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Grievance Form
                  </a>
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
