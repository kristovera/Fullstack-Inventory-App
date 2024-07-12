import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const ManagerPage404 = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>Error 404</Card.Header>
            <Card.Body>
              <Card.Title>Page not Found</Card.Title>
              <Card.Text>
                The page you are looking for is not available
              </Card.Text>
              <Button onClick={() => navigate(-1)} variant="primary">
                Back to App
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManagerPage404;
