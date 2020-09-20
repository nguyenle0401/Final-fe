import React from "react";
import { Card, Button } from "react-bootstrap";
import Moment from "react-moment";
import api from "../redux/api";

const IdiomCard = ({ idiom }) => {
  const handleClickLike = () => {
    api.get(`/idioms/favorite/${idiom._id}`);
  };

  const handleClick = () => {
    api.get(`/idioms/${idiom._id}`);
  };

  return (
    // <Card className="card" onClick={() => handleClick(idiom._id)}>
    //   <Card.Img
    //     variant="top"
    //     src={
    //       idiom?.images?.length
    //         ? idiom.images[0]
    //         : "https://via.placeholder.com/160x100"
    //     }
    //   />
    //   <Card.Body>
    //     <Card.Title>{idiom.title}</Card.Title>
    //     <Card.Text>
    //       {idiom.content.length <= 99
    //         ? idiom.content
    //         : idiom.content.slice(0, 99) + "..."}
    //     </Card.Text>
    //   </Card.Body>
    //   <Card.Footer>
    //     <small className="text-muted">
    //       <span className="text-muted">
    //         @{idiom?.author?.name} wrote{" "}
    //         <Moment fromNow>{idiom.createdAt}</Moment>
    //       </span>
    //     </small>
    //     <Button variant="primary" onClick={() => handleClickLike()}>
    //       Like
    //     </Button>
    //   </Card.Footer>
    // </Card>
    <li className="list-group-item" width="100%">
      <div className="card-idiom">
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
        <div className="media-body d-flex flex-column align-items-start justify-content-around mt-2">
          <h5 className="mt-0 d-flex align-items-start font">
            <strong>
              <i>"{idiom.title}"</i>
            </strong>
          </h5>
          <span>
            <p>
              Meaning:
              {idiom.content.length <= 99
                ? idiom.content
                : idiom.content.slice(0, 99) + "..."}
            </p>
            <div className="content-footer d-flex align-items-start"></div>
          </span>
          <div
            className="d-flex align-items-start style-login mr-2"
            style={{ "font-size": "13px" }}
          >
            <span className="mr-2">
              Last update: <Moment fromNow>{idiom.createdAt}</Moment>
            </span>
            <span className="mr-2">@{idiom?.author?.name} wrote </span>
          </div>
          <Button variant="primary" onClick={() => handleClickLike()}>
            Like
          </Button>
        </div>
      </div>
    </li>
  );
};

export default IdiomCard;
