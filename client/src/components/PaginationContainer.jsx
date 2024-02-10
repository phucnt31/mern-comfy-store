import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          type="button"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
          className="btn btn-xs sm:btn-md join-item"
        >
          Prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
          className="btn btn-xs sm:btn-md join-item"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
