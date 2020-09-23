import React, { useState, useEffect } from "react";
import "./style.css";
import SearchItem from "../../components/SearchItem";
import { Container, CardColumns, Button, Row, Col } from "react-bootstrap";
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
  const user = useSelector((state) => state.auth.user);
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredIdioms, setFilteredIdioms] = useState([]);

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  useEffect(() => {
    dispatch(idiomActions.idiomsRequest(pageNum));
  }, [dispatch, pageNum]);

  //Search idioms
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setPageNum(1);
    setQuery(searchInput);
  };

  useEffect(() => {
    setFilteredIdioms(idioms);
  }, [idioms]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
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
              // handleClick={handleClickOnIdiom}
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
          <div class="container pt-5 hero">
            <div class="row align-items-center text-center text-md-left">
              <div class="col-lg-4">
                <h1 class="mb-3 display-3">Tell Your Story to the World</h1>
                <p>
                  Join with us! Login or Register. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Delectus, ex!
                </p>
                {isAuthenticated && (
                  <div>
                    <div>
                      <Link to="/idioms/add">
                        <div variant="primary">
                          <div id="main">
                            <div class="container">
                              <div class="row">
                                <div class="block col-md-2">
                                  <a
                                    href="#"
                                    class="btn-con btn-con-1 color-green"
                                  >
                                    <Button variant="warning">
                                      Contribute
                                    </Button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div></div>
                    <Row>
                      <Col md={4}>
                        <SearchItem
                          searchInput={searchInput}
                          handleInputChange={handleInputChange}
                          handleSubmit={handleSubmitSearch}
                          loading={loading}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
              <div class="col-lg-8">
                <img src="home.png" alt="Image" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        ) : (
          <>
            {idioms.length ? (
              <>{renderIdioms((user && user.favoriteWords) || [])}</>
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
