import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import { CREATE_REQUESTS, READ_REQUESTS } from "../states/constants";
import { NavLink } from "react-bootstrap";

const MintaSettingMenu = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <ManagerWidgetRBAC
      context={context}
      permissions={[READ_REQUESTS, CREATE_REQUESTS]}
      or={true}
    >
      <li className="nav-item">
        <ManagerWidgetRBAC context={context} permissions={[READ_REQUESTS]}>
          <NavLink className="d-flex align-items-center" href="#requests">
            Permintaan
          </NavLink>
        </ManagerWidgetRBAC>
      </li>
    </ManagerWidgetRBAC>
  );
};

export default MintaSettingMenu;
