import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import { login } from "../../redux/action/auth";

export default function Login(){
  const dispatch = useDispatch();
  // const {isError}= useSelector((state)=>state.authReducer)
  const navigate =useNavigate();
    const [inputData,setInputData] = useState({
        email : '',
        password : ''
    })

    const onChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
        console.log(inputData);
      };


      // let url = 'http://localhost:3000'
      
      const postData=(e)=>{
      e.preventDefault()
      console.log(inputData)
      dispatch(login(inputData,navigate))
        
      axios.post(import.meta.env.VITE_BASE_URL+`/users/login`,inputData).then((res)=>
      {console.log(res)
      localStorage.setItem("token",res.data.users.token)
      navigate('/menu')
      }
      )
      }

    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row>
                <Col md={12}>
                    <div className="mt-5 text-center">
                        <image src="../../assets/recipelogo.svg" alt="logo" width="100px" />
                        <h4 className="my-3 fw-bold text-warning">Login</h4>
                        <p>Create a new account</p>
                    </div>
                    <form onSubmit={postData} className='my-3'>
                        <input type="email" name='email' value={inputData.title} className='form-control col-4 mb-3' onChange  ={onChange} placeholder='Email' />
                        <input type="password" name='password' value={inputData.title} className='form-control col-4 mb-3' onChange={onChange} placeholder='Password' />
                        <Form.Group className="my-3 form-check">
                            <Form.Check type="checkbox" label="I agree to terms and conditions" checked={''} onChange={''} />
                        </Form.Group>
                        <Button type="submit" variant="warning" className="w-100 fw-semibold text-white">
                            Login
                        </Button>
                        <p className="mt-3">
                            Already have an account?
                            <span>
                                <Link to="/pages/menu" className="text-decoration-none colors">Log In</Link>
                            </span>
                        </p>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}