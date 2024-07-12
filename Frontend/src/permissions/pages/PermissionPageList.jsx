import {useContext, useEffect} from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import ManagerWidgetPagination from "../../managers/widgets/ManagerWidgetPagination";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import { useNavigate } from "react-router-dom";
import useList from "../../utils/hooks/useList.jsx";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC.jsx";
import {UtilStateContextBase} from "../../utils/states/contexts.jsx";
import {AiFillLock} from "react-icons/ai";

const PermissionPageList = () => {
  const context = useContext(UtilStateContextBase);
  const navigate = useNavigate();
  const permissionList = useList(["permissions"]);

  useEffect(() => {
    permissionList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row className="mb-3">
        <Col className="d-flex justify-content-between">
          <h4>Permissions</h4>
          <ManagerWidgetRBAC context={context} permissions={['create-permissions']} >
            <Button onClick={() => navigate("new")}>New Permissions</Button>
          </ManagerWidgetRBAC>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <ManagerWidgetFilter
                fields={[
                  { value: "model", text: "Model" },
                  { value: "access", text: "Access" },
                ]}
                callback={(value) => {
                  permissionList.filter.current.field = value.field;
                  permissionList.filter.current.value = value.value;
                  permissionList.filter.current.page = 1;
                  permissionList.onAll();
                }}
              />
            </Card.Body>
            <Table striped responsive hover borderless>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Access</th>
                </tr>
              </thead>
              <tbody>
                {permissionList.states.map((value) => (
                  <tr key={value._id}>
                    <td>{value.model}</td>
                    <td>{value.access}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Card.Footer>
              <ManagerWidgetPagination
                pagination={permissionList.pagination}
                callback={(value) => {
                  permissionList.filter.current.page = value;
                  permissionList.onAll();
                }}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PermissionPageList;
