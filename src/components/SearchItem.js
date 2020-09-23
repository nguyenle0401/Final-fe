import React from "react";
import { Form, Button, Col } from "react-bootstrap";

const SearchItem = ({
  searchInput,
  handleInputChange,
  handleSubmit,
  loading,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Control
            id="search-input"
            type="text"
            placeholder="Search.."
            value={searchInput}
            onChange={handleInputChange}
          />
        </Col>
        {loading ? (
          <Button variant="success" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Searching...
          </Button>
        ) : (
          <Button type="submit" className="color-btn">
            Search
          </Button>
        )}
      </Form.Row>
    </Form>
  );
};

export default SearchItem;
