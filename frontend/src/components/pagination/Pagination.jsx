import ReactPaginate from "react-paginate";

import './Pagination.css'

const MyComponent = ({setPageNumber,totalPages}) => {



    return (
        <ReactPaginate
            className="pagination justify-content-center text-primary w-100 gap-4 my-4"
            pageCount={totalPages}
            nextLabel="Next"
            previousLabel="Prev"
            nextClassName="btn btn-dark bg-dark text-bg-dark"
            previousClassName="btn btn-dark bg-dark text-bg-dark "
            pageClassName="page-item"
            pageLinkClassName="page-link link-success text-bg-dark rounded border-dark"
            onPageChange={
                (data) => {
                    setPageNumber(data.selected + 1);
                }
            }
            activeClassName="active"
        />
    );
};


export default MyComponent;

