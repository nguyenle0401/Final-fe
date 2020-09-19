import React, { useState, useEffect } from "react";
import SearchItem from "../../../components/SearchItem";
import PaginationItem from "../../../components/PaginationItem";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../../redux/actions";
import { Button, Row, Col, Container, Table, FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { authActions } from "../../../redux/actions/auth.actions";

const BlogListPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [myFavorWords, setmyFavorWords] = useState(false);
  const [sortBy, setSortBy] = useState({ key: "", ascending: -1 });
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);

  console.log(currentUser);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setPageNum(1);
    setQuery(searchInput);
    // dispatch(blogActions.blogsRequest(1));
  };

  const handleSort = (key) => {
    if (!loading) {
      setSortBy((sortBy) => ({
        key,
        ascending: -sortBy.ascending,
      }));
    }
  };

  const handleFavorWords = () => {
    if (myFavorWords) {
      setFilteredBlogs(blogs);
      setmyFavorWords(false);
    } else {
      dispatch(authActions.getCurrentUser());
      setFilteredBlogs(currentUser.favoriteWords);
      setmyFavorWords(true);
    }
  };

  useEffect(() => {
    dispatch(blogActions.blogsRequest(pageNum, 10, query, sortBy));
  }, [dispatch, pageNum, query, sortBy]);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  return (
    <Container fluid>
      <h4 className="mt-3">Blog Manage</h4>
      <Row>
        <Col md={4}>
          <SearchItem
            searchInput={searchInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmitSearch}
            loading={loading}
          />
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-start">
          <FormCheck
            type="checkbox"
            label="My Favorite Word"
            checked={myFavorWords}
            onChange={handleFavorWords}
          />
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-start">
          <Link className="btn btn-primary" to="/admin/blog/add">
            <FontAwesomeIcon icon="plus" size="1x" /> Add
          </Link>
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
              {filteredBlogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <Link to={`/admin/blogs/${blog._id}`}>{blog.title}</Link>
                  </td>
                  <td>{blog.content}</td>

                  <td>
                    {currentUser?._id === blog?.author?._id ? (
                      <Link to={`/admin/blogs/edit/${blog._id}`}>
                        <Button variant="primary">
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

export default BlogListPage;
