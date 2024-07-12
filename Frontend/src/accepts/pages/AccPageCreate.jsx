import { useNavigate } from "react-router-dom";
import useCreate from "../../utils/hooks/useCreate";
import {
  ACCEPT_DATA_INIT,
  ACCEPT_FIELD_GUIDE,
  ACCEPT_FIELD_VALIDATION
} from "../states/constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetAction from "../../managers/widgets/ManagerWidgetAction";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import ItemWidgetChoice from "../../items/widgets/ItemWidgetChoice";
import useAutoIncrement from "../../utils/hooks/useAutoIncrement";
import AccWidgetItemList from "../widgets/AccWidgetItemList";
import { useEffect } from "react";
import SuppWidgetGetByKode from "../../suppliers/widgets/SuppWidgetGetByKode";

const AccPageCreate = () => {
  const navigate = useNavigate();
  const accCreate = useCreate(
    ["accepts"],
    ACCEPT_DATA_INIT,
    ACCEPT_FIELD_GUIDE,
    ACCEPT_FIELD_VALIDATION
  );

  const autoIncrement = useAutoIncrement(['accepts', 'autoincrement']);

  useEffect(() => {
    autoIncrement.getKode().then((data) => {
      accCreate.setState((values) => ({...values, no_acc: data.kode}))
    })
  }, [])
  


  return (
    <>
      <Container className="mt-4">
        <ManagerWidgetTitle title={"New Data"} />
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
            
                <Row>
                  <Col>
                  <Form.Group className="mb-3">
                  <Form.Label>No Penerima</Form.Label>
                  <Form.Control
                    name="no_acc"
                    type="text"
                    required
                    minLength={3}
                    value={accCreate.state.no_acc}
                    onChange={accCreate.input.handler}
                  />

                    <ManagerWidgetGuide
                        guide={accCreate.guide}
                        field={"no_acc"}
                      />
                      <ManagerWidgetValidation
                        messages={accCreate.validation.get("no_acc")}
                      />
                
                </Form.Group>
                  </Col>
                  <Col>
                  <SuppWidgetGetByKode callback={(suppliers) => {
                    accCreate.setState((values) => ({...values, suppliers }));
                  }} />
                  </Col>
                 
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <ItemWidgetChoice
              callback={(item) => {
                const productSet = [...accCreate.state.products].map(
                  (value) => value._id
                );
                const products = [...accCreate.state.products];

                if (productSet.includes(item._id)) {
                  let index = products.findIndex(
                    (value) => value._id === item._id
                  );
                  let product = products[index];
                  if (item.stock_item > product.qty) {
                   product.qty += 1;
                    products[index] = product;
                  }
                } else {
                  products.push({
                    ...item,
                    qty: 1,
                  });
                }

                accCreate.setState((values) => ({
                  ...values,
                  products,
                }));
              }}
            />
          </Col>
          <Col>
            <AccWidgetItemList
              //create={reqCreate}
              products={accCreate.state.products}
              callback={(product, index) => {
                const products = [...accCreate.state.products];
                products.splice(index, 1);
                accCreate.setState((values) => ({ ...values,  products}));
              }}
            />
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
              accCreate.onCreate().then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default AccPageCreate;
