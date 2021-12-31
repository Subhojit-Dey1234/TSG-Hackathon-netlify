import React, {useState} from "react";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import TableChange from "./TableChange";

export default function TableExample(props) {
  const [isOpen, setOpen] = useState(false);
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
  return (
    <div style={{ padding: "3% 3% 1% 3%" }}>
      <br />
      <br />
      <h1 style={{ fontWeight: "bold" }}>Academic Point</h1>
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
      {/* <Table>
        <Thead>
          <Tr
            style={{
              margin: "2%",
              backgroundColor: "#e0def1",
              lineHeight: "200%",
              borderRadius: "20px",
            }}
          >
            <Th>Subject Name</Th>
            <Th>Code</Th>
            <Th>Notes</Th>
            <Th>PYQP</Th>
            <Th>Books</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            style={{ margin: "2%", lineHeight: "200%", borderRadius: "20px" }}
          >
            <Th>Mechanics of Solid</Th>
            <Td>Mark</Td>
            <Td>Otto</Td>
            <Td>@mdo</Td>
            <Td>@mdo</Td>
          </Tr>
          <Tr
            style={{
              margin: "2%",
              backgroundColor: "#e0def1",
              lineHeight: "200%",
              borderRadius: "20px",
            }}
          >
            <Th>Structural Analysis</Th>
            <Td>Jacob</Td>
            <Td>Thornton</Td>
            <Td>@fat</Td>
            <Td>@fat</Td>
          </Tr>
          <Tr
            style={{ margin: "2%", lineHeight: "200%", borderRadius: "20px" }}
          >
            <Th>Linear Algerbra</Th>
            <Td>Larry</Td>
            <Td>The Bird</Td>
            <Td>@twitter</Td>
            <Td>@twitter</Td>
          </Tr>
        </Tbody>
      </Table> */}
      <TableChange/>
      <br />
      <br />
	  <br/>
      <h1 style={{ fontWeight: "bold" }}>Career Point</h1>
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
      {/* <Table>
        <Thead>
          <Tr
            style={{
              margin: "2%",
              backgroundColor: "#e0def1",
              lineHeight: "200%",
              borderRadius: "20px",
            }}
          >
            <Th>Topic Name</Th>
            <Th>Books</Th>
            <Th>Notes</Th>
            <Th>Problems</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            style={{ margin: "2%", lineHeight: "200%", borderRadius: "20px" }}
          >
            <Th>Mechanics of Solid</Th>
            <Td>Mark</Td>
            <Td>Otto</Td>
            <Td>@mdo</Td>
            <Td>@mdo</Td>
          </Tr>
          <Tr
            style={{
              margin: "2%",
              backgroundColor: "#e0def1",
              lineHeight: "200%",
              borderRadius: "20px",
            }}
          >
            <Th>Structural Analysis</Th>
            <Td>Jacob</Td>
            <Td>Thornton</Td>
            <Td>@fat</Td>
            <Td>@fat</Td>
          </Tr>
          <Tr
            style={{ margin: "2%", lineHeight: "200%", borderRadius: "20px" }}
          >
            <Th>Linear Algerbra</Th>
            <Td>Larry</Td>
            <Td>The Bird</Td>
            <Td>@twitter</Td>
            <Td>@twitter</Td>
          </Tr>
        </Tbody>
      </Table> */}
      <TableChange/>
    </div>
  );
}
