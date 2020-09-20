import React from "react";
import PublicNavbar from "../PublicNavbar";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import AlertMsg from "./AlertMsg";
import IdiomDetailPage from "../IdiomDetailPage";
import AddEditIdiomPage from "../AddEditIdiomPage";
import PrivateRoute from "../Routes/PrivateRoute";
import VerifyEmailPage from "../VerifyEmailPage";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/idioms/add" component={AddEditIdiomPage} />
          <Route exact path="/idioms/:id" component={IdiomDetailPage} />
          <PrivateRoute
            exact
            path="/idioms/:id/edit"
            component={AddEditIdiomPage}
          />
          <Route exact path="/verify/:code" component={VerifyEmailPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};

export default PublicLayout;
