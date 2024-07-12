import { Card, Col, Container, Row } from "react-bootstrap";

const DashboardPageHome = () => {
  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h3>Dashboard</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>Welocome to Inventory</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPageHome;
