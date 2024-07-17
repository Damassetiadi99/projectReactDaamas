import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import logo from "../../../src/assets/logologin.png";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  };
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const postData = async (e) => {
    e.preventDefault();
    if (!isCheckboxChecked) {
     alert("Please agree to the terms and conditions.");
      return;
    }
    try {
      await dispatch(login(inputData, navigate));
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
            <img src={logo} />
            <h4 className="my-3 fw-bold text-warning">Login</h4>
            <p className="text-align-center fw-bold">
              login in into your existing account
            </p>
          </div>
          <form onSubmit={postData} className="my-3">
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
              Login
            </Button>
            <p className="mt-3">
              don't have an account?
              <span>
                <Link to="/register" className="text-decoration-none colors">
                  sign up
                </Link>
              </span>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
