import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
  const userToken = localStorage.getItem('token')
  
  return (
    <Navbar expand="lg">
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto mb-2 mb-lg-0">
        <Link to="/menu" className="text-decoration-none fw-bold fs-5">
                <Nav.Link as="div" style={{ color: "#2E266F" }}>
                  Home
                </Nav.Link>
              </Link>
              <Link
                to="/inputMenu"
                className="text-decoration-none fw-bold fs-5"
              >
                <Nav.Link as="div" style={{ color: "#2E266F" }}>
                  Add Recipe
                </Nav.Link>
              </Link>
              <Link
                to="/detail-profile"
                className="text-decoration-none fw-bold fs-5"
              >
                <Nav.Link as="div" style={{ color: "#2E266F" }}>
                  Profile
                </Nav.Link>
              </Link>
        
        </Nav>

        {userToken ? (
              <div className="d-flex gap-3">
                <div
                  style={{
                    height: "60px",
                    width: "5px",
                    backgroundColor: "#efc81a",
                  }}
                ></div>
                <Link to={`/edit-profile`}>
                  <div>
                    {/* <img
                      src="../../assets/potoprofil.jpg"
                      alt="profile"
                      width="50px"
                      height="50px"
                      className="rounded-circle"
                    /> */}
                  </div>
                </Link>
                <div>
                  {/* <h5 className="m-0">{profile?.data[0]?.name}</h5> */}
                  <h5
                    className="m-0 fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                  >
                    Logout
                  </h5>
                </div>
              </div>
            ) : (
              <div className="d-flex gap-4">
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