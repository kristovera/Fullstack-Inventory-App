import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts.jsx";
import { NavLink } from "react-bootstrap";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC.jsx";
import { CREATE_USERS, READ_USERS } from "../states/constants.jsx";
import { READ_ROLES } from "../../roles/states/constants.jsx";

const UserSettingMenu = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <ManagerWidgetRBAC
      context={context}
      permissions={[READ_USERS, CREATE_USERS, READ_ROLES]}
      or={true}
    >
      <li className="nav-item">
        <ManagerWidgetRBAC context={context} permissions={[READ_USERS]}>
          <NavLink className="d-flex align-items-center" href="#users">
            Users
          </NavLink>
        </ManagerWidgetRBAC>
      </li>
    </ManagerWidgetRBAC>
  );
};

export default UserSettingMenu;
