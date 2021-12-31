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
				<Row style={{padding:"2% 0%"}}>
					<Col sm="4">
						<Card className="footer-card" style={{border:"none"}}>
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
						<Card className="footer-card" style={{border:"none"}}>
							<CardBody>
								<CardTitle className="footer-header">Reach Us</CardTitle>
								<CardSubtitle>Counselling Centre</CardSubtitle>
								<CardSubtitle>Your Dost</CardSubtitle>
								<CardSubtitle>Hall Management Centre</CardSubtitle>
								<CardSubtitle>Yellow Pages</CardSubtitle>
							</CardBody>
						</Card>
					</Col>
					<Col sm="4" xs="6" >
						<Card className="footer-card" style={{border:"none"}}>
							<CardBody>
								<CardTitle className="footer-header">Quick Link</CardTitle>
								<CardSubtitle>Website</CardSubtitle>
								<CardSubtitle>ERP</CardSubtitle>
								<CardSubtitle>Zimbra</CardSubtitle>
								<CardSubtitle>Grievance Form</CardSubtitle>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
