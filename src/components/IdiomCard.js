import React from "react";
import api from "../redux/api";
import { makeStyles } from "@material-ui/core/styles";
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
      <div class="courses-container">
        <div class="course">
          <div class="course-preview">
            <img
              src={
                idiom?.images?.length
                  ? idiom.images[0]
                  : "https://via.placeholder.com/160x100"
              }
              className="align-self-start mr-3"
              alt="..."
              width={100}
              height={100}
            />
          </div>
          <div class="course-info">
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
              <span class="progress-text">@{idiom?.author?.name} created </span>
            </div>
            <button
              class={`btn-card ${liked ? "liked" : ""}`}
              onClick={() => handleClickLike()}
            >
              {liked ? "like" : "ulike"}
            </button>
          </div>
        </div>
      </div>
      <a href="#top" title="Go to top" class="floating-btn">
        On top
      </a>
    </div>
  );
};

export default IdiomCard;
