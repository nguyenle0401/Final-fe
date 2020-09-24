import React, { useState, useEffect } from "react";
import "./style.css";
import SearchItem from "../../../components/SearchItem";
import PaginationItem from "../../../components/PaginationItem";
import { useSelector, useDispatch } from "react-redux";
import { idiomActions } from "../../../redux/actions";
import { Button, Row, Col, Container, Table, FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { authActions } from "../../../redux/actions/auth.actions";

const IdiomListPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [myFavorIdioms, setmyFavorIdioms] = useState(false);
  const [sortBy, setSortBy] = useState({ key: "", ascending: -1 });
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.idiom.loading);
  const idioms = useSelector((state) => state.idiom.idioms);
  const [filteredIdioms, setFilteredIdioms] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const totalPageNum = useSelector((state) => state.idiom.totalPageNum);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setPageNum(1);
    setQuery(searchInput);
  };

  const handleSort = (key) => {
    if (!loading) {
      setSortBy((sortBy) => ({
        key,
        ascending: -sortBy.ascending,
      }));
    }
  };

  const handleFavorIdioms = () => {
    if (myFavorIdioms) {
      setFilteredIdioms(idioms);
      setmyFavorIdioms(false);
    } else {
      dispatch(authActions.getCurrentUser());
      setFilteredIdioms(currentUser.favoriteWords);
      setmyFavorIdioms(true);
    }
  };

  useEffect(() => {
    console.log(pageNum, 10, query, currentUser._id, sortBy);
    dispatch(
      idiomActions.idiomsRequest(pageNum, 10, query, currentUser._id, sortBy)
    );
  }, [dispatch, pageNum, query, sortBy, currentUser._id]);

  useEffect(() => {
    setFilteredIdioms(idioms);
  }, [idioms]);

  return (
    <Container fluid>
      <h4 className="mt-3" style={{ fontWeight: "bold" }}>
        Idioms Manage
      </h4>
      <Row>
        <Col md={4}>
          <SearchItem
            className="color-btn"
            searchInput={searchInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmitSearch}
            loading={loading}
          />
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-start">
          <FormCheck
            type="checkbox"
            label="My Favorite Idioms"
            checked={myFavorIdioms}
            onChange={handleFavorIdioms}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="mouse-hover" onClick={() => handleSort("title")}>
                  Word <FontAwesomeIcon icon="sort" size="sm" />
                </th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIdioms.map((idiom) => (
                <tr key={idiom._id}>
                  <td>
                    <strong>
                      <p to={`/admin/idioms/${idiom._id}`}>{idiom.title}</p>
                    </strong>
                  </td>
                  <td>{idiom.content}</td>

                  <td>
                    {currentUser?._id === idiom?.author?._id ? (
                      <Link to={`/admin/idioms/edit/${idiom._id}`}>
                        <Button className="color-btn">
                          <FontAwesomeIcon icon="edit" size="1x" /> Edit
                        </Button>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <PaginationItem
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
            loading={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default IdiomListPage;
