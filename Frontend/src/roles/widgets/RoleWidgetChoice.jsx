import PropTypes from "prop-types";
import useAPI from "../../utils/hooks/useAPI.jsx";
import { useEffect, useRef, useState } from "react";
import {
  UTIL_DATA_INIT_FILTER,
  UTIL_DATA_INIT_PAGINATION,
} from "../../utils/states/constants";
import { Card, Form, Table } from "react-bootstrap";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import ManagerWidgetPagination from "../../managers/widgets/ManagerWidgetPagination";

const RoleWidgetChoice = ({ callback, messageComponent, roleID = "" }) => {
  const api = useAPI();
  const [roles, setRoles] = useState([]);
  const [rolePagination, setRolePagination] = useState(
    UTIL_DATA_INIT_PAGINATION
  );
  const roleFilter = useRef(UTIL_DATA_INIT_FILTER);

  const onRoleAll = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/roles`;
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: { ...roleFilter.current },
    };
    api.http.get(url, config).then((response) => {
      const { results, ...pagination } = response.data;
      setRoles(results);
      setRolePagination(pagination);
    });
  };

  useEffect(() => {
    onRoleAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Roles</Card.Title>
          {messageComponent ? messageComponent : null}
          <ManagerWidgetFilter
            fields={[{ value: "name", text: "Name" }]}
            callback={(value) => {
              roleFilter.current.field = value.field;
              roleFilter.current.value = value.value;
              roleFilter.current.page = 1;
              onRoleAll();
            }}
          />
        </Card.Body>
        <Table responsive striped borderless>
          <thead>
            <tr>
              <th>Name</th>
              <th>Access List</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((value) => (
              <tr key={value._id}>
                <td>
                  <Form.Check
                    type="radio"
                    name="choice"
                    label={value.name}
                    checked={roleID === value._id}
                    onChange={() => {
                      console.log("TEST", value);
                      callback(value);
                    }}
                  />
                </td>
                <td>
                  <ul className="list-unstyled">
                    {value.accessList.map((access, index) => (
                      <li key={index}>{access}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer>
          <ManagerWidgetPagination
            pagination={rolePagination}
            callback={(value) => {
              roleFilter.current.page = value;
              onRoleAll();
            }}
          />
        </Card.Footer>
      </Card>
    </>
  );
};

RoleWidgetChoice.propTypes = {
  messageComponent: PropTypes.element,
  callback: PropTypes.func,
  roleID: PropTypes.string,
};

export default RoleWidgetChoice;
