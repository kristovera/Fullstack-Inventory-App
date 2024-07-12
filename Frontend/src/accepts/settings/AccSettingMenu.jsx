import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import { CREATE_ACCEPTS, READ_ACCEPTS} from "../states/constants";
import { NavLink } from "react-bootstrap";

const AccSettingMenu = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <ManagerWidgetRBAC
      context={context}
      permissions={[READ_ACCEPTS, CREATE_ACCEPTS]}
      or={true}
    >
      <li className="nav-item">
        <ManagerWidgetRBAC context={context} permissions={[READ_ACCEPTS]}>
          <NavLink className="d-flex align-items-center" href="#accepts">
            Penerimaan
          </NavLink>
        </ManagerWidgetRBAC>
      </li>
    </ManagerWidgetRBAC>
  );
};

export default AccSettingMenu;
