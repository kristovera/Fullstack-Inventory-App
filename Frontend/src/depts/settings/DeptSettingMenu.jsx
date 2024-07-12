import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import { CREATE_DEPTS, READ_DEPTS} from "../states/constants";
import { NavLink } from "react-bootstrap";

const DeptSettingMenu = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <ManagerWidgetRBAC
      context={context}
      permissions={[READ_DEPTS, CREATE_DEPTS]}
      or={true}
    >
      <li className="nav-item">
        <ManagerWidgetRBAC context={context} permissions={[READ_DEPTS]}>
          <NavLink className="d-flex align-items-center" href="#depts">
            Departemen
          </NavLink>
        </ManagerWidgetRBAC>
      </li>
    </ManagerWidgetRBAC>
  );
};

export default DeptSettingMenu;
