import React from "react";
import "./style.css";
import {
	Card,
	CardBody,
	CardTitle,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	CardSubtitle,
} from "reactstrap";

export default function OfficialLogin() {
	return (
		<div className="container-form">
			<Card className="form">
				<CardBody>
					<div className="header">
						<CardTitle style={{ fontWeight: "bolder" }} className="header-main">
							LOGIN
						</CardTitle>
						<CardSubtitle className="header-subtitle">
							&nbsp;&nbsp;FOR OFFICIALS
						</CardSubtitle>
					</div>
					<br />
					<br />
					<Form>
						<FormGroup>
							<Label for="exampleEmail">User</Label>
							<Input
								type="text"
								name="user"
								id="exampleEmail"
								placeholder="Username"
							/>
							<Label for="exampleEmail">Password</Label>
							<Input
								type="password"
								name="password"
								id="exampleEmail"
								placeholder="Password"
							/>
							<br />
							<Button style={{ backgroundColor: "#727dbd" }} block onClick={(e)=>{
								e.preventDefault()
							}}>
								Login
							</Button>
						</FormGroup>
					</Form>
				</CardBody>
			</Card>
		</div>
	);
}
