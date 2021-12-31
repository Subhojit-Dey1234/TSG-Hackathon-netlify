import React, { useEffect, useRef, useState } from "react";
import logo from '../../Images/Log.png'
import "./style.css";
export default function Navbar() {
	const [isHam, setHam] = useState(true);
	const isAuthenticated = localStorage.getItem("access-token")
	const navEl = useRef(null);
	useEffect(() => {
		if (window.innerWidth < 700) {
			setHam(false);
		}
	}, []);
	return (
		<div>
			<div>
				<a href="/home" >
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
				<div
					ref={navEl}
					className="navbar-list"
					style={{ visibility: isHam ? "visible" : "hidden" }}
				>
					<ul>
						<a href="/home" style={{textDecoration:"none", color:"black", display:isAuthenticated ? "none" : ""}}>
							<li>Home</li>
						</a>
						<a href="/dashboard" style={{textDecoration:"none", color:"black" , display:isAuthenticated ? "" : "none"}}>
							<li>Dashboard</li>
						</a>
						<a href="/studentPoint" style={{textDecoration:"none", color:"black",display:isAuthenticated ? "" : "none"}}>
							<li>Student's Point</li>
						</a>
						<a href="/loginstudent" style={{textDecoration:"none", color:"black", display:isAuthenticated ? "none" : ""}}>
							<li>
								Login <small style={{ opacity: 0.6 }}>( Students )</small>{" "}
							</li>
						</a>
						<a href="/loginofficials" style={{textDecoration:"none", color:"black" , display:isAuthenticated ? "none" : ""}}>
							<li>
								Login <small style={{ opacity: 0.6 }}> ( Officials )</small>
							</li>
						</a>
						<a href="/news" style={{textDecoration:"none", color:"black"}}>
							<li>News</li>
						</a>
						
						<a className="logout" href="/home" onClick={()=>{
							localStorage.clear();
						}} style={{textDecoration:"none", color:"black", display:isAuthenticated ? "" : "none"}}>
							<li>Logout</li>
						</a>
					</ul>
				</div>
			</div>
		</div>
	);
}
