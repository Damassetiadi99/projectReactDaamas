import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"
import Alert from "../../component/alert";
import "./menu.css"
import { Bounce, toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../../component/navbar";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import Footer from "../../component/footer"




export default function Menu(){
 const [data,setData] = useState(null)
 const [showAlert,setShowAlert]=useState (false)
 const [alertData,setAlertData] = useState({
  type : "",
  message : ""
 })
 const getData =()=>{
  const token = localStorage.getItem('token')
  axios.get('https://rich-blue-scorpion-robe.cyclic.app/recipe',{headers :{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      console.log(res)
      setData(res.data.data)
      toast.success('get data succes!',{ toastId: "1" })

      
    })
    .catch((err)=>{
      console.log(err)
      toast.error('get data error!')

    })
 }
  useEffect(()=>{
    getData()
    
    setAlertData({...alertData,message:"berhasil get data"})
    setShowAlert(true)
  },[])

  const deleteData = (id)=>{
    const token = localStorage.getItem('token')
    axios.delete(`https://rich-blue-scorpion-robe.cyclic.app/recipe/${id}`,{headers :{
      Authorization : `Bearer ${token}`
    }})
    .then((res)=>{
      

      console.log(res)
      setData(res.data.data)
      getData()
      toast.success('berhasil hapus data')
      setAlertData({...alertData,type:"warning",message:"berhasil hapus data"})
            setShowAlert(true)
    
    })
    .catch((err)=>{
      console.log(err)
      getData()
      toast.error('gagal menghapus data')
      setAlertData({...alertData,type:"warning",message:"gagal hapus data"})
      setShowAlert(true)
    })
  }

    return(
      
      <Fragment>
         <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          transition={Zoom}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        /> 
        {/* html rb */}
        <Navigation/>
        <Container className="my-5">
       
      <Row>
        <Col md={12}>
          <h2 className="fw-bold color mt-5">
            Discover Recipe <br />
            & Delicious Food
          </h2>
        </Col>
        <Col md={8} className="mt-3 mb-5">
          <Form inline className="d-flex justify-content-center">
            <InputGroup className="gap-4">
              <FormControl
                type="text"
                className="form-control rounded"
                placeholder=" Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <Button variant="warning" className="fw-bold text-white" type="submit">
                  Search
                </Button>
              </div>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row>
        <Col md={3} className="mb-2">
          <Button className="fw-bold text-white btn-category">New</Button>
        </Col>
        <Col md={3} className="mb-2">
          <Button className="fw-bold text-white btn-category">Popular</Button>
        </Col>
        <Col md={3} className="mb-2">
          <Button className="fw-bold text-white btn-category2">Vegetarian</Button>
        </Col>
        <Col md={3} className="mb-2">
          <Button className="fw-bold text-white btn-category2">Breakfast</Button>
        </Col>
      </Row>
    </Container>
    <Container className="my-5 shadow">
      {data?.map((item,index)=>{
        return(
          <div key={index}>
          
          <Row>
        <Col md={4} className="d-flex justify-content-center align-items-center">
          <img
            src={item.photo}
            width={300}
            height={350}
            alt="menu"
            className="image-menu"
          />
        </Col>
        <Col md={8}>
          <div>
            <h5 className="fw-bold">
              {item.title}
            </h5>
            <p className="fs-5 m-0">Ingredients</p>
            <ul>
                      {item.ingredients.split(",").map((ingredient, index) => (
                        <li key={index}>{ingredient.trim()}</li>
                      ))}
                    </ul>
            <Button
              className="mb-2 text-white rounded border border-0 p-1 fw-bold"
              style={{ backgroundColor: '#efc81a' }}
            >
              10 Likes - 12 Comments - 3 Bookmarks
            </Button>
            <div className="d-flex gap-2 my-2">
              {/* <Image
                className="rounded-circle"
                src="../../assets/"
                alt="Profile"
                width="40px"
                height="40px"
              /> */}
              <p className="m-0 d-flex align-items-center fw-semibold">{item.author}</p>
            </div>
          </div>
        </Col>
      </Row>
      <Link to={`/update-menu/${item.id}`}>
                    <button className="btn btn-primary">update</button>
                </Link>
            <button className="btn btn-danger" onClick={()=>deleteData(item.id)}>Delete</button>
     
          </div>
        )
      })}
      
     
    </Container>
      <div className="items-center">
        <Link to={'/inputmenu'}> Input Menu</Link>
        {showAlert && <Alert type={alertData.type} message={alertData.message} />}
      {/* <h1>Menu</h1>
      {data?.map((item,index)=>{
        return(
          <div key={item.id} onClick={()=>console.log(item.id)}>
            <img src={item.photo} height={100}/>
            <p>{item.title}</p>
            <Link to={`/update-menu/${item.id}`}>
                    <button className="btn btn-primary">update</button>
                </Link>
            <button className="btn btn-danger" onClick={()=>deleteData(item.id)}>Delete</button> */}

      {/* </div> */}
        {/* )
      })} */}
      <a href="/menu-detail">to menu detail</a>
      <Link to={"/menu-detail"}>to menu detail SPA</Link>
      </div>
      <Footer/>
      </Fragment>
      
    )
  }