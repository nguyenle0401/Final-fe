import React from "react";
import Moment from "react-moment";
import api from "../redux/api";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});
const IdiomCard = ({ idiom }) => {
  const handleClickLike = () => {
    api.get(`/idioms/favorite/${idiom._id}`);
  };

  const handleClick = () => {
    api.get(`/idioms/${idiom._id}`);
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
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
            <button class="btn-card" onClick={() => handleClickLike()}>
              Like
            </button>
          </div>
        </div>
      </div>

      <div class="social-panel-container">
        <div class="social-panel">
          <p>
            Created with <i class="fa fa-heart"></i> by
            <a target="_blank" href="https://florin-pop.com">
              Florin Pop
            </a>
          </p>
          <button class="close-btn">
            <i class="fas fa-times"></i>
          </button>
          <h4>Get in touch on</h4>
          <ul>
            <li>
              <a href="https://www.patreon.com/florinpop17" target="_blank">
                <i class="fab fa-discord"></i>
                haha
              </a>
            </li>
            <li>
              <a href="https://twitter.com/florinpop1705" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/florinpop17" target="_blank">
                <i class="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://facebook.com/florinpop17" target="_blank">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/florinpop17" target="_blank">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <button class="floating-btn">Get in Touch</button> */}
    </div>
  );
};

export default IdiomCard;
