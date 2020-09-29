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
    <div>
      <div>
        <header className="header">
          <div className="header_container">
            <div>
              <div className="row">
                <div className="col">
                  <div className="header_content d-flex flex-row align-items-center justify-content-start">
                    <div className="logo_container mr-auto">
                      <a href="/">
                        <img
                          alt="logo"
                          className="logo_text"
                          src="/logo.png"
                          style={{ width: "200px", height: "70px" }}
                        />
                      </a>
                    </div>
                    <nav className="main_nav_contaner">
                      <ul className="main_nav">
                        <li>
                          <Nav.Link as={Link} to="/">
                            <Button variant="btn btn-light">Home</Button>
                          </Nav.Link>{" "}
                        </li>
                        <li>
                          <Nav.Link as={Link} to="/admin/profile">
                            <Button variant="btn btn-light">Profile</Button>
                          </Nav.Link>{" "}
                        </li>
                        <li>
                          <Nav.Link as={Link} to="/admin/idioms">
                            <Button variant="btn btn-light"> Manage </Button>
                          </Nav.Link>{" "}
                        </li>
                        <li>
                          <Nav.Link as={Link} to="/admin/game">
                            <Button variant="btn btn-light">Practice</Button>
                          </Nav.Link>
                        </li>
                        <li className="active ">
                          <Nav.Link as={Link} to="/admin/socketgame">
                            <Button variant="btn btn-light"> Competiton</Button>
                          </Nav.Link>
                        </li>
                        <li>
                          <Button
                            variant="btn btn-danger"
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
  const publicLinks = (
    <div>
      <div>
        <header className="header">
          <div className="header_container">
            <div>
              <div className="row">
                <div className="col">
                  <div className="header_content d-flex flex-row align-items-center justify-content-start">
                    <div className="logo_container mr-auto">
                      <a href="/">
                        <img
                          alt="logo"
                          className="logo_text"
                          src="/logo.png"
                          style={{ width: "200px", height: "70px" }}
                        />
                      </a>
                    </div>
                    <nav className="main_nav_contaner">
                      <ul className="main_nav">
                        <li>
                          <Button
                            variant="btn btn-light"
                            onClick={() => setShowLogin(true)}
                          >
                            Login
                          </Button>
                        </li>
                        <li>
                          <Button
                            variant="btn btn-danger"
                            onClick={() => setShowRegister(true)}
                          >
                            Sign Up
                          </Button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );

  return (
    <div>
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
      </div>

      <Navbar expand="lg" style={{ width: "100%" }}>
        <div
          style={{ width: "100%" }}
          className="d-flex flex-row align-items-center justify-content-center"
        >
          <div style={{ width: "100%" }}></div>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default PublicNavbar;
