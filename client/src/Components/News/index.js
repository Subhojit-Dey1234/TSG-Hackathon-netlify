import React, { useState } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardGroup,
	Button,
	Modal,
	ModalBody,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import logo1 from "../../Images/logo1.png";
import logo2 from "../../Images/logo2.png";
import logo4 from "../../Images/logo4.png";
import { Row, Col } from "reactstrap";
const Example = (props) => {
  const [ uploadNews, setUploadNews ] = useState(false)
	return (
		<div>
			<br />
			<br />
			<br />
			<h2 style={{ textAlign: "left", margin: "3% 5%", fontWeight: "bolder" }}>
				Get Latest News!
			</h2>
			<Button onClick={()=>{
        setUploadNews(true)
      }}>Upload</Button>
			<Modal centered isOpen={uploadNews} toggle={()=>setUploadNews(false)} >
				<ModalBody>
					<Row
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: "0 5%",
						}}
					>
						<h2 style={{ textAlign: "left", fontWeight: "bolder" }}>
							Upload The News
						</h2>
						<Col
							sm="12"
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<Form>
								<FormGroup>
									<Input
										required={true}
										name="name"
										placeholder="Name of The Event"
										type="name"
									/>
								</FormGroup>
								<Row>
									<Col sm="6">
										<FormGroup>
											<Input
												required={true}
												name="date"
												placeholder="Schedule of The Event"
												type="datetime-local"
											/>
										</FormGroup>
									</Col>
									<Col sm="6">
										<FormGroup>
											<Input
												required={true}
												name="date"
												placeholder="Schedule of The Event"
												type="datetime-local"
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Input
												required={true}
												name="organizer"
												placeholder="Enter Organizing Body"
												type="name"
											/>
										</FormGroup>
									</Col>
								</Row>
								<FormGroup>
									<Input
										required={true}
										name="description"
										placeholder="Enter Event Description"
										type="textarea"
									/>
								</FormGroup>
								<FormGroup>
									<FormGroup>
										<input
											required={true}
											accept="image/png,image/jpeg,image/jpg"
											placeholder="Update Event Image"
											type="file"
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
				</ModalBody>
			</Modal>
			<Card
				style={{ textAlign: "left", boxShadow: "2px grey", margin: "3% 5%" }}
			>
				<Row>
					<Col sm="3">
						<CardImg top width="auto" src={logo4} alt="Card image cap" />
					</Col>
					<Col sm="9">
						<CardBody>
							<CardTitle tag="h5">Project title</CardTitle>
							<p>Prof. Richard Feyman | Department of Physics</p>
							<CardText>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book.
							</CardText>
						</CardBody>
					</Col>
				</Row>
			</Card>
			<Card
				style={{ textAlign: "left", boxShadow: "2px grey", margin: "3% 5%" }}
			>
				<Row>
					<Col sm="3">
						<CardImg top width="auto" src={logo4} alt="Card image cap" />
					</Col>
					<Col sm="9">
						<CardBody>
							<CardTitle tag="h5">Project title</CardTitle>
							<p>Prof. Richard Feyman | Department of Physics</p>
							<CardText>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book.
							</CardText>
						</CardBody>
					</Col>
				</Row>
			</Card>
			<Card
				style={{ textAlign: "left", boxShadow: "2px grey", margin: "3% 5%" }}
			>
				<Row>
					<Col sm="3">
						<CardImg top width="auto" src={logo4} alt="Card image cap" />
					</Col>
					<Col sm="9">
						<CardBody>
							<CardTitle tag="h5">Project title</CardTitle>
							<p>Prof. Richard Feyman | Department of Physics</p>
							<CardText>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book.
							</CardText>
						</CardBody>
					</Col>
				</Row>
			</Card>
			<br />
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
		</div>
	);
};

export default Example;
