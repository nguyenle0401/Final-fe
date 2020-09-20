import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { idiomActions } from "../../redux/actions";

const AddEditIdiomPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: null,
  });
  const loading = useSelector((state) => state.idiom.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const selectedIdiom = useSelector((state) => state.idiom.selectedIdiom);
  const redirectTo = useSelector((state) => state.idiom.redirectTo);
  const addOrEdit = params.id ? "Edit" : "Add";
  const idiomId = params.id;

  useEffect(() => {
    if (idiomId) {
      if (!selectedIdiom) {
        dispatch(idiomActions.getSingleIdiom(idiomId));
      } else {
        setFormData((formData) => ({
          ...formData,
          title: selectedIdiom.title,
          content: selectedIdiom.content,
          images: selectedIdiom.images,
        }));
      }
    }
  }, [idiomId, selectedIdiom, dispatch]);
  console.log("haha", selectedIdiom);
  const handleChange = (e) => {
    if (e.target.name === "images") {
      console.log(e.target.files);
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, images } = formData;
    if (addOrEdit === "Add") {
      dispatch(idiomActions.createNewIdiom(title, content, images));
    } else if (addOrEdit === "Edit") {
      dispatch(idiomActions.updateIdiom(selectedIdiom._id, title, content));
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    dispatch(idiomActions.deleteIdiom(selectedIdiom._id));
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(idiomActions.setRedirectTo(""));
      } else {
        history.push(redirectTo);
        dispatch(idiomActions.setRedirectTo(""));
      }
    }
  }, [redirectTo, dispatch, history]);

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["socialIdiom", "idiomImages"],
      },
      function (error, result) {
        if (result && result.length) {
          setFormData({
            ...formData,
            images: result.map((res) => res.secure_url),
          });
        }
      }
    );
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">{addOrEdit} idiom</h1>
              <p className="lead">
                <i className="fas fa-user" />
              </p>
            </div>
            <Form.Group>
              <Form.Control
                type="text"
                required
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="10"
                placeholder="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="info" onClick={uploadWidget}>
                {addOrEdit} Images
              </Button>
            </Form.Group>
            <ButtonGroup className="d-flex mb-3">
              {loading ? (
                <Button
                  className="mr-3"
                  variant="primary"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </Button>
              ) : (
                <Button className="mr-3" type="submit" variant="primary">
                  Submit
                </Button>
              )}
              <Button variant="light" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </ButtonGroup>
            {addOrEdit === "Edit" && (
              <ButtonGroup className="d-flex">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete Idiom
                </Button>
              </ButtonGroup>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEditIdiomPage;
