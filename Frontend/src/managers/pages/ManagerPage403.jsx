import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManagerPage403 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>Error 403</Card.Header>
              <Card.Body>
                <Card.Title>Access Denied</Card.Title>
                <Card.Text>
                  You Do not Have Permission To Access on This Server
                </Card.Text>
                <Button onClick={() => navigate(-1)} variant="primary">
                  Back to App
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManagerPage403;
