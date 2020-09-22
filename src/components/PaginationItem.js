import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const PaginationItem = ({ pageNum, setPageNum, totalPageNum, loading }) => {
  return (
    <Pagination
      size="large"
      count={totalPageNum}
      disabled={loading}
      onChange={(e, p) => setPageNum(p)}
    />
  );
};

export default PaginationItem;
