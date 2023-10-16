import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../component/footer"
import Navigation from "../../component/navbar";



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
    console.log(bodyFormData);
    const token = localStorage.getItem('token')
    console.log(inputData)
    console.log(token)

    axios.post(`https://rich-blue-scorpion-robe.cyclic.app/recipe/recipe`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setTimeout(()=>{
          navigate('/menu');
        },2000 )
        toast.success('berhasil input data')
      })
      .catch((err) => {
        console.log(err);
        toast.error('failed input data')
      });
  };
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  };
  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    e.target.files[0] &&
      setInputData({
        ...inputData,
        photo: URL.createObjectURL(e.target.files[0]),
      });
    console.log(e.target.files);
  };
  return (
    <Fragment>
      <Navigation/>
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          transition={Bounce}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        /> 
    <div className="container">
      <h1>Input Menu</h1>
      <form onSubmit={postData} className="row col-6 gap-2">
        <input
          type="text"
          name="title"
          value={inputData.title}
          className="form-control col-4"
          onChange={onChange}
          placeholder="title"
        />
        <input
          type="text"
          name="ingredients"
          value={inputData.ingredients}
          className="form-control col-4"
          onChange={onChange}
          placeholder="ingredients"
        />
        <input
          type="file"
          name="photo"
          className="form-control col-4"
          onChange={onChangePhoto}
          placeholder="photo"
        />
        {photo && <img src={inputData.photo} width={200} />}
        <button type="submit" className="btn btn-warning">
          Submit Menu
        </button>
      </form>
    </div>
    {/* <Footer/> */}
    </Fragment>
  );
}
