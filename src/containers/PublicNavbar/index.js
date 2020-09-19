import React from "react";
import { Navbar, Nav, Modal, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authActions } from "../../redux/actions";
import { useDispatch } from "react-redux";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import SearchItem from "../../components/SearchItem.js";
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
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-dark">Search</Button>
      </Form> */}
      <SearchItem />
      <Nav.Link as={Link} to="/admin/profile">
        <Button variant="outline-success">Admin</Button>
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>
        <Button variant="outline-success">Logout</Button>
      </Nav.Link>
    </Nav>
  );
  const publicLinks = (
    <Nav>
      <Nav.Item onClick={() => setShowLogin(true)}>
        <Button variant="outline-success">Login</Button>
      </Nav.Item>
      <Nav.Item onClick={() => setShowRegister(true)}>
        <Button variant="outline-danger">Sign Up Free</Button>
      </Nav.Item>
    </Nav>
  );

  return (
    <>
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <LoginPage
          setShowRegister={setShowRegister}
          setShowLogin={setShowLogin}
        />
        <Modal.Footer>
          <Button onClick={handleCloseLogin}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <RegisterPage
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
        />
        <Modal.Footer>
          <Button onClick={handleCloseRegister}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Navbar bg="light" expand="lg" width="100%">
        <div
          style={{ width: "100%" }}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <div style={{ width: "100%" }}>
            <Navbar.Brand as={Link} to="/" className="nav-brand">
              <div className="d-flex flex-column justify-content-center align-items-center logo">
                <img src="/your-logo.png" alt="EL" />
              </div>
            </Navbar.Brand>
          </div>
          <div className="nav-2">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="nav-collapse">
              <Nav className="mr-auto"></Nav>
              {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default PublicNavbar;
