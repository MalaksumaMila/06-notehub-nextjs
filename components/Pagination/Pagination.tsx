import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
}
export default function Pagination({
  page,
  setPage,
  pageCount,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
