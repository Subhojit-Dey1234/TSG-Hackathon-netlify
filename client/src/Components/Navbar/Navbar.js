import React, { useEffect, useRef, useState } from "react";
import logo from "../../Images/Log.png";
import notificationicon from "../../Images/bell-1.png";
import { Modal, ModalBody, Button } from "reactstrap";
import "./style.css";
import Notification from "../Notifications/Notification";
export default function Navbar() {
	const [openNotify, setNotify] = useState(false);
	const [isHam, setHam] = useState(true);
	const isAuthenticated = localStorage.getItem("access-token");
	const navEl = useRef(null);
	useEffect(() => {
		if (window.innerWidth < 700) {
			setHam(false);
		}
	}, []);
	return (
		<div>
			<div>
				<a href="/">
					<img src={logo} alt="logo" className="logo" />
				</a>
			</div>
			<div className="navbar-el">
				<div
					className="hamburger"
					onClick={() => {
						setHam(!isHam);
					}}
				>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<Modal centered isOpen={openNotify} toggle={() => setNotify(false)}>
					<ModalBody>
						<Notification />
					</ModalBody>
				</Modal>
				<div
					ref={navEl}
					className="navbar-list"
					style={{ visibility: isHam ? "visible" : "hidden" }}
				>
					<ul>
						<a
							href="/"
							style={{
								textDecoration: "none",
								color: "black",
								display: isAuthenticated ? "none" : "",
							}}
						>
							<li>Home</li>
						</a>
						<a
							href="/dashboard"
							style={{
								textDecoration: "none",
								color: "black",
								display: isAuthenticated ? "" : "none",
							}}
						>
							<li>Dashboard</li>
						</a>
						<a
							href="/studentPoint"
							style={{
								textDecoration: "none",
								color: "black",
								display: isAuthenticated ? "" : "none",
							}}
						>
							<li>Student's Point</li>
						</a>
						<a
							href="/loginstudent"
							style={{
								textDecoration: "none",
								color: "black",
								display: isAuthenticated ? "none" : "",
							}}
						>
							<li>
								Login <small style={{ opacity: 0.6 }}>( Students )</small>{" "}
							</li>
						</a>
						<a
							href="/loginofficials"
							style={{
								textDecoration: "none",
								color: "black",
								display: isAuthenticated ? "none" : "",
							}}
						>
							<li>
								Login <small style={{ opacity: 0.6 }}> ( Officials )</small>
							</li>
						</a>
						<a
							href="/news-client"
							style={{ textDecoration: "none", color: "black" }}
						>
							<li>News</li>
						</a>
						<a
							href="/society-point-new"
							style={{
								textDecoration: "none",
								color: "black",
								display: isAuthenticated ? "" : "none",
							}}
						>
							<li>Society Point</li>
						</a>
						<a
							href="/events-tsg"
							style={{
								textDecoration: "none",
								color: "black",
								display: isAuthenticated ? "" : "none",
							}}
						>
							<li>
								Events <small style={{ opacity: 0.6 }}>( TSG )</small>{" "}
							</li>
						</a>
						<a
							href={() => false}
							onClick={(e) => setNotify(true)}
							style={{
								textDecoration: "none",
								color: "black",
								display: isAuthenticated ? "" : "none",
							}}
						>
							<li style={{ background: "#727dbd", borderRadius: "5px" }}>
								<img src={notificationicon} style={{ width: "25px" }} />
							</li>
						</a>
						<a
							className="logout"
							href="/"
							onClick={() => {
								localStorage.clear();
							}}
							style={{
								textDecoration: "none",
								color: "#727dbd",
								display: isAuthenticated ? "" : "none",
							}}
						>
							<li>Logout</li>
						</a>
					</ul>
				</div>
			</div>
		</div>
	);
}
