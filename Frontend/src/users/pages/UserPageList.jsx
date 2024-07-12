import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  NavLink,
  Row,
  Table,
} from "react-bootstrap";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import ManagerWidgetPagination from "../../managers/widgets/ManagerWidgetPagination";
import useList from "../../utils/hooks/useList.jsx";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC.jsx";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle.jsx";
import { UtilStateContextBase } from "../../utils/states/contexts.jsx";

const UserPageList = () => {
  const context = useContext(UtilStateContextBase);
  const navigate = useNavigate();

  const userList = useList(["users"]);

  useEffect(() => {
    userList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-3">
      <ManagerWidgetTitle title={"Users"}>
        <ManagerWidgetRBAC
          context={context}
          permissions={["create-users", "read-roles"]}
        >
          <Button onClick={() => navigate("new")}>New User</Button>
        </ManagerWidgetRBAC>
      </ManagerWidgetTitle>
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <ManagerWidgetFilter
                fields={[
                  { value: "email", text: "Email" },
                  { value: "firstName", text: "First Name" },
                  { value: "lastName", text: "Last Name" },
                ]}
                callback={({ field, value }) => {
                  userList.filter.current.field = field;
                  userList.filter.current.value = value;
                  userList.filter.current.page = 1;
                  userList.onAll();
                }}
              />
            </Card.Body>
            <Table borderless responsive striped>
              <thead>
                <tr>
                  <th>Fisrt Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Superuser?</th>
                  <th>Active?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList.states.map((value, index) => (
                  <tr key={index}>
                    <td>{value.firstName}</td>
                    <td>{value.lastName}</td>
                    <td>{value.email}</td>
                    <td>
                      <Form.Check disabled defaultChecked={value.isSuperuser} />
                    </td>
                    <td>
                      <Form.Check disabled defaultChecked={value.isActive} />
                    </td>
                    <td>
                      <div className={"d-flex justify-content-start gap-3"}>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={["update-users", "read-roles"]}
                        >
                          <NavLink
                            className="text-secondary"
                            href={`#/users/update/${value.email}`}
                          >
                            edit
                          </NavLink>
                        </ManagerWidgetRBAC>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={["delete-users", "read-roles"]}
                        >
                          <NavLink
                            className="text-secondary"
                            href={`#/users/delete/${value.email}`}
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
                pagination={userList.pagination}
                callback={(value) => {
                  userList.filter.current.page = value;
                  userList.onAll();
                }}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPageList;
