import React, { useEffect, useRef, useState } from "react";
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
  Input,
  ModalHeader,
} from "reactstrap";
import logo1 from "../../Images/logo1.png";
import logo2 from "../../Images/logo2.png";
import logo4 from "../../Images/logo4.png";
import formImage from "../../Images/FormImage.png";
import { deleteNews, getNews, updateNews, uploadNewsFunc } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import deleteImg from "../../Images/delete.svg";
import editImg from "../../Images/edit.svg";
const Example = (props) => {
  const dispatch = useDispatch();
  const [uploadNews, setUploadNews] = useState(false);
  const [updateNewsState, setUpdateNews] = useState(false);
  const [newsId, setNewsId] = useState(null);
  const [name, setName] = useState(null);
  const [topic, setTopic] = useState(null);
  const [author, setAuthor] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const imageInput = useRef(null);

  const [isExtended, setExtendedModalOpen] = useState(false);

  const userType = useSelector((state) => {
    if (state.userDetails.user) return state.userDetails.user.type;
  });


  const isAuthenticated = localStorage.getItem("access-token");

  const news = useSelector((state) => state.news.news);
  useEffect(() => {
    dispatch(
      getNews((res) => {
        // console.log(res)
      })
    );
  }, []);

  function uploadNewsForm(e) {
    e.preventDefault();

    var form = new FormData();
    form.append("name", name);
    form.append("topic", topic);
    form.append("author", author);
    form.append("image", image[0]);
    form.append("description", description);

    dispatch(
      uploadNewsFunc(form, (res) => {
        if (res.status === 200) {
          setName(null);
          setTopic(null);
          setAuthor(null);
          setUploadNews(false);
          setDescription(null);
          imageInput.current.value = "";
        }
      })
    );
  }

  function updateNewsForm(e) {
    e.preventDefault();

    var form = new FormData();
    form.append("name", name);
    form.append("topic", topic);
    form.append("author", author);
    if (image) form.append("image", image[0]);
    form.append("description", description);

    dispatch(
      updateNews(newsId, form, (res) => {
        if (res.status === 200) {
          setImage(null);
          setName(null);
          setTopic(null);
          setAuthor(null);
          setUploadNews(false);
          setDescription(null);
          setUpdateNews(false);
          imageInput.current.value = "";
        }
      })
    );
  }

  var host = window.location.origin;

  return (
    <div>
      <br />
      <br />
      <br />
      <h2
        style={{
          textAlign: "left",
          margin: "3% 5% 0 5%",
          fontWeight: "bolder",
        }}
      >
        Get Latest News!
      </h2>
      {/* <Button
				onClick={() => {
					setUploadNews(true);
				}}
			>
				Upload
			</Button> */}
      <a
        href={() => false}
        onClick={() => {
          if (userType !== undefined) setUploadNews(true);
        }}
        style={{
          textDecoration: "none",
          margin: "3% 5% 0 5%",
          color: "blue",
          cursor: "pointer",
          display: userType === "student" ? "none" : "",
        }}
      >
        Want to Create A News Now?
      </a>
      <Modal centered isOpen={uploadNews} toggle={() => setUploadNews(false)}>
        <ModalBody>
          <Row
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: "0 5%",
            }}
          >
            <h4 style={{ textAlign: "center" }}>Upload The News</h4>
            <br />
            <img src={formImage} />
            <Col
              sm="12"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Form onSubmit={uploadNewsForm}>
                <FormGroup>
                  <Input
                    required={true}
                    name="title"
                    placeholder="Enter The Title"
                    type="name"
                    value={name ? name : ""}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Input
                        required={true}
                        name="name"
                        placeholder="Enter Your Name"
                        type="name"
                        value={author ? author : ""}
                        onChange={(e) => {
                          setAuthor(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        required={true}
                        name="name"
                        placeholder="Enter the Topic"
                        type="name"
                        value={topic ? topic : ""}
                        onChange={(e) => {
                          setTopic(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Input
                    required={true}
                    name="description"
                    placeholder="Enter News Description"
                    type="textarea"
                    value={description ? description : ""}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <FormGroup>
                    <input
                      ref={imageInput}
                      required={true}
                      accept="image/png,image/jpeg,image/jpg"
                      placeholder="Update Event Image"
                      type="file"
                      onChange={(e) => {
                        setImage(e.target.files);
                      }}
                    />
                  </FormGroup>
                </FormGroup>
                <br />
                <center>
                  <Button
                    disabled={!image}
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
      <Modal
        centered
        isOpen={updateNewsState}
        toggle={() => {
          setUpdateNews(false);
          setName(null);
          setTopic(null);
          setDescription(null);
          setImage(null);
          setAuthor(null);
        }}
      >
        <ModalBody>
          <Row
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: "0 5%",
            }}
          >
            <h4 style={{ textAlign: "center" }}>Update The News</h4>
            <br />
            <img src={formImage} />
            <Col
              sm="12"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Form onSubmit={updateNewsForm}>
                <FormGroup>
                  <Input
                    required={true}
                    name="title"
                    placeholder="Enter The Title"
                    type="name"
                    value={name ? name : ""}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Input
                        required={true}
                        name="name"
                        placeholder="Enter Your Name"
                        type="name"
                        value={author ? author : ""}
                        onChange={(e) => {
                          setAuthor(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        required={true}
                        name="name"
                        placeholder="Enter the Topic"
                        type="name"
                        value={topic ? topic : ""}
                        onChange={(e) => {
                          setTopic(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Input
                    required={true}
                    name="description"
                    placeholder="Enter News Description"
                    type="textarea"
                    value={description ? description : ""}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <FormGroup>
                    <input
                      ref={imageInput}
                      // required={true}
                      accept="image/png,image/jpeg,image/jpg"
                      placeholder="Update News Image"
                      type="file"
                      onChange={(e) => {
                        setImage(e.target.files);
                      }}
                    />
                  </FormGroup>
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
      {news.map((ne) => (
        <Card
          style={{ textAlign: "left", boxShadow: "2px grey", margin: "3% 5%" }}
        >
          <Row style={{alignItems:"center", justifyContent:"center"}}>
            <Col sm="3">
              <CardImg
                top
                src={host + ne.image}
                alt="Card image cap"
                style={{
                  objectFit: "cover",
                  width: "20vw",
                  height: "20vw",
                  display: window.innerWidth < 900 ? "none" : "block",
                }}
              />
            </Col>
            <Col sm="9">
              <CardBody>
                <CardTitle tag="h5" style={{ fontWeight: "bolder" }}>
                  {ne.name}
                </CardTitle>
                <p>
                  {ne.topic} | By - <i>{ne.author}</i>
                </p>
                <p></p>
                <CardText>
                  {ne.description.length < 475
                    ? `${ne.description}`
                    : `${ne.description.substring(0, 476)}...`}
                  <br />
                  <a
                    href={() => false}
                    onClick={() => {
                      setAuthor(ne.author);
                      setTopic(ne.topic);
                      setDescription(ne.description);
                      setImage(ne.image);
                      setName(ne.name);
                      setExtendedModalOpen(true);
                    }}
                    style={{
                      display: ne.description.length < 475 ? "none" : "",
                      textDecoration: "none",
                      textDecoration: "none",
                      color: "#727dbd",
                      fontWeight: "bolder",
                      cursor: "pointer",
                    }}
                  >
                    Read More
                  </a>
                </CardText>
                {/* <Button>Delete</Button>
                <Button>Edit</Button> */}
                <Button
                  onClick={() => {
                    dispatch(
                      deleteNews(ne._id, (res) => {
                        console.log(res);
                      })
                    );
                  }}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    display:
                      !isAuthenticated || userType === "student" ? "none" : "",
                  }}
                  color="danger"
                >
                  <img src={deleteImg} style={{ width: "20px" }} />
                </Button>
                <Button
                  onClick={() => {
                    setUpdateNews(true);
                    setName(ne.name);
                    setTopic(ne.topic);
                    setAuthor(ne.author);
                    setDescription(ne.description);
                    setNewsId(ne._id);
                  }}
                  style={{
                    position: "absolute",
                    right: "60px",
                    top: "10px",
                    display:
                      !isAuthenticated || userType === "student" ? "none" : "",
                  }}
                  color="warning"
                >
                  <img src={editImg} style={{ width: "20px" }} />
                </Button>
              </CardBody>
            </Col>
          </Row>
        </Card>
      ))}
      <br />
      <Modal
        isOpen={isExtended}
        toggle={() => {
          setDescription(null);
          setAuthor(null);
          setTopic(null);
          setName(null);
          setImage(null);
          setExtendedModalOpen(false);
        }}
      >
        <ModalHeader>{name}</ModalHeader>
        <ModalBody>
          <Card>
            <CardImg src={image} />
            <CardBody>{description}</CardBody>
          </Card>
        </ModalBody>
      </Modal>
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
