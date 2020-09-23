import React from "react";
import "./style.css";
import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// import { useSelector, useDispatch } from "react-redux";

const SideMenu = () => {
  return (
    <Nav className="col-md-3 col-lg-2 d-md-block sidebar collapse">
      <div className="sidebar-sticky pt-3">
        <Nav.Item>
          <div>
            <div class="icon">
              <i class="material-icons" style={{ "font-size": "35px" }}>
                face
              </i>
            </div>
            <p class="title">
              <Nav.Link
                as={NavLink}
                to="/admin/profile"
                activeClassName="active"
                strict={true}
              >
                <p class="color-text">Profile</p>
              </Nav.Link>
            </p>
          </div>
        </Nav.Item>
        <Nav.Item>
          <div>
            <div class="icon">
              <i class="material-icons" style={{ "font-size": "35px" }}>
                history_edu
              </i>
            </div>
            <p class="title">
              <Nav.Link
                as={NavLink}
                to="/admin/idioms"
                activeClassName="active"
                strict={true}
              >
                <p class="color-text">Idioms</p>
              </Nav.Link>
            </p>
          </div>
        </Nav.Item>
        {/* <Nav.Item>
          <div class="card">
            <div class="icon">
              <i class="material-icons">group_add</i>
            </div>
            <p class="title">
              <Nav.Link
                as={NavLink}
                to="/admin/friends"
                activeClassName="active"
                strict={true}
              >
                <p class="color-text">Friends</p>
              </Nav.Link>
            </p>
          </div>
        </Nav.Item> */}
        {/* <Nav.Item>
          <div class="card">
            <div class="icon">
              <i class="material-icons">chat</i>
            </div>
            <p class="title">
              <Nav.Link
                as={NavLink}
                to="/admin/messenger"
                activeClassName="active"
                strict={true}
              >
                <p class="color-text">Message</p>
              </Nav.Link>
            </p>
          </div>
        </Nav.Item> */}
        <Nav.Item>
          <div>
            <div class="icon">
              <i class="material-icons" style={{ "font-size": "35px" }}>
                sports_esports
              </i>
            </div>
            <p class="title">
              <Nav.Link
                as={NavLink}
                to="/admin/game"
                activeClassName="active"
                strict={true}
              >
                <p class="color-text">Game</p>
              </Nav.Link>
            </p>
          </div>
        </Nav.Item>
        <Nav.Item>
          <div>
            <div class="icon">
              <i class="material-icons" style={{ "font-size": "35px" }}>
                sports_esports
              </i>
            </div>
            <p class="title">
              <Nav.Link
                as={NavLink}
                to="/admin/socketgame"
                activeClassName="active"
                strict={true}
              >
                <p class="color-text">Competitive Game</p>
              </Nav.Link>
            </p>
          </div>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default SideMenu;
