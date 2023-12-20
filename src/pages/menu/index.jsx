import axios from "axios";
import { Fragment, useEffect, useState, useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Alert from "../../component/alert";
import "./menu.css";
import {toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../../component/navbar";
import { Spinner } from "react-bootstrap";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import Footer from "../../component/footer";

export default function Menu() {
  const [data, setData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "",
    message: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(
    (page) => {
      const token = localStorage.getItem("token");
      setIsLoading(true);
      axios
        .get(import.meta.env.VITE_BASE_URL + `/recipe`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            limit: 5,
            searchBY: "title",
            search: searchQuery,
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("Get Data Successfully", { toastId: "1" });
          setData(res.data);
          setTotalPage(res.data.pagination.totalPage);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Recipe Not Found", { toastId: "1" });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [searchQuery]
  );

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setCurrentPage(1);
    getData(1);
  };

  const handleNext = useCallback(() => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPage]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  useEffect(() => {
    getData(currentPage);
  }, [getData, currentPage]);

  const nextDisabled = currentPage >= totalPage;
  const previousDisabled = currentPage === 1;
  const deleteData = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://rich-blue-scorpion-robe.cyclic.app/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        getData();
        toast.success("berhasil hapus data");
        setAlertData({
          ...alertData,
          type: "warning",
          message: "berhasil hapus data",
        });
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(err);
        getData();
        toast.error("gagal menghapus data");
        setAlertData({
          ...alertData,
          type: "warning",
          message: "gagal hapus data",
        });
        setShowAlert(true);
      });
  };

  return (
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

      <Navigation />
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <h2 className="fw-bold color mt-5">
              Discover Recipe <br />& Delicious Food
            </h2>
          </Col>
          <Col md={8} className="mt-3 mb-5">
            <Form
              inline
              className="d-flex justify-content-center"
              onSubmit={handleSearchSubmit}
            >
              <InputGroup className="gap-4">
                <FormControl
                  type="text"
                  className="form-control rounded"
                  placeholder=" Search"
                  aria-label="Search"
                  onChange={handleSearchChange}
                  value={searchQuery}
                />
                <div className="input-group-append">
                  <Button
                    variant="warning"
                    className="fw-bold text-white"
                    type="submit"
                    size="lg"
                  >
                    Search
                  </Button>
                </div>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container className="d-flex justify-content-space-between">
        <Row>
          <Col md={3} className="mb-2">
            <Button className="fw-bold text-white" variant="warning">
              New
            </Button>
          </Col>
          <Col md={3} className="mb-2">
            <Button className="fw-bold text-white" variant="warning">
              Popular
            </Button>
          </Col>
          <Col md={3} className="mb-2">
            <Button className="fw-bold text-white " variant="success">
              Vegetarian
            </Button>
          </Col>
          <Col md={3} className="mb-2">
            <Button className="fw-bold text-white " variant="success">
              Breakfast
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="my-5 shadow border-radius-2">
        {isLoading ? (
          <Spinner animation="border" role="status" className="mt-5">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          data?.data?.map((item, index) => (
            <div key={index}>
              <Row>
                <Col
                  md={4}
                  className="d-flex justify-content-center align-items-center my-4 gap-2"
                >
                  <Link to={`/detail-menu/${item.id}`}>
                    <img
                      src={item.photo}
                      width={300}
                      height={350}
                      alt="menu"
                      className="rounded-3 shadow-2"
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <div className="my-5">
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="fs-5 m-0 fw-bold">Ingredients :</p>
                    <ul>
                      {item.ingredients.split(",").map((ingredient, index) => (
                        <li key={index}>{ingredient.trim()}</li>
                      ))}
                    </ul>
                    <Button
                      className="mb-2 text-white rounded border border-0 p-1 fw-bold"
                      style={{ backgroundColor: "#efc81a" }}
                    >
                      10 Likes - 12 Comments - 3 Bookmarks
                    </Button>
                    <div className="d-flex gap-2 my-2">
                      <p className="m-0 d-flex align-items-center fw-semibold">
                        {item.author}
                      </p>
                    </div>
                    <div className="md-6 d-flex justify-content-space-between gap-4 my-4 ml-3">
                      <Link to={`/update-menu/${item.id}`}>
                        <button className="btn btn-primary" md={3}>
                          Edit Menu
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        md={4}
                        onClick={() => deleteData(item.id)}
                      >
                        Delete Menu
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ))
        )}
      </Container>
      <div className="items-center">
        {showAlert && (
          <Alert type={alertData.type} message={alertData.message} />
        )}
        <div className="d-flex justify-content-center gap-5 mb-5">
          <Button
            onClick={handlePrevious}
            variant="warning"
            className="fw-bold text-white"
            type="submit"
            disabled={previousDisabled}
          >
            previous
          </Button>
          <p className="text-dark">{data?.pagination?.pageNow}</p> From{" "}
          <p>{data?.pagination?.totalPage}</p>
          <Button
            onClick={handleNext}
            variant="warning"
            className="fw-bold text-white"
            type="submit"
            disabled={nextDisabled}
          >
            next
          </Button>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
