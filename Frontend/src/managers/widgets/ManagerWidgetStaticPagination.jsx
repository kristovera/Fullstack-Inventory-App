import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

const ManagerWidgetStaticPagination = ({ staticPagination }) => {
  return (
    <>
      <Pagination>
        <Pagination.Prev
          disabled={!staticPagination.hasPrev()}
          onClick={staticPagination.onPrev}
        />
        <Pagination.Next
          disabled={!staticPagination.hasNext()}
          onClick={staticPagination.onNext}
        />
      </Pagination>
    </>
  );
};

ManagerWidgetStaticPagination.propTypes = {
  staticPagination: PropTypes.object,
};

export default ManagerWidgetStaticPagination;
