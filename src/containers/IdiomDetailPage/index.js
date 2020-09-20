import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { idiomActions } from "../../redux/actions";
import { Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import Moment from "react-moment";
import Markdown from "react-markdown";
import ReviewList from "../../components/ReviewList";
import ReviewIdiom from "../../components/ReviewIdiom";
import Reactions from "../../components/Reactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IdiomDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const idiom = useSelector((state) => state.idiom.selectedIdiom);
  const loading = useSelector((state) => state.idiom.loading);
  const currentUser = useSelector((state) => state.auth.user);
  const submitLoading = useSelector((state) => state.idiom.subReviewLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  const [reviewText, setReviewText] = useState("");
  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(idiomActions.createReview(idiom._id, reviewText));
    setReviewText("");
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(idiomActions.getSingleIdiom(params.id));
    }
  }, [dispatch, params]);

  const handleGoBackClick = (e) => {
    history.goBack();
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Button onClick={handleGoBackClick}>
          <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
        </Button>
        {currentUser?._id === idiom?.author?._id ? (
          <Link to={`/idiom/edit/${idiom._id}`}>
            <Button variant="primary">
              <FontAwesomeIcon icon="edit" size="1x" /> Edit
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {idiom && (
            <div className="mb-5">
              <h4>{idiom.title}</h4>

              <span className="text-muted">
                @{idiom?.author?.name} wrote{" "}
                <Moment fromNow>{idiom.createdAt}</Moment>
              </span>

              <hr />
              <Markdown source={idiom.content} />
              <hr />
              <Reactions
                reactionsData={idiom.reactions}
                targetType="Idiom"
                target={idiom._id}
                size="lg"
              />
              <hr />
              <ReviewList reviews={idiom.reviews} />
            </div>
          )}

          {isAuthenticated && (
            <ReviewIdiom
              reviewText={reviewText}
              handleInputChange={handleInputChange}
              handleSubmitReview={handleSubmitReview}
              loading={submitLoading}
            />
          )}
        </>
      )}
    </>
  );
};

export default IdiomDetailPage;
