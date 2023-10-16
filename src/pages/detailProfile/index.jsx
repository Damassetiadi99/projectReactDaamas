import { Fragment, useEffect, useState } from "react";
import { Container, Nav, Row, Col, Button, Modal } from "react-bootstrap";

import style from "./style.module.css";
// import axios from "axios";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";


export default function DetailProfile  () {
  return (
    <Fragment>
      <Container>
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
        <Nav className="nav">
          <Nav.Item>
            <Nav.Link
              className={`${style.clickable}nav-link active fw-bold text-dark fs-5`}
              data-bs-toggle="tab"
              href="#recipes"
            >
              Recipes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={`${style.clickable} fw-bold text-dark fs-5`}
              data-bs-toggle="tab"
              href="#bookmark"
            >
              Bookmarked
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={`${style.clickable} fw-bold text-dark fs-5`}
              data-bs-toggle="tab"
              href="#like"
            >
              Liked
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>

      <Container className="tab-content">
        <div className="tab-pane active" id="recipes">
          <Container>
            {/* {recipe?.data?.map((item, index) => {
              return (
                <div key={index}> */}
                  <Row className="my-5">
                    <Col
                      md={4}
                      className="d-flex justify-content-center align-items-center"
                    >
                      {/* <Link to={`/detail-menu/${item.id}`}> */}
                        {/* <img
                          src={'/'}
                          alt="menu"
                          className="rounded object-fit-cover"
                          width="280px"
                          height="280px"
                        /> */}
                      {/* </Link> */}
                    </Col>
                    <Col md={8}>
                      <div>
                        <h5 className="fw-bold"></h5>
                        <p className="fs-5 m-0">Ingredients</p>
                        <ul className="fs-6">
                          {/* {item.ingredients
                            .split(",")
                            .map((ingredients, index) => (
                              <li key={index}>{ingredients.trim()}</li>
                            ))} */}
                        </ul>
                        <Button
                          className="mb-2 text-white rounded border border-0 p-1 fw-bold"
                          style={{ backgroundColor: "#efc81a" }}
                        >
                          10 Likes - 12 Coments - 3 Bookmark
                        </Button>
                        <div className="d-flex gap-4 my-2">
                          <Button
                            className="border border-0 fw-bold py-1 px-3 rounded"
                            style={{ backgroundColor: "#30c0f3" }}
                          >
                            <Link
                              to={'/'}
                              className="text-white text-decoration-none"
                            >
                              Edit Menu
                            </Link>
                          </Button>
                          <Button
                            className="border border-0 fw-bold py-1 px-3 rounded"
                            style={{ backgroundColor: "#F57E71" }}
                            // onClick={() => handleShow(item)}
                          >
                            Delete Menu
                          </Button>

                          <div>
                            <Modal
                            //   show={modalVisibility[item.id]}
                            //   onHide={handleClose}
                              backdrop="static"
                              keyboard={false}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Delete</Modal.Title>
                              </Modal.Header>
                              {/* {itemToDelete && (
                                <Modal.Body>
                                  Do you wanna delete{" "}
                                  <strong></strong>?
                                </Modal.Body>
                              )} */}
                              <Modal.Footer>
                                <Button
                                  variant="warning w-100 text-white"
                                  
                                >
                                  Yes
                                </Button>
                                <Button
                                  variant="secondary w-100"
                                
                                >
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                {/* </div>
              );
            })} */}
          </Container>
        </div>
      </Container>

      <div className="my-5 d-flex justify-content-center gap-5">
        <button
          className="mb-2 text-white rounded border border-0 fw-bold py-2 px-4"
          style={{ backgroundColor: " #efc81a" }}
        >
          <FaArrowLeft /> Previous
        </button>

        <div className="d-flex align-items-center gap-2">
          Show <div className="fw-bold"></div> From{" "}
          <div className="fw-bold"> </div>
        </div>
        <button
          className="mb-2 text-white rounded border border-0 fw-bold py-2 px-5"
          style={{ backgroundColor: " #efc81a" }}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </Fragment>
  );
        }