import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
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
        <div className="d-flex gap-3">
          <div style={{ height: '60px', width: '5px', backgroundColor: '#efc81a' }}></div>
          <div>
            <img
              src="../../assets/react.svg"
              alt="profile"
              width="40px"
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div>
            <p className="m-0">Damas</p>
            <p className="m-0 fw-bold">Logout</p>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;