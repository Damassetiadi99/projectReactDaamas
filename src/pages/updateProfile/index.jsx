import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Navigation from "../../component/navbar";
import Footer from "../../component/footer";



export default function UpdateProfile() {
  const id =localStorage.getItem('id')
  console.log(id)
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    photo: ""
  });

  const getData = () => {
    axios
      .get(
       `https://rich-blue-scorpion-robe.cyclic.app/users/${id}`,
        // import.meta.env.VITE_BASE_URL + `users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setInputData({
          ...inputData,
          username: res.data.data.username,
          email: res.data.data.email,
          photo: res.data.data.photo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const postData = (event) => {
    event.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("username", inputData.username);
    bodyFormData.append("email", inputData.email);
    bodyFormData.append("photo", photo);

    console.log(bodyFormData);

    axios
      .put(
        ` https://rich-blue-scorpion-robe.cyclic.app/users/putUser/${id}`,
        // import.meta.env.VITE_BASE_URL + `users/${userId}`,
        bodyFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        logout();
        navigate("/login");
        toast.success("Users Updated");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cannot update users data");
      });
  };

  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    console.log(inputData);
  };
  const onChangePhoto = (e) => {
    e.target.files[0] && setPhoto(e.target.files[0]);
    e.target.files[0] &&
      setInputData({
        ...inputData,
        photo: URL.createObjectURL(e.target.files[0]),
      });
    console.log(e.target.files);
  };

  return (
    <Container>
      <Navigation />
      <Row>
        <Col md={12}>
          <form
            className="input-menu d-flex justify-content-center align-items-center flex-column mt-5"
            onSubmit={postData}
          >
            <div className="change-photo d-flex justify-content-center align-items-center flex-column mt-5">
              {localStorage.getItem("photo") !== "null" ? (
                <Image
                  src={inputData.photo}
                  className="img-fluid"
                  alt="profile"
                  style={{ height: 100, width: 100, borderRadius: "50%" }}
                />
              ) : (
                <Image
                  src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                  alt="profile"
                  width="30px"
                  height="30px"
                  style={{ height: 100, width: 100, borderRadius: "50%" }}
                />
              )}
            </div>
            <label>
              <input
                name="photo"
                type="file"
                onChange={onChangePhoto}
                style={{ display: "none" }}
              />
              <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                Change Profile Picture
              </a>
            </label>
            <p className="text-center fw-bold fs-4">
              {/* {localStorage.getItem("username")} */}
            </p>
            <div className="d-flex justify-content-center align-items-center mb-5">
              <Row>
                <Col md={12}>
                  <div className="mb-3">
                    <label for="name" className="form-label">
                      Name
                    </label>
                    <input
                 
                      type="text"
                      name="username"
                      className="form-control border-warning"
                      placeholder="Enter Name"
                      value={inputData.username}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="email" className="form-label">
                      Email
                    </label>
                    <input
                     
                      type="text"
                      name="email"
                      className="form-control border-warning"
                      placeholder="Enter Email Address"
                      value={inputData.email}
                      onChange={onChange}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="btn w-100 fw-semibold text-white mt-3"
                    style={{ backgroundColor: "#efc81a" }}
                  >
                    Update Profile
                  </Button>
                </Col>
              </Row>
            </div>
          </form>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}
