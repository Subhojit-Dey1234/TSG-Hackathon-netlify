import React, { useState } from "react";
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
	Alert,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../actions/Actions";
import loader from "../../Images/loader.gif";
export default function Otp() {
	const [load, setLoad] = useState(false);
	const [err, setErr] = useState(false);
	const userMail = useSelector((state) => state.userDetails.user.mail);
	const dispatch = useDispatch();
	const [otp, setOtp] = useState("");
	function Login(e) {
		e.preventDefault();
		setLoad(true);
		if (userMail) {
			var data = {
				mail: userMail,
				otp,
			};

			let interval;

			dispatch(
				verifyOtp(data, (res) => {
					if (res.status === 200) {
						setLoad(false);
						if (!localStorage.getItem("access-token")) {
							localStorage.setItem("access-token", res.data.accessToken);
							window.location.href = "/dashboard";
						}
					}

					if (res.status === 400) {
						setLoad(false);
						setErr(true);
						clearInterval(interval);
						interval = setInterval(() => {
							setErr(false);
						}, 2000);
					}
				}),
			);
		}
	}
	return (
		<div>
			<div className="loader" style={{ display: load ? "block" : "none" }}>
				<img src={loader} alt="loader" />
			</div>

			<div className="container-form">
				<Card className="form">
					<Alert style={{ display: err ? "block" : "none" }} color="danger">
						OTP not matched
					</Alert>
					<CardBody>
						<div className="header">
							<CardTitle
								style={{ fontWeight: "bolder" }}
								className="header-main"
							>
								LOGIN
							</CardTitle>
							<CardSubtitle className="header-subtitle">
								&nbsp;&nbsp;FOR STUDENTS
							</CardSubtitle>
						</div>
						<br />
						<br />
						<Form onSubmit={Login}>
							<FormGroup>
								<Label for="exampleEmail">Enter the OTP</Label>
								<Input
									type="text"
									name="otp"
									id="exampleEmail"
									placeholder="Enter the OTP"
									onChange={(e) => {
										setOtp(e.target.value);
									}}
								/>
								<br />
								<Button
									type="submit"
									style={{ backgroundColor: "#727dbd" }}
									block
								>
									Login
								</Button>
							</FormGroup>
						</Form>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}
