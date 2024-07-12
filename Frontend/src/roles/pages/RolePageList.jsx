import { useContext, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  NavLink,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import ManagerWidgetPagination from "../../managers/widgets/ManagerWidgetPagination";
import useList from "../../utils/hooks/useList.jsx";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle.jsx";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC.jsx";
import { UtilStateContextBase } from "../../utils/states/contexts.jsx";

const RolePageList = () => {
  const context = useContext(UtilStateContextBase);
  const navigate = useNavigate();
  const roleList = useList(["roles"]);

  useEffect(() => {
    roleList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-3">
      <ManagerWidgetTitle title={"Roles"}>
        <ManagerWidgetRBAC
          context={context}
          permissions={["create-roles", "read-permissions"]}
        >
          <Button onClick={() => navigate("new")}>New Role</Button>
        </ManagerWidgetRBAC>
      </ManagerWidgetTitle>
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <ManagerWidgetFilter
                fields={[{ value: "name", text: "Name" }]}
                callback={(value) => {
                  roleList.filter.current.field = value.field;
                  roleList.filter.current.value = value.value;
                  roleList.filter.current.page = 1;
                  roleList.onAll();
                }}
              />
            </Card.Body>
            <Table striped borderless responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Access List</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roleList.states.map((value) => (
                  <tr key={value._id}>
                    <td>{value.name}</td>
                    <td>{value.accessList.join(", ")}</td>
                    <td>
                      <div className={"d-flex justify-content-start gap-3"}>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={["update-roles", "read-permissions"]}
                        >
                          <NavLink
                            className="text-secondary"
                            href={`#/roles/update/${value._id}`}
                          >
                            edit
                          </NavLink>
                        </ManagerWidgetRBAC>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={["delete-roles", "read-permissions"]}
                        >
                          <NavLink
                            className="text-secondary"
                            href={`#/roles/delete/${value._id}`}
                          >
                            delete
                          </NavLink>
                        </ManagerWidgetRBAC>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Card.Footer>
              <ManagerWidgetPagination
                pagination={roleList.pagination}
                callback={(value) => {
                  roleList.filter.current.page = value;
                  roleList.onAll();
                }}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RolePageList;
