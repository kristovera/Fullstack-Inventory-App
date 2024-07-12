import { useEffect, useRef, useState } from "react";
import useAPI from "../../utils/hooks/useAPI.jsx";
import {
  UTIL_DATA_INIT_FILTER,
  UTIL_DATA_INIT_PAGINATION,
} from "../../utils/states/constants";
import { Card, Form, Table } from "react-bootstrap";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import ManagerWidgetPagination from "../../managers/widgets/ManagerWidgetPagination";
import PropTypes from "prop-types";

const PermissionWidgetChoice = ({ callback, messageComponent, accessList = [] }) => {
  const api = useAPI();
  const [permissions, setPermissions] = useState([]);
  const [permissionPagination, setPermissionPagination] = useState(
    UTIL_DATA_INIT_PAGINATION
  );
  const permissionFilter = useRef({ ...UTIL_DATA_INIT_FILTER, limit: 5 });

  const onPermissionList = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/permissions`;
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: { ...permissionFilter.current, limit: 100 },
    };

    api.http.get(url, config).then((response) => {
      const { results, ...pagination } = response.data;
      setPermissions(results);
      setPermissionPagination(pagination);
    });
  };

  useEffect(() => {
    onPermissionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupBy = () => {
    const keys = Array.from(new Set(permissions.map((value) => value.model)))
    const result = []
    for (let key of keys) {
      result.push({
        model: key,
        accesses: permissions.filter((value) => value.model === key)
      });
    }

    return result || []
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Permissions</Card.Title>
        {messageComponent ? messageComponent : null}
        <ManagerWidgetFilter
          fields={[
            { value: "model", text: "Model" },
            { value: "access", text: "Access" },
          ]}
          callback={(value) => {
            permissionFilter.current.field = value.field;
            permissionFilter.current.value = value.value;
            permissionFilter.current.page = 1;
            onPermissionList();
          }}
        />
      </Card.Body>
      <Table striped borderless responsive hover>
        <thead>
          <tr>
            <th>Model</th>
            <th colSpan={4}>Access</th>
          </tr>
        </thead>
        <tbody>
          {groupBy().map((value, index) => (
            <tr key={index}>
              <td>{value.model}</td>
              {value.accesses.map((val) => (
              <td key={val._id}>
                <Form.Check
                  inline={true}
                  type="checkbox"
                  checked={accessList.includes(val.access)}
                  onChange={(e) => callback(val, e.target.checked)}
                  label={val.access}
                />
              </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Card.Footer>
        <ManagerWidgetPagination
          pagination={permissionPagination}
          callback={(value) => {
            permissionFilter.current.page = value;
            onPermissionList();
          }}
        />
      </Card.Footer>
    </Card>
  );
};

PermissionWidgetChoice.propTypes = {
  messageComponent: PropTypes.element,
  callback: PropTypes.func,
  accessList: PropTypes.array,
};

export default PermissionWidgetChoice;
