import { useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({ handlePageClick }) {
  useEffect(() => {
    const paginateUl = document.querySelector('ul[role="navigation"]');
    if (paginateUl) {
      paginateUl.removeAttribute("role");
    }
  }, []);

  return (
    <nav aria-label="Pagination Navigation" role="navigation">
      <ReactPaginate
        containerTag="ul"
        containerClassName={"flex justify-center gap-5 my-5"}
        pageClassName={"px-2 border-2 border-blue-900 text-blue-700 bg-white"}
        activeClassName={"!bg-blue-500 !text-white"}
        breakLabel={"..."}
        breakClassName={"px-2 border-2 border-blue-900 text-blue-900"}
        nextLabel={">"}
        marginPagesDisplayed={2}
        nextClassName={"px-2 border-2 border-blue-900 text-blue-900"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={500}
        previousLabel={"<"}
        previousClassName={"px-2 border-2 border-blue-900 text-blue-900"}
        renderOnZeroPageCount={null}
        disableInitialCallback={true}
        ariaLabelBuilder={(page) => `Go to page ${page}`}
        activeLinkClassName="aria-current-page"
        pageLinkClassName={"focus:outline-none"}
      />
    </nav>
  );
}
