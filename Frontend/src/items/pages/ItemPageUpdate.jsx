import { useContext, useEffect } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import { useNavigate, useParams } from "react-router-dom";
import useDetail from "../../utils/hooks/useDetail";
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

const ItemPageUpdate = () => {
  const context = useContext(UtilStateContextBase);
  const navigate = useNavigate();
  const { id } = useParams();
  const itemUpdate = useDetail(
    ["items"],
    ITEM_DATA_INIT,
    ITEM_FIELD_GUIDE,
    ITEM_FIELD_VALIDATION,
  );

  useEffect(() => {
    console.log(id);
    itemUpdate.onGet(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, context.auth.isAuthenticated]);

  return (
    <>
      <Container className="mt-4">
        <ManagerWidgetTitle title={"Update Item"} />
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
                    value={itemUpdate.state.kode_item}
                    readOnly
                  />
                  <ManagerWidgetGuide
                    guide={itemUpdate.guide}
                    field={"kode_item"}
                  />
                  <ManagerWidgetValidation
                    messages={itemUpdate.validation.get("kode_item")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name Item</Form.Label>
                  <Form.Control
                    name="name_item"
                    type="text"
                    required
                    minLength={3}
                    value={itemUpdate.state.name_item}
                    onChange={itemUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={itemUpdate.guide}
                    field={"name_item"}
                  />
                  <ManagerWidgetValidation
                    messages={itemUpdate.validation.get("name_item")}
                  />
                </Form.Group>

              

                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    name="stock_item"
                    type="number"
                    required
                    value={itemUpdate.state.stock_item || ""}
                    onChange={itemUpdate.input.handler}
                  />
                  <ManagerWidgetGuide
                    guide={itemUpdate.guide}
                    field={"stock_item"}
                  />
                  <ManagerWidgetValidation
                    messages={itemUpdate.validation.get("stock_item")}
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
              itemUpdate.onUpdate(id).then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default ItemPageUpdate;
