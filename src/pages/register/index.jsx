import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import logo from "../../../src/assets/logologin.png";
import { useDispatch,useSelector } from "react-redux";
import { Bounce, toast, ToastContainer } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/action/auth";




export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { isError} = useSelector((state) => state.authReducer);

  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const postData =  async(e) => {
    e.preventDefault();
    console.log(inputData);
    try {
        await dispatch(register(inputData, navigate));
      } catch (error) {
        toast.error(isError || "Internal server error");
      }
  };
  


  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col md={12}>
          <div className="mt-5 text-center">
            <img src={logo} alt="logo" width="100px" />
            <h4 className="my-3 fw-bold text-warning">Register</h4>
            <p>Create a new account</p>
          </div>
          <form onSubmit={postData} className="my-3">
            <input
              type="text"
              name="username"
              value={inputData.username}
              className="form-control col-4 mb-3"
              onChange={onChange}
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={inputData.email}
              className="form-control col-4 mb-3"
              onChange={onChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={inputData.password}
              className="form-control col-4 mb-3"
              onChange={onChange}
              placeholder="Password"
            />
            <Form.Group className="my-3 form-check">
              <Form.Check
                type="checkbox"
                label="I agree to terms and conditions"
                // checked={isChecked}
                // onChange={handleCheckboxChange}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="warning"
              className="w-100 fw-semibold text-white"
            >
              Register
            </Button>
            <p className="mt-3">
              Already have an account?
              <span>
                <Link to="/login" className="text-decoration-none colors">
                  Log In
                </Link>
              </span>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
  