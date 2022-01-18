import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Modal,
	ModalBody,
	ModalFooter,
	Row,
	Col,
	Input,
	Form,
	FormGroup,
	Button,
	Table,
} from "reactstrap";

import deleteImg from '../../Images/delete.svg'
import editImg from '../../Images/edit.svg'
import TableChange from "./TableChange";
import formImage from "../../Images/FormImage.png";
import {
	deleteAcademicPoint,
	deleteCareerPoint,
	getAcademicPoint,
	getCareerPoint,
	searchAcademicPoint,
	searchCareerPoint,
	updateAcademics,
	updateCareerPoint,
	uploadAcademicPoint,
	uploadCareerPoint,
} from "./actions";

export default function TableExample(props) {
	const [isOpen, setOpen] = useState(false);
	const [modal, setModal] = useState(false);
	const [updateModal, setUpdateModal] = useState(false);
	const [updateCareerModal, setUpdateCareerModal] = useState(false);
	const [modal1, setModal1] = useState(false);

	const [id, setId] = useState(null);

	const [department, setDepartment] = useState(null);
	const [academicYear, setAcademicYear] = useState(null);
	const [subjectCode, setSubjectCode] = useState(null);
	const [subjectName, setSubjectName] = useState(null);
	const [notes, setNotes] = useState(null);
	const [books, setBooks] = useState(null);
	const [pyqp, setpyqp] = useState(null);

	const [topicName, setTopicName] = useState(null);
	const [topicDomain, setTopicDomain] = useState(null);
	const [notesCareer, setNotesCareer] = useState(null);
	const [booksCareer, setBooksCareer] = useState(null);
	const [query, setQuery] = useState({
		year: "",
		department: "",
	});

	useEffect(() => {
		dispatch(
			getCareerPoint((res) => {
				console.log(res);
			}),
		);
		dispatch(
			getAcademicPoint((res) => {
				console.log(res);
			}),
		);
	}, []);
	// const [ academicYear, setAcademicYear ] = useState(null)

	const careerPoints = useSelector((state) => state.careerPoint.careers);
	const academicPoints = useSelector((state) => state.academicPoint.academics);
	// console.log(academicPoints)

	const dispatch = useDispatch();

	function uploadCareerForm(e) {
		e.preventDefault();

		var form = new FormData();

		form.append("name", topicName);
		form.append("links", notesCareer);
		form.append("field", topicDomain);
		form.append("text", booksCareer);

		dispatch(
			uploadCareerPoint(form, (res) => {
				console.log(res);
				if (res.status === 200) {
					setModal1(false);
					setTopicDomain(null);
					setTopicName(null);
					setBooksCareer(null);
					setNotesCareer(null);
				}
			}),
		);
	}

	function updateCareerPointForm(e) {
		e.preventDefault();

		var form = new FormData();

		form.append("name", topicName);
		form.append("links", notesCareer);
		form.append("field", topicDomain);
		form.append("text", booksCareer);

		dispatch(
			updateCareerPoint(id, form, (res) => {
				if (res.status === 200) {
					setUpdateCareerModal(false);
					setTopicDomain(null);
					setTopicName(null);
					setBooksCareer(null);
					setNotesCareer(null);
				}
			}),
		);
	}

	function searchQuery(value) {
		console.log(value);

		dispatch(
			searchAcademicPoint(
				{
					year: value,
				},
				(res) => {
					console.log(res);
				},
			),
		);
	}

	function searchCareer(value) {
		dispatch(
			searchCareerPoint(value, (res) => {
				console.log(res);
			}),
		);
	}

	function searchDept(value){

	}

	function uploadForm(e) {
		e.preventDefault();

		var form = new FormData();
		form.append("department", department);
		form.append("year", academicYear);
		form.append("name", subjectName);
		form.append("subjectCode", subjectCode);
		form.append("pyqp", pyqp);
		form.append("books", books);
		form.append("notes", notes);

		console.log("adfbjsd");

		dispatch(
			uploadAcademicPoint(form, (res) => {
				if (res.status === 200) {
					setDepartment(null);
					setAcademicYear(null);
					setSubjectCode(null);
					setSubjectName(null);
					setpyqp(null);
					setNotes(null);
					setBooks(null);
					setModal(false);
				}
			}),
		);
	}

	console.log(academicYear);

	function updateForm(e) {
		e.preventDefault();

		var form = new FormData();
		form.append("department", department);
		form.append("year", academicYear);
		form.append("name", subjectName);
		form.append("subjectCode", subjectCode);
		form.append("pyqp", pyqp);
		form.append("books", books);
		form.append("notes", notes);

		// console.log("adfbjsd")

		dispatch(
			updateAcademics(id, form, (res) => {
				if (res.status === 200) {
					setModal1(false);
					setId(null);
					setDepartment(null);
					setAcademicYear(null);
					setSubjectCode(null);
					setSubjectName(null);
					setpyqp(null);
					setNotes(null);
					setBooks(null);
				}
			}),
		);
	}

	function toggle() {
		setOpen(!isOpen);
	}
	const [isOpen1, setOpen1] = useState(false);
	function toggle1() {
		setOpen1(!isOpen1);
	}
	const [isOpen2, setOpen2] = useState(false);
	function toggle2() {
		setOpen2(!isOpen2);
	}
	const imageInput = useRef(null);
	const userType = "Official";
	return (
		<div style={{ padding: "3% 3% 1% 3%" }}>
			<br />
			<br />
			<h1 style={{ fontWeight: "bold" }}>Academic Point</h1>
			<a
				href={() => false}
				style={{
					textDecoration: "none",
					margin: "3% 0%",
					color: "blue",
					cursor: "pointer",
					display: userType === "student" ? "none" : "",
				}}
				onClick={() => {
					if (userType !== undefined) setModal(true);
				}}
			>
				Want to Update Academic Point Now?
			</a>
			<br />
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "auto auto auto",
					alignItems: "end",
				}}
			>
				<h6>Show Only</h6>
				<Dropdown className="dropdown-table" toggle={toggle} isOpen={isOpen}>
					<DropdownToggle caret>Year</DropdownToggle>
					<DropdownMenu>
						<DropdownItem
							onClick={() => searchQuery("1st Year")}
							value="1st Year"
						>
							1st Year
						</DropdownItem>
						<DropdownItem
							onClick={() => searchQuery("2nd Year")}
							value="2nd Year"
						>
							2nd Year
						</DropdownItem>
						<DropdownItem
							onClick={() => searchQuery("3rd Year")}
							value="3rd Year"
						>
							3rd Year
						</DropdownItem>
						<DropdownItem
							onClick={() => searchQuery("4th Year")}
							value="4th Year"
						>
							4th Year
						</DropdownItem>
						<DropdownItem
							onClick={() => searchQuery("5th Year")}
							value="5th Year"
						>
							5th Year
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Dropdown className="dropdown-table" toggle={toggle1} isOpen={isOpen1}>
					<DropdownToggle caret>Dept.</DropdownToggle>
					<DropdownMenu>
						<DropdownItem onClick={()=>searchDept("AE")} value="AE">AE</DropdownItem>
						<DropdownItem onClick={()=>searchDept("AG")} value="AG">AR</DropdownItem>
						<DropdownItem onClick={()=>searchDept("AR")} value="AR">ME</DropdownItem>
						<DropdownItem onClick={()=>searchDept("BT")} value="BT">MT</DropdownItem>
						<DropdownItem onClick={()=>searchDept("CE")} value="CE">NA</DropdownItem>
						
					</DropdownMenu>
				</Dropdown>
			</div>
			<br />
			<Table borderless>
				<thead>
					<tr className="table-header">
						<th>Year</th>
						<th>Subject Name</th>
						<th>Code</th>
						<th>Notes</th>
						<th>PYQP</th>
						<th>Books</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{academicPoints.map((academicPoint) => (
						<tr>
							<th>{academicPoint.year}</th>
							<td scope="row">{academicPoint.name}</td>
							<td>{academicPoint.subjectCode}</td>
							<td>
								<a
									href={academicPoint.notes}
									style={{ textDecoration: "none" }}
								>
									Download Now
								</a>
							</td>
							<td>
								<a href={academicPoint.pyqp} style={{ textDecoration: "none" }}>
									Download Now
								</a>
							</td>
							<td>
								<a
									href={academicPoint.books}
									style={{ textDecoration: "none" }}
								>
									Download Now
								</a>
							</td>
							<td>
								<Button
									onClick={(e) => {
										dispatch(
											deleteAcademicPoint(academicPoint._id, (res) => {
												console.log(res);
											}),
										);
									}}
									color="danger"
								>
									<img src={deleteImg} style={{width:"20px"}}/>
								</Button>{" "}
								<Button
									color="warning"
									onClick={() => {
										setUpdateModal(true);
										setId(academicPoint._id);
										setDepartment(academicPoint.department);
										setAcademicYear(academicPoint.year);
										setBooks(academicPoint.books);
										setNotes(academicPoint.notes);
										setpyqp(academicPoint.pyqp);
										setSubjectName(academicPoint.name);
										setSubjectCode(academicPoint.subjectCode);
									}}
								>
									<img src={editImg} style={{width:"20px"}}/>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<br />
			<br />
			<br />
			<h1 style={{ fontWeight: "bold" }}>Career Point</h1>
			<a
				href={() => false}
				style={{
					textDecoration: "none",
					margin: "3% 0%",
					color: "blue",
					cursor: "pointer",
					display: userType === "student" ? "none" : "",
				}}
				onClick={() => {
					if (userType !== undefined) setModal1(true);
				}}
			>
				Want to Update Career Point Now?
			</a>
			<br />
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "auto auto",
					alignItems: "end",
				}}
			>
				<h6>Show Only</h6>
				<Dropdown className="dropdown-table" toggle={toggle2} isOpen={isOpen2}>
					<DropdownToggle caret>Profile/Domain</DropdownToggle>
					<DropdownMenu>
						<DropdownItem onClick={() => searchCareer("SDE")} value="SDE">
							SDE
						</DropdownItem>
						<DropdownItem onClick={() => searchCareer("FMCG")} value="FMCG">
							FMCG
						</DropdownItem>
						<DropdownItem onClick={() => searchCareer("PD/BA")} value="PD/BA">
							PD/BA
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			<br />
			<Table borderless>
				<thead>
					<tr className="table-header">
						<th>Topic Name</th>
						<th>Domain</th>
						<th>Notes</th>
						<th>Books</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{careerPoints.map((career) => (
						<tr>
							<th scope="row">{career.name}</th>
							<td>{career.field}</td>
							<td>
								<a href={career.links} style={{ textDecoration: "none" }}>
									Download Now
								</a>
							</td>
							<td>
								<a href={career.text} style={{ textDecoration: "none" }}>
									Download Now
								</a>
							</td>
							<td>
								<Button
									onClick={(e) => {
										dispatch(
											deleteCareerPoint(career._id, (res) => {
												console.log(res);
											}),
										);
									}}
									color="danger"
								>
									<img src={deleteImg} style={{width:"20px"}}/>
								</Button> {" "}
								<Button
									onClick={(e) => {
										setUpdateCareerModal(true);
										setId(career._id);
										setBooksCareer(career.text);
										setNotesCareer(career.links);
										setTopicDomain(career.field);
										setTopicName(career.name);
									}}
									color="warning"
								>
									<img src={editImg} style={{width:"20px"}}/>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal centered toggle={() => setModal(false)} isOpen={modal}>
				<ModalBody>
					<Row
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: "0 5%",
						}}
					>
						<h4 style={{ textAlign: "center" }}>Updates Academic Point</h4>
						<br />
						<img src={formImage} />
						<Col
							sm="12"
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<Form onSubmit={uploadForm}>
								<FormGroup>
									<Input
										required={true}
										name="dep"
										placeholder="Enter The Department Name"
										type="name"
										onChange={(e) => setDepartment(e.target.value)}
									/>
								</FormGroup>
								<FormGroup>
									{/* <Input
										required={true}
										name="year"
										placeholder="Enter Academic Year (1st, 2nd, 3rd, 4th)"
										type="name"
										onChange={(e) => setAcademicYear(e.target.value)}
									/> */}
									<label for="classes">Choose a Year &nbsp; </label>
									<select
										id="classes"
										name="class"
										onChange={(e) => {
											setAcademicYear(e.target.value);
										}}
										style={{ alignItem: "right", justifyContent: "right" }}
									>
										<option value="1st Year">1st Year</option>
										<option value="2nd Year">2nd Year</option>
										<option value="3rd Year">3rd Year</option>
										<option value="4th Year">4th Year</option>
										<option value="5th Year">5th Year</option>
									</select>
								</FormGroup>
								<Row>
									<Col>
										<FormGroup>
											<Input
												required={true}
												name="name"
												placeholder="Enter Subject Name"
												type="name"
												onChange={(e) => setSubjectName(e.target.value)}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Input
												required={true}
												name="code"
												placeholder="Enter Subject Code"
												type="name"
												onChange={(e) => setSubjectCode(e.target.value)}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<FormGroup>
											<Input
												required={true}
												name="notes"
												placeholder="Enter Note Drive Links"
												type="name"
												onChange={(e) => setNotes(e.target.value)}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Input
												required={true}
												name="books"
												placeholder="Enter Book Drive Links"
												type="name"
												onChange={(e) => setBooks(e.target.value)}
											/>
										</FormGroup>
									</Col>
								</Row>
								<FormGroup>
									<Input
										required={true}
										name="Question Papers"
										placeholder="Enter Q.Paper Drive Links"
										type="name"
										onChange={(e) => setpyqp(e.target.value)}
									/>
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
										Update
									</Button>
								</center>
							</Form>
						</Col>
					</Row>
				</ModalBody>
			</Modal>

			<Modal
				centered
				toggle={() => {
					setUpdateModal(false);
					setAcademicYear(null);
					setBooks(null);
					setNotes(null);
					setpyqp(null);
					setSubjectCode(null);
					setDepartment(null);
					setSubjectName(null);
				}}
				isOpen={updateModal}
			>
				<ModalBody>
					<Row
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: "0 5%",
						}}
					>
						<h4 style={{ textAlign: "center" }}>Update Academic Point</h4>
						<br />
						<img src={formImage} />
						<Col
							sm="12"
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<Form onSubmit={updateForm}>
								<FormGroup>
									<Input
										value={department}
										required={true}
										name="dep"
										placeholder="Enter The Department Name"
										type="name"
										onChange={(e) => setDepartment(e.target.value)}
									/>
								</FormGroup>
								<FormGroup>
									<Input
										value={academicYear}
										required={true}
										name="year"
										placeholder="Enter Academic Year (1st, 2nd, 3rd, 4th)"
										type="name"
										onChange={(e) => setAcademicYear(e.target.value)}
									/>
								</FormGroup>
								<Row>
									<Col>
										<FormGroup>
											<Input
												value={subjectName}
												required={true}
												name="name"
												placeholder="Enter Subject Name"
												type="name"
												onChange={(e) => setSubjectName(e.target.value)}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Input
												value={subjectCode}
												required={true}
												name="code"
												placeholder="Enter Subject Code"
												type="name"
												onChange={(e) => setSubjectCode(e.target.value)}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<FormGroup>
											<Input
												value={notes}
												required={true}
												name="notes"
												placeholder="Enter Note Drive Links"
												type="name"
												onChange={(e) => setNotes(e.target.value)}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Input
												value={books}
												required={true}
												name="books"
												placeholder="Enter Book Drive Links"
												type="name"
												onChange={(e) => setBooks(e.target.value)}
											/>
										</FormGroup>
									</Col>
								</Row>
								<FormGroup>
									<Input
										value={pyqp}
										required={true}
										name="Question Papers"
										placeholder="Enter Q.Paper Drive Links"
										type="name"
										onChange={(e) => setpyqp(e.target.value)}
									/>
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
										Update
									</Button>
								</center>
							</Form>
						</Col>
					</Row>
				</ModalBody>
			</Modal>

			<Modal centered toggle={() => setModal1(false)} isOpen={modal1}>
				<ModalBody>
					<Row
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: "0 5%",
						}}
					>
						<h4 style={{ textAlign: "center" }}>Update Career Point</h4>
						<br />
						<img src={formImage} />
						<Col
							sm="12"
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<Form onSubmit={uploadCareerForm}>
								<FormGroup>
									<Input
										required={true}
										name="name"
										placeholder="Enter Topic Name"
										type="name"
										onChange={(e) => setTopicName(e.target.value)}
									/>
								</FormGroup>
								<FormGroup>
									{/* <Input
												required={true}
												name="domain"
												placeholder="Enter Topic Domain"
												type="name"
												onChange={(e) => setTopicDomain(e.target.value)}
											/> */}
									<label for="domain">Choose Domain: &nbsp;</label>
									<select
										id="domain"
										name="domain"
										onChange={(e) => {
											setTopicDomain(e.target.value);
										}}
										style={{ alignItem: "right", justifyContent: "right" }}
									>
										<option value="SDE">SDE</option>
										<option value="FMCG">FMCG</option>
										<option value="PD/BA">PD/BA</option>
									</select>
								</FormGroup>
								<Row>
									<Col>
										<FormGroup>
											<Input
												required={true}
												name="notes"
												placeholder="Enter Note Drive Links"
												type="name"
												onChange={(e) => setNotesCareer(e.target.value)}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Input
												required={true}
												name="books"
												placeholder="Enter Book Drive Links"
												type="name"
												onChange={(e) => setBooksCareer(e.target.value)}
											/>
										</FormGroup>
									</Col>
								</Row>
								{/* <FormGroup>
                  <Input
                    required={true}
                    name="Question Papers"
                    placeholder="Enter Q.Paper Drive Links"
                    type="name"
                  />
                </FormGroup> */}
								<br />
								<center>
									<Button
										// disabled={!image}
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
										Update
									</Button>
								</center>
							</Form>
						</Col>
					</Row>
				</ModalBody>
			</Modal>

			<Modal
				centered
				toggle={() => setUpdateCareerModal(false)}
				isOpen={updateCareerModal}
			>
				<ModalBody>
					<Row
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: "0 5%",
						}}
					>
						<h4 style={{ textAlign: "center" }}>Update Career Point</h4>
						<br />
						<img src={formImage} />
						<Col
							sm="12"
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<Form onSubmit={updateCareerPointForm}>
								<Row>
									<Col>
										<FormGroup>
											<Input
												required={true}
												value={topicName}
												name="name"
												placeholder="Enter Topic Name"
												type="name"
												onChange={(e) => setTopicName(e.target.value)}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Input
												value={topicDomain}
												required={true}
												name="domain"
												placeholder="Enter Topic Domain"
												type="name"
												onChange={(e) => setTopicDomain(e.target.value)}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<FormGroup>
											<Input
												value={notesCareer}
												required={true}
												name="notes"
												placeholder="Enter Note Drive Links"
												type="name"
												onChange={(e) => setNotesCareer(e.target.value)}
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Input
												required={true}
												value={booksCareer}
												name="books"
												placeholder="Enter Book Drive Links"
												type="name"
												onChange={(e) => setBooksCareer(e.target.value)}
											/>
										</FormGroup>
									</Col>
								</Row>
								{/* <FormGroup>
                  <Input
                    required={true}
                    name="Question Papers"
                    placeholder="Enter Q.Paper Drive Links"
                    type="name"
                  />
                </FormGroup> */}
								<br />
								<center>
									<Button
										// disabled={!image}
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
										Update
									</Button>
								</center>
							</Form>
						</Col>
					</Row>
				</ModalBody>
			</Modal>
		</div>
	);
}
