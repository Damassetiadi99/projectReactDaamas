import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Navigation() {
  const [profile, setprofile] = useState([]);
const navigate = useNavigate()

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const getData = () => {
    axios
      .get(`https://rich-blue-scorpion-robe.cyclic.app/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setprofile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(id);
    getData();
  }, []);

  return (
    <Navbar expand="lg" fixed="top" style={
      {backgroundColor: "#efc81a"}
    }>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto mb-2 mb-lg-0 gap-5">
          <Link to="/menu" className="text-decoration-none fw-bold fs-5">
            <Nav.Link as="div" style={{ color: "#2E266F" }}>
              Home
            </Nav.Link>
          </Link>
          <Link to="/inputMenu" className="text-decoration-none fw-bold fs-5">
            <Nav.Link as="div" style={{ color: "#2E266F" }}>
              Add Recipe
            </Nav.Link>
          </Link>
          <Link
            to={`/update-profile/${id}`}
            className="text-decoration-none fw-bold fs-5"
          >
            <Nav.Link as="div" style={{ color: "#2E266F" }}>
              Profile
            </Nav.Link>
          </Link>
        </Nav>

        {token? (
          <div className="d-flex gap-3">
            <div
              style={{
                height: "60px",
                width: "5px",
                backgroundColor: "#efc81a",
              }}
            ></div>
            <Link to={`/update-profile/${profile?.data?.id}`}>
              <div>
                <img
                  src={profile?.data?.photo}
                  alt="profile"
                  width="50px"
                  height="50px"
                  className="rounded-circle"
                />
              </div>
            </Link>
            <div>
              <h5 className="m-0">{profile?.data?.username}</h5>
              <h5
                className="m-0 fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </h5>
            </div>
          </div>
        ) : (
          <div className="d-flex gap-5">
            <Link className="text-decoration-none fw-bold" to="/login">
              Login
            </Link>
            <Link className="text-decoration-none fw-bold" to="/register">
              Register
            </Link>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
