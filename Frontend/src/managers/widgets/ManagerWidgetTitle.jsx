import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";

const ManagerWidgetTitle = ({ children, title="Untitled" }) => {
  return (
    <Row className="mb-3">
      <Col className="d-flex justify-content-between">
        <h4>{title}</h4>
        {children}
      </Col>
    </Row>
  )
}

ManagerWidgetTitle.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
}

export default ManagerWidgetTitle