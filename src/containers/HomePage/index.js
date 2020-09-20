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
import { idiomActions } from "../../redux/actions";
import IdiomCard from "../../components/IdiomCard";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import PaginationItem from "../../components/PaginationItem";
import { Carousel } from "react-bootstrap";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.idiom.loading);
  const idioms = useSelector((state) => state.idiom.idioms);
  const totalPageNum = useSelector((state) => state.idiom.totalPageNum);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //Carousel
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //
  useEffect(() => {
    dispatch(idiomActions.idiomsRequest(pageNum));
  }, [dispatch, pageNum]);

  // const handleClickOnIdiom = (id) => {
  //   history.push(`/idioms/${id}`);
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
                <Link to="/idioms/add">
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
            {idioms.length ? (
              <>
                <CardColumns>
                  {idioms.map((idiom) => (
                    <IdiomCard
                      idiom={idiom}
                      key={idiom._id}
                      // handleClick={handleClickOnIdiom}
                    />
                  ))}
                </CardColumns>
              </>
            ) : (
              <p>There are no idioms</p>
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
