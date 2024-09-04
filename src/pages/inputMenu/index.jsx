import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { Bounce,Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../component/footer"
import Navigation from "../../component/navbar";
import { Container ,Form,Row,Col} from "react-bootstrap";
import style from "./recipe.css"


export default function InputMenu() {
  const [photo, setPhoto] = useState(null);
  const [inputData, setInputData] = useState({
    title: "",
    ingredients: "",
    category_id: "1",
    photo: "",
  });
  const navigate = useNavigate()
  const postData = (event) => {

    event.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("title", inputData.title);
    bodyFormData.append("ingredients", inputData.ingredients);
    bodyFormData.append("category_id", inputData.category_id);
    bodyFormData.append("photo", photo);
    const token = localStorage.getItem('token')

    axios.post(`https://rich-blue-scorpion-robe.cyclic.app/recipe/recipe`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setTimeout(()=>{
          navigate('/menu');
        },2000 )
        toast.success('berhasil input data')
      })
      .catch((err) => {
        toast.error('failed input data')
      });
  };
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    e.target.files[0] &&
      setInputData({
        ...inputData,
        photo: URL.createObjectURL(e.target.files[0]),
      });
  };
  return (
    <Fragment>
      <Navigation/>
      <Container className="my-5">
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          transition={Slide}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Form onSubmit={postData}>
          <div className="mb-3">
            <p className="d-flex justify-content-end m-0">Max File 1MB</p>
            <label
              className="addphoto w-100"
              style={{ height: "250px" }}
              htmlFor="upload-photo"
            >
              <div className="input-photo" id="addphotowrapper">
                {photo && (
                  <img src={inputData.photo} className="input-photo" />
                )}
                <p>Add Photo</p>
              </div>
            </label>
            <input
              type="file"
              name="image"
              id="upload-photo"
              onChange={onChangePhoto}
            />
          </div>
          <div className="mb-2">
            <Form.Label htmlFor="formtitle"></Form.Label>
            <Form.Control
              type="text"
              id="formtitle"
              name="title"
              value={inputData.title}
              onChange={onChange}
              placeholder="Title"
              style={{ backgroundColor: "#f6f5f4" }}
            />
          </div>
          <div className="mb-2">
            <Form.Label htmlFor="formingredients"></Form.Label>
            <Form.Control
              as="textarea"
              id="formingredients"
              name="ingredients"
              value={inputData.ingredients}
              onChange={onChange}
              rows={5}
              placeholder="Ingredients"
              style={{ backgroundColor: "#f6f5f4", height: "200px" }}
            />
          </div>
          <Row>
            <Col md={3} className="mt-4">
              <Form.Select
                className="form-select form-select-sm py-3 bg-body-tertiary"
                aria-label="select example"
                value={inputData.category_id}
                onChange={onChange}
                name="category_id"
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="1">Main Course</option>
                <option value="2">Dessert</option>
                <option value="3">Appetizer</option>
              </Form.Select>
            </Col>
          </Row>
          <div className="my-5 d-flex justify-content-center">
            <button
              type="submit"
              className="border border-0 py-2 px-5 fw-bold text-white rounded"
              style={{ backgroundColor: " #efc81a" }}
            >
              Post
            </button>
          </div>
        </Form>
      </Container>
      <Footer/>
    </Fragment>
  );
};

