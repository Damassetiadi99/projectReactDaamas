import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiIxMjMxMzEzMiIsImVtYWlsIjoiZmFocnVAZ21haWwuY29tIiwicGhvdG8iOm51bGwsImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTI2VDAzOjI1OjM5LjU2N1oiLCJpYXQiOjE2OTAzNDU1Mjl9.3ha4VrPRSWbTIJFaJeB-XZAjY7AuusvKm0N6N_LHzrE`;

export default function UpdateMenu() {
  const { menuId } = useParams();
  const [photo, setPhoto] = useState(null);

  const [inputData, setInputData] = useState({
    title: "",
    ingredients: "",
    category_id: "1",
    photo_url: "",
  });
  const getData = () => {
    axios
      .get(`http://localhost:3000/recipe/${menuId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setInputData({
          ...inputData,
          title: res.data.data.title,
          ingredients: res.data.data.ingredients,
          photo_url: res.data.data.photo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(menuId);
    getData();
  }, []);
  const postData = (event) => {
    event.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("title", inputData.title);
    bodyFormData.append("ingredients", inputData.ingredients);
    bodyFormData.append("category_id", inputData.category_id);
    bodyFormData.append("photo", photo);
    console.log(bodyFormData);

    axios.put(`http://localhost:3000/recipe/${menuId}`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/menu");
      })
      .catch((err) => {
        console.log(err);
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
        photo_url: URL.createObjectURL(e.target.files[0]),
      });
    console.log(e.target.files);
  };
  return (
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
          placeholder="photo"/>
        <img src={inputData.photo_url} width={200} />
        <button type="submit" className="btn btn-warning">
          Update Menu
        </button>
      </form>
    </div>
  );
}
