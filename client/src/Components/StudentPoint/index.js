import React, { useState, useRef } from "react";
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
import TableChange from "./TableChange";
import formImage from "../../Images/FormImage.png";

export default function TableExample(props) {
  const [isOpen, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
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
            <DropdownItem>1st Year</DropdownItem>
            <DropdownItem>2nd Year</DropdownItem>
            <DropdownItem>3rd Year</DropdownItem>
            <DropdownItem>4th Year</DropdownItem>
            <DropdownItem>5th Year</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown className="dropdown-table" toggle={toggle1} isOpen={isOpen1}>
          <DropdownToggle caret>Dept.</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Civil Engg.</DropdownItem>
            <DropdownItem>Mech. Engg.</DropdownItem>
            <DropdownItem>Aero. Engg.</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <br />
      <Table borderless>
        <thead>
          <tr className="table-header">
            <th>Subject Name</th>
            <th>Code</th>
            <th>Notes</th>
            <th>PYQP</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Mechanics of Solid</th>
            <td>
              <a href="" style={{ textDecoration: "none" }}>
                Download Now
              </a>
            </td>
            <td>
              <a href="" style={{ textDecoration: "none" }}>
                Download Now
              </a>
            </td>
            <td>
              <a href="" style={{ textDecoration: "none" }}>
                Download Now
              </a>
            </td>
            <td>
              <a href="" style={{ textDecoration: "none" }}>
                Download Now
              </a>
            </td>
          </tr>
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
            <DropdownItem>SDE</DropdownItem>
            <DropdownItem>FMCG</DropdownItem>
            <DropdownItem>PD/BA</DropdownItem>
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
            <th>Q. Papers</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Mechanics of Solid</th>
            <td>
              <a href="" style={{ textDecoration: "none" }}>
                Download Now
              </a>
            </td>
            <td>
              <a href="" style={{ textDecoration: "none" }}>
                Download Now
              </a>
            </td>
            <td>
              <a href="" style={{ textDecoration: "none" }}>
                Download Now
              </a>
            </td>
            <td>
              <a href="" style={{ textDecoration: "none" }}>
                Download Now
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
      <Modal centered isOpen={modal}>
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
              <Form>
                <FormGroup>
                  <Input
                    required={true}
                    name="dep"
                    placeholder="Enter The Department Name"
                    type="name"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    required={true}
                    name="year"
                    placeholder="Enter Academic Year (1st, 2nd, 3rd, 4th)"
                    type="name"
                  />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Input
                        required={true}
                        name="name"
                        placeholder="Enter Subject Name"
                        type="name"
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
                  />
                </FormGroup>
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
      <Modal centered isOpen={modal1}>
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
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Input
                        required={true}
                        name="name"
                        placeholder="Enter Topic Name"
                        type="name"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        required={true}
                        name="domain"
                        placeholder="Enter Topic Domain"
                        type="name"
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
                  />
                </FormGroup>
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
