import React from "react";
import PublicNavbar from "../PublicNavbar";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import AlertMsg from "./AlertMsg";
import BlogDetailPage from "../BlogDetailPage";
import AddEditBlogPage from "../AddEditBlogPage";
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
          <PrivateRoute exact path="/blogs/add" component={AddEditBlogPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <PrivateRoute
            exact
            path="/blogs/:id/edit"
            component={AddEditBlogPage}
          />
          <Route exact path="/verify/:code" component={VerifyEmailPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};

export default PublicLayout;
