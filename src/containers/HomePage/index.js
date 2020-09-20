import React, { useState, useEffect } from "react";
import {
  Container,
  CardColumns,
  Jumbotron,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../redux/actions";
import BlogCard from "../../components/BlogCard";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import PaginationItem from "../../components/PaginationItem";
import { Carousel } from "react-bootstrap";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //Carousel
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //
  useEffect(() => {
    dispatch(blogActions.blogsRequest(pageNum));
  }, [dispatch, pageNum]);

  // const handleClickOnBlog = (id) => {
  //   history.push(`/blogs/${id}`);
  // };

  return (
    <>
      <Container>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/5282392/pexels-photo-5282392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="First slide"
            />
            <Carousel.Caption>
              {isAuthenticated && (
                <Link to="/blogs/add">
                  <div variant="primary">
                    <div id="main">
                      <div class="container">
                        <div class="row">
                          <div class="block col-md-2">
                            <a href="#" class="btn-con btn-con-1 color-green">
                              <svg>
                                <rect
                                  x="0"
                                  y="0"
                                  fill="none"
                                  width="100%"
                                  height="100%"
                                />
                              </svg>
                              Contribute
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/5282392/pexels-photo-5282392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/5282392/pexels-photo-5282392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* <Jumbotron className="text-center"></Jumbotron> */}
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        ) : (
          <>
            {blogs.length ? (
              <>
                <CardColumns>
                  {blogs.map((blog) => (
                    <BlogCard
                      blog={blog}
                      key={blog._id}
                      // handleClick={handleClickOnBlog}
                    />
                  ))}
                </CardColumns>
              </>
            ) : (
              <p>There are no blogs</p>
            )}
          </>
        )}
        <PaginationItem
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          loading={loading}
        />
      </Container>
    </>
  );
};

export default HomePage;
