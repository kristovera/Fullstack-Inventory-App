import { useNavigate } from "react-router-dom";
import useCreate from "../../utils/hooks/useCreate";
import {
  REQUEST_DATA_INIT,
  REQUEST_FIELD_GUIDE,
  REQUEST_FIELD_VALIDATION,
} from "../states/constants";
import { Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetAction from "../../managers/widgets/ManagerWidgetAction";
import ManagerWidgetGuide from "../../managers/widgets/ManagerWidgetGuide";
import ManagerWidgetValidation from "../../managers/widgets/ManagerWidgetValidation";
import ItemWidgetChoice from "../../items/widgets/ItemWidgetChoice";
import useAutoIncrement from "../../utils/hooks/useAutoIncrement";
import MintaWidgetItemList from "../widgets/MintaWidgetItemList";
import { useEffect, useState } from "react";
import DeptWidgetGetByKode from "../../depts/widgets/DeptWidgetGetByKode";

const MintaPageCreate = () => {

  const navigate = useNavigate();
  const reqCreate = useCreate(
    ["requests"],
    REQUEST_DATA_INIT,
    REQUEST_FIELD_GUIDE,
    REQUEST_FIELD_VALIDATION
  );
  

  const autoIncrement = useAutoIncrement(['requests', 'autoincrement']);

  useEffect(() => {
    autoIncrement.getKode().then((data) => {
      reqCreate.setState((values) => ({ ...values, no_req: data.kode }))
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

                    <Form.Group className="mb-3" >
                      <Form.Label>No Permintaan</Form.Label>
                      <Form.Control
                        name="no_req"
                        type="text"
                        required
                        minLength={3}
                        value={reqCreate.state.no_req}
                        onChange={reqCreate.input.handler}
                      />

                      <ManagerWidgetGuide
                        guide={reqCreate.guide}
                        field={"no_req"}
                      />
                      <ManagerWidgetValidation
                        messages={reqCreate.validation.get("no_req")}
                      />

                    </Form.Group>
                  
                  </Col>

                  <Col>
                    <DeptWidgetGetByKode callback={(depts) => {
                      reqCreate.setState((values) => ({ ...values, depts }));
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
                const productSet = [...reqCreate.state.products].map(
                  (value) => value._id
                );
                const products = [...reqCreate.state.products];

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

                reqCreate.setState((values) => ({
                  ...values,
                  products,
                }));
              }}
            />
          </Col>
          <Col>
            <MintaWidgetItemList
              //create={reqCreate}
              products={reqCreate.state.products}
              callback={(product, index) => {
                const products = [...reqCreate.state.products];
                products.splice(index, 1);
                reqCreate.setState((values) => ({ ...values, products }));
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
              reqCreate.onCreate().then(() => navigate("../"));
            }}
          >
            Save
          </Button>
        </>
      </ManagerWidgetAction>
    </>
  );
};

export default MintaPageCreate;
