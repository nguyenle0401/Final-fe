import React from "react";
import "./style.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// import { useSelector, useDispatch } from "react-redux";

const SideMenu = () => {
  return (
    <Nav className="col-md-3 col-lg-2 d-md-block  collapse">
      <div>
        <Nav.Item>
          <div>
            <div className="icon">
              <i className="material-icons" style={{ fontSize: "35px" }}>
                face
              </i>
            </div>
            <div className="title">
              <Nav.Link
                as={NavLink}
                to="/admin/profile"
                activeClassName="active"
                strict={true}
              >
                <p className="color-text">Profile</p>
              </Nav.Link>
            </div>
          </div>
        </Nav.Item>
        <Nav.Item>
          <div>
            <div className="icon">
              <i className="material-icons" style={{ fontSize: "35px" }}>
                history_edu
              </i>
            </div>
            <div className="title">
              <Nav.Link
                as={NavLink}
                to="/admin/idioms"
                activeClassName="active"
                strict={true}
              >
                <p className="color-text">Idioms</p>
              </Nav.Link>
            </div>
          </div>
        </Nav.Item>
        <Nav.Item>
          <div>
            <div className="icon">
              <i className="material-icons" style={{ fontSize: "35px" }}>
                sports_esports
              </i>
            </div>
            <div className="title">
              <Nav.Link
                as={NavLink}
                to="/admin/game"
                activeClassName="active"
                strict={true}
              >
                <p className="color-text">Game</p>
              </Nav.Link>
            </div>
          </div>
        </Nav.Item>
        <Nav.Item>
          <div>
            <div className="icon">
              <i className="material-icons" style={{ fontSize: "35px" }}>
                sports_esports
              </i>
            </div>
            <div className="title">
              <Nav.Link
                as={NavLink}
                to="/admin/socketgame"
                activeClassName="active"
                strict={true}
              >
                <p className="color-text">Competitive Game</p>
              </Nav.Link>
            </div>
          </div>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default SideMenu;
