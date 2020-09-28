import React, { useState, useEffect } from "react";
import "./style.css";
import { Container, CardColumns, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { idiomActions } from "../../redux/actions";
import IdiomCard from "../../components/IdiomCard";
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";
import PaginationItem from "../../components/PaginationItem";
import SearchItem from "./../../components/SearchItem";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.idiom.loading);
  const idioms = useSelector((state) => state.idiom.idioms);
  const totalPageNum = useSelector((state) => state.idiom.totalPageNum);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [filteredIdioms, setFilteredIdioms] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setPageNum(1);
    setQuery(searchInput);
  };

  useEffect(() => {
    setFilteredIdioms(idioms);
  }, [idioms]);

  useEffect(() => {
    dispatch(idiomActions.idiomsRequest(pageNum, 10, query));
  }, [dispatch, query, pageNum]);

  const renderIdioms = (arr) => {
    const favoriteWords = arr.map((e) => e._id);
    return (
      <CardColumns>
        {filteredIdioms.map((idiom) => {
          return (
            <IdiomCard
              liked={favoriteWords.includes(idiom._id)}
              idiom={idiom}
              key={idiom._id}
            />
          );
        })}
      </CardColumns>
    );
  };

  return (
    <>
      <Container>
        <div>
          {" "}
          <div className="container">
            <div>
              <div class="home_background"></div>
              <div class="home_content">
                <div class="container">
                  <div class="row">
                    <div class="col text-center">
                      <h1 class="home_title">Learn Languages Easily</h1>
                      <div>
                        <img
                          alt="logo"
                          src="/favicon.png"
                          style={{ width: "50%" }}
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
                {isAuthenticated && (
                  <div>
                    <div>
                      <Link to="/idioms/add">
                        <div className="container">
                          <div className="row justify-content-center">
                            <div>
                              <Button variant="warning">Contribute</Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div>
                      {" "}
                      <Col
                        md={5}
                        style={{ width: "100%" }}
                        className="container mt-3"
                      >
                        <SearchItem
                          className="row justify-content-center"
                          searchInput={searchInput}
                          handleInputChange={handleInputChange}
                          handleSubmit={handleSubmitSearch}
                          loading={loading}
                        />
                      </Col>
                    </div>
                    <div></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          {loading ? (
            <HashLoader
              color="green"
              size={150}
              loading={loading}
              className="position-absolute justify-content-center"
            />
          ) : (
            <>
              {idioms.length ? (
                <>{renderIdioms((user && user.favoriteWords) || [])}</>
              ) : (
                <p>There are no idioms</p>
              )}
            </>
          )}
        </div>

        <PaginationItem
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          loading={loading}
        />
        <div></div>
      </Container>
      <footer className="page-footer pt-4">
        <div className="container">
          <ul className="list-unstyled list-inline text-center">
            <li className="list-inline-item">
              <div className="btn-floating btn-fb mx-1">
                <img
                  style={{ width: "20px", height: "20px" }}
                  src="facebook.png"
                  alt="fb"
                ></img>
              </div>
            </li>
            <li className="list-inline-item">
              <div className="btn-floating btn-tw mx-1">
                <img
                  href="nle20959@gmail.com"
                  style={{ width: "20px", height: "20px" }}
                  src="gmail.png"
                  alt="ins"
                ></img>
              </div>
            </li>
            <li className="list-inline-item">
              <div className="btn-floating btn-dribbble mx-1">
                <img
                  style={{ width: "20px", height: "20px" }}
                  src="linkedin.png"
                  alt="tw"
                ></img>
              </div>
            </li>
          </ul>
        </div>

        <div className=" text-center py-3">©2020 Odiom All Rights Reserved</div>
      </footer>
    </>
  );
};

export default HomePage;
