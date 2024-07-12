import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useCreate from "../../utils/hooks/useCreate.jsx";

const PermissionPageCreate = () => {
  const permissionCreate = useCreate([
    "permissions",
    "generate",
  ]);
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="mb-3">
        <Col className="d-flex justify-content-between">
          <h4>Generate Permissions</h4>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Text>
                Press the button below to generate all permissions based on
                available models/resources.
              </Card.Text>
              <Button
                variant="primary"
                onClick={() =>
                  permissionCreate.onCreate().then(() => navigate("../"))
                }
              >
                Generate Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PermissionPageCreate;
