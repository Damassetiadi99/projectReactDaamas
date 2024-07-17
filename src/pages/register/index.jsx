import { Container, Row, Col, Form, Button,InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import logo from "../../../src/assets/logologin.png";
import { useDispatch,useSelector } from "react-redux";
import {  toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/action/auth";
import "react-toastify/dist/ReactToastify.css";




export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { isError} = useSelector((state) => state.authReducer);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const postData =  async(e) => {
    e.preventDefault();
    if (!isCheckboxChecked) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    try {
        await dispatch(register(inputData, navigate));
      } catch (error) {
        toast.error(isError || "Internal server error");
      }
  };
  console.log(postData)
  


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
         
         <InputGroup className="mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={inputData.password}
                className="form-control"
                onChange={onChange}
                placeholder="Password"
              />
              <Button
                variant="light"
                onClick={toggleShowPassword}
                style={{ border: "none", outline: "none" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
            <Form.Group className="my-3 form-check" style={{ marginLeft: '-27px' }}>
              <Form.Check
                type="checkbox"
                label="I agree to terms and conditions"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
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
                  Login
                </Link>
              </span>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
  