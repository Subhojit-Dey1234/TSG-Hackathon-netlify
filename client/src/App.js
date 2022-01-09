import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Home/Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Otp from "./Components/Login/Otp";
import Images from "./Components/Home/Images";
import News from "./Components/News/index";
import StudentPoint from "./Components/StudentPoint";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import StudentLogin from "./Components/Login/StudentLogin";
import OfficialLogin from "./Components/Login/OfficialLogin";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedNotAuth from "./ProtectedNotAuth";
import Dashboard from "./Components/Dashboard/index";
import Events_TSG from "./Components/Events_TSG/index";
import Society_Point from "./Components/Society_Point/index";
import NotFound from "./NotFound";

function App() {
	return (
		<div>
			<Images />
			<Navbar />
			<Router>
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<Home />} />
					<Route path="/loginstudent" element={<ProtectedNotAuth />}>
						<Route path="/loginstudent" element={<StudentLogin />} />
					</Route>
					<Route path="/loginofficials" element={<ProtectedNotAuth />}>
						<Route path="/loginofficials" element={<OfficialLogin />} />
					</Route>
					<Route path="/otp" element={<ProtectedNotAuth />}>
						<Route path="/otp" element={<Otp />} />
					</Route>
					<Route exact path={"/studentPoint"} element={<ProtectedRoute />}>
						<Route path="/studentPoint" element={<StudentPoint />} />
					</Route>
					<Route exact path={"/news"} element={<News />} />
					<Route exact path={"/dashboard"} element={<ProtectedRoute />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
					{/* <Route path="/dashboard" element={<Dashboard />} /> */}
					<Route path="/events-tsg" element={<Events_TSG />} />
					<Route path="/societyPoint" element={<Society_Point />} />
				</Routes>
			</Router>
			<br />
			<br />
			<Footer />
		</div>
	);
}

export default App;
