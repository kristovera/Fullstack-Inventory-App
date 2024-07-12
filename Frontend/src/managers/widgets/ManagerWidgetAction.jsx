import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function ManagerWidgetAction({ children }) {
  return (
    <Navbar expand="lg" fixed="bottom" className="bg-body-tertiary ">
      <Container className="d-flex justify-content-end align-items-center gap-3">
        <Row>
          <Col className="d-flex justify-content-end gap-3">{children}</Col>
        </Row>
      </Container>
    </Navbar>
  );
}

ManagerWidgetAction.propTypes = {
  children: PropTypes.element,
};

export default ManagerWidgetAction;
