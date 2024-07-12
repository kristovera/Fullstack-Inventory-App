import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

const ManagerWidgetPagination = ({ pagination, callback }) => {
  return (
    <>
      {pagination && (
        <>
          <Pagination>
            <Pagination.First
              onClick={() => callback(pagination.prev)}
              disabled={!pagination.prev}
            />
            {pagination.ranges.map((page, index) => {
              return page === "..." ? (
                <Pagination.Ellipsis key={index} />
              ) : (
                <Pagination.Item
                  disabled={page === pagination.currentPage}
                  onClick={() => callback(page)}
                  key={index}
                >
                  {page}
                </Pagination.Item>
              );
            })}
            <Pagination.Last
              onClick={() => callback(pagination.next)}
              disabled={!pagination.next}
            />
          </Pagination>
        </>
      )}
    </>
  );
};

ManagerWidgetPagination.propTypes = {
  pagination: PropTypes.object,
  callback: PropTypes.func,
};

export default ManagerWidgetPagination;
