import React, { useState, useEffect } from "react";
import "./style.css";
import { Container, CardColumns, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { idiomActions } from "../../redux/actions";
import IdiomCard from "../../components/IdiomCard";
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";
import PaginationItem from "../../components/PaginationItem";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.idiom.loading);
  const idioms = useSelector((state) => state.idiom.idioms);
  const totalPageNum = useSelector((state) => state.idiom.totalPageNum);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [filteredIdioms, setFilteredIdioms] = useState([]);

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  useEffect(() => {
    dispatch(idiomActions.idiomsRequest(pageNum));
  }, [dispatch, pageNum]);

  //Search idioms
  // const handleSubmitSearch = (e) => {
  //   e.preventDefault();
  //   setPageNum(1);
  //   setQuery(searchInput);
  // };

  useEffect(() => {
    setFilteredIdioms(idioms);
  }, [idioms]);

  // const handleInputChange = (e) => {
  //   setSearchInput(e.target.value);
  // };
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
          <div className="container pt-5 hero">
            <div className="row align-items-center text-center text-md-left">
              <div className="col-lg-4">
                <h2 className="mb-3 display-3">
                  "The limits of my language mean the limits of my world"
                </h2>
                <p>
                  An idiom is a group of words in current usage having a meaning
                  that is not deducible from those of the individual words.
                </p>
                {isAuthenticated && (
                  <div>
                    <div>
                      <Link to="/idioms/add">
                        <div variant="primary">
                          <div id="main">
                            <div className="container">
                              <div className="row">
                                <div className="block col-md-2">
                                  <div className="btn-con btn-con-1 color-green">
                                    <Button variant="warning">
                                      Contribute
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-lg-8">
                <img src="favicon.png" alt="logo" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
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
                  style={{ width: "20px", height: "20px" }}
                  src="instagram.png"
                  alt="ins"
                ></img>
              </div>
            </li>
            <li className="list-inline-item">
              <div className="btn-floating btn-dribbble mx-1">
                <img
                  style={{ width: "20px", height: "20px" }}
                  src="twitter.png"
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
