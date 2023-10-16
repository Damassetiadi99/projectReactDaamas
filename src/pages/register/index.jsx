import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isChecked, setIsChecked] = useState(false);

    const postData = (e) => {
        e.preventDefault();
        if (!isChecked) {
            alert("Harap centang kotak untuk melanjutkan pendaftaran.");
            return;
        }

        console.log(inputData);
        axios.post(import.meta.env.VITE_BASE_URL+`/users/register`, inputData)
            .then((res) => {
                console.log(res);
                navigate('/login')
            })
            .catch((err) => {
                alert(err.response.data.message);
                console.log(err)
                console.log('error disini')
            });
    };

    const onChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row>
                <Col md={12}>
                    <div className="mt-5 text-center">
                        <img src="" alt="logo" width="100px" />
                        <h4 className="my-3 fw-bold text-warning">Register</h4>
                        <p>Create a new account</p>
                    </div>
                    <form onSubmit={postData} className='my-3'>
                        <input type="text" name='username' value={inputData.name} className='form-control col-4 mb-3' onChange={onChange} placeholder='Full Name' />
                        <input type="email" name='email' value={inputData.email} className='form-control col-4 mb-3' onChange={onChange} placeholder='Email' />
                        <input type="password" name='password' value={inputData.password} className='form-control col-4 mb-3' onChange={onChange} placeholder='Password' />
                        <Form.Group className="my-3 form-check">
                            <Form.Check type="checkbox" label="I agree to terms and conditions" checked={isChecked} onChange={handleCheckboxChange} />
                        </Form.Group>
                        <Button type="submit" variant="warning" className="w-100 fw-semibold text-white">
                            Register
                        </Button>
                        <p className="mt-3">
                            Already have an account?
                            <span>
                                <Link to="/login" className="text-decoration-none colors">Log In</Link>
                            </span>
                        </p>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}
