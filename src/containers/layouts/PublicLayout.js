import React from "react";
import PublicNavbar from "../PublicNavbar";
import HomePage from "../HomePage";
import RegisterPage from "../RegisterPage";
import { div } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import AlertMsg from "./AlertMsg";
import IdiomDetailPage from "../IdiomDetailPage";
import AddEditIdiomPage from "../AddEditIdiomPage";
import PrivateRoute from "../Routes/PrivateRoute";
import VerifyEmailPage from "../VerifyEmailPage";
import "./PublicLayout.css";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <div>
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
      </div>
    </>
  );
};

export default PublicLayout;
