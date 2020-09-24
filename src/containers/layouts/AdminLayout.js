import React from "react";
import PublicNavbar from "../PublicNavbar";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import AlertMsg from "./AlertMsg";
import ProfilePage from "../Admin/ProfilePage";
import SideMenu from "../Admin/SideMenu";
import AddEditIdiomPage from "../AddEditIdiomPage";
import IdiomListPage from "../Admin/IdiomListPage";
import IdiomDetailPage from "../IdiomDetailPage";
import GamePage from "../Admin/GamePage";
import SocketGamePage from "../Admin/SocketGamePage";

const AdminLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container fluid style={{ paddingTop: "100px" }}>
        <Row>
          <SideMenu />
          <Col md={9} lg={10}>
            <AlertMsg />
            <Switch>
              <Route exact path="/admin/profile" component={ProfilePage} />
              {/* <Route exact path="/admin/friends" component={FriendListPage} /> */}
              <Route exact path="/admin/idioms" component={IdiomListPage} />
              <Route
                exact
                path="/admin/idioms/:id"
                component={IdiomDetailPage}
              />
              <Route
                exact
                path="/admin/idioms/add"
                component={AddEditIdiomPage}
              />
              <Route
                exact
                path="/admin/idioms/edit/:id"
                component={AddEditIdiomPage}
              />
              {/* <Route exact path="/admin/messenger" component={MessengerPage} /> */}
              <Route exact path="/admin/game" component={GamePage} />
              <Route
                exact
                path="/admin/socketgame"
                component={SocketGamePage}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
