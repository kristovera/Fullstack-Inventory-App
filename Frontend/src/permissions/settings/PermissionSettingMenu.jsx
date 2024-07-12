import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts.jsx";
import { NavLink } from "react-bootstrap";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC.jsx";
import { CREATE_PERMISSIONS, READ_PERMISSIONS } from "../states/constants.jsx";

const PermissionSettingMenu = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <ManagerWidgetRBAC
      context={context}
      permissions={[READ_PERMISSIONS, CREATE_PERMISSIONS]}
      or={true}
    >
      <li className="nav-item">
        <ManagerWidgetRBAC context={context} permissions={[READ_PERMISSIONS]}>
          <NavLink className="d-flex align-items-center" href="#permissions">
            Permissions
          </NavLink>
        </ManagerWidgetRBAC>
      </li>
    </ManagerWidgetRBAC>
  );
};

export default PermissionSettingMenu;
