import { useNavigate, useParams } from "react-router-dom";
import useDetail from "../../utils/hooks/useDetail.jsx";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle.jsx";
import { useEffect } from "react";
import { USER_DATA_INIT } from "../states/constants.jsx";

const UserPageDelete = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const userDelete = useDetail(["users"], USER_DATA_INIT);

  useEffect(() => {
    userDelete.onGet(email);
  }, [email]);

  return (
    <>
      <Container className="mt-3">
        <ManagerWidgetTitle title={"Delete User"} />

        <Row className={"mb-3"}>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{userDelete.state.email}</Card.Title>
                <Card.Text>
                  Are you sure you want to delete this data?
                </Card.Text>
                <Button
                  onClick={() => navigate("../")}
                  variant={"outline-dark"}
                  className={"me-2"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    userDelete.onDelete(email).then(() => navigate("../"));
                  }}
                  variant={"outline-danger"}
                >
                  Yes, Sure!
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserPageDelete;
