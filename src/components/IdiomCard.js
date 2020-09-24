import React from "react";
import api from "../redux/api";
import * as types from "../redux/constants/auth.constants";

import { useDispatch } from "react-redux";
const IdiomCard = ({ idiom, liked }) => {
  const dispatch = useDispatch();

  const handleClickLike = async () => {
    const res = await api.get(`/idioms/favorite/${idiom._id}`);
    console.log("kkk", res.data);
    dispatch({
      type: types.UPDATE_USER_FAVORITES,
      payload: res.data.favoriteWords,
    });
  };

  return (
    <div>
      <div className="courses-container">
        <div className="course">
          <div className="course-preview">
            <img
              src={
                idiom?.images?.length
                  ? idiom.images[0]
                  : "https://via.placeholder.com/160x100"
              }
              className="align-self-start"
              alt="..."
              width={150}
              height={150}
            />
          </div>
          <div className="course-info">
            {/* <h6>Chapter 4</h6> */}
            <h5>
              {" "}
              <strong>
                <i>"{idiom.title}"</i>
              </strong>
            </h5>
            <span>
              <p>
                {" " + idiom.content.length <= 99
                  ? idiom.content
                  : idiom.content.slice(0, 99) + "..."}
              </p>
              <div className="content-footer d-flex align-items-start"></div>
            </span>
            <div>
              <span className="progress-text">
                @{idiom?.author?.name} created{" "}
              </span>
            </div>
            <button
              className={`btn-card ${liked ? "liked" : ""}`}
              onClick={() => handleClickLike()}
            >
              {liked ? (
                <span className="material-icons">favorite_border</span>
              ) : (
                <span className="material-icons">favorite_border</span>
              )}
            </button>
          </div>
        </div>
      </div>
      <a href="#top" title="Go to top" className="floating-btn">
        On top
      </a>
    </div>
  );
};

export default IdiomCard;
