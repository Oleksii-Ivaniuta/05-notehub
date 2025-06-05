import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export default function Pagination({
  pageCount,
  setCurrentPage,
  currentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
