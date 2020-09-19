import React from "react";
import { Card, Button } from "react-bootstrap";
import Moment from "react-moment";
import api from "../redux/api";

const BlogCard = ({ blog }) => {
  const handleClickLike = () => {
    api.get(`/blogs/favorite/${blog._id}`);
  };

  const handleClick = () => {
    api.get(`/blogs/${blog._id}`);
  };

  return (
    <Card onClick={() => handleClick(blog._id)}>
      <Card.Img
        variant="top"
        src={
          blog?.images?.length
            ? blog.images[0]
            : "https://via.placeholder.com/160x100"
        }
      />
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>
          {blog.content.length <= 99
            ? blog.content
            : blog.content.slice(0, 99) + "..."}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          <span className="text-muted">
            @{blog?.author?.name} wrote{" "}
            <Moment fromNow>{blog.createdAt}</Moment>
          </span>
        </small>
        <Button variant="primary" onClick={() => handleClickLike()}>
          Like
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
