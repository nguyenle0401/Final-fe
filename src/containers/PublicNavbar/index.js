import React from "react";
import "./style.css";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authActions } from "../../redux/actions";
import { useDispatch } from "react-redux";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
const PublicNavbar = () => {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  const authLinks = (
    <Nav>
      <Nav.Link as={Link} to="/admin/profile">
        <Button variant="btn btn-light">Admin</Button>
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>
        <Button variant="btn btn-danger">Logout</Button>
      </Nav.Link>
    </Nav>
  );
  const publicLinks = (
    <Nav>
      <Nav.Item onClick={() => setShowLogin(true)}>
        <Button variant="btn btn-light">Login</Button>
      </Nav.Item>
      <Nav.Item onClick={() => setShowRegister(true)}>
        <Button className="sign-up" variant="btn btn-success">
          Sign Up
        </Button>
      </Nav.Item>
    </Nav>
  );

  return (
    <div>
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <LoginPage
          setShowRegister={setShowRegister}
          setShowLogin={setShowLogin}
        />
        <Modal.Footer>
          <Button variant="btn btn-light" onClick={handleCloseLogin}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <RegisterPage
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
        />
        <Modal.Footer>
          <Button variant="btn btn-light" onClick={handleCloseRegister}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar expand="lg" style={{ width: "100%" }}>
        <div
          style={{ width: "100%" }}
          className="d-flex flex-row align-items-center justify-content-center"
        >
          <div style={{ width: "100%" }}>
            <Navbar.Brand as={Link} to="/" className="nav-brand">
              <div className=" logo">
                <img src="/favicon.png" alt="EL" style={{ width: "80px" }} />
              </div>
            </Navbar.Brand>
          </div>
          <div className="nav-2">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="nav-collapse">
              {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default PublicNavbar;
