import { useNavigate } from "react-router-dom";
import useCreate from "../../utils/hooks/useCreate";
import {
  ITEM_DATA_INIT,
  ITEM_FIELD_GUIDE,
  ITEM_FIELD_VALIDATION,
} from "../states/constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import ManagerWidgetAction from "../../managers/widgets/ManagerWidgetAction";
import useAutoIncrement from "../../utils/hooks/useAutoIncrement";
import { useEffect } from "react";

const ItemPageCreate = () => {
  const navigate = useNavigate();
  const itemCreate = useCreate(
    ["items"],
    ITEM_DATA_INIT,
    ITEM_FIELD_GUIDE,
    ITEM_FIELD_VALIDATION
  );
  const autoIncrement = useAutoIncrement(['items', 'autoincrement']);

  useEffect(() => {
    autoIncrement.getKode().then((data) => {
      itemCreate.setState((values) => ({...values, kode_item: data.kode}))
    })
  }, [])
  return (
    <>
      <Container className="mt-4">
        <ManagerWidgetTitle title={"New Item"} />

        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
              <Form.Group className="mb-3">
                  <Form.Label>Kode Item</Form.Label>
                  <Form.Control
                    name="kode_item"
                    type="text"
                    required
                    minLength={3}
                    value={itemCreate.state.kode_item}
                    onChange={itemCreate.input.handler}
                  />
                
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name Item</Form.Label>
                  <Form.Control
                    name="name_item"
                    type="text"
                    required
                    minLength={3}
                    value={itemCreate.state.name_item}
                    onChange={itemCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={itemCreate.guide}
                    field={"name_item"}
                  />
                  <ManagerWidgetValidation
                    messages={itemCreate.validation.get("name_item")}
                  />
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    name="stock_item"
                    type="number"
                    required
                    value={itemCreate.state.stock_item || ""}
                    onChange={itemCreate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={itemCreate.guide}
                    field={"stock_item"}
                  />
                  <ManagerWidgetValidation
                    messages={itemCreate.validation.get("stock_item")}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <ManagerWidgetAction>
        <>
          <Button variant="outline-dark" onClick={() => navigate("../")}>
            Back
          </Button>

          <Button
            onClick={() => {
              itemCreate.onCreate().then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default ItemPageCreate;
