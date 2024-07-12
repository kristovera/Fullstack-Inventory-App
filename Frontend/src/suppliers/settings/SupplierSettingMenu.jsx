import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import { CREATE_SUPPLIERS,READ_SUPPLIERS} from "../states/constants";
import { NavLink } from "react-bootstrap";

const SupplierSettingMenu = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <ManagerWidgetRBAC
      context={context}
      permissions={[READ_SUPPLIERS, CREATE_SUPPLIERS]}
      or={true}
    >
      <li className="nav-item">
        <ManagerWidgetRBAC context={context} permissions={[READ_SUPPLIERS]}>
          <NavLink className="d-flex align-items-center" href="#suppliers">
            Supplier
          </NavLink>
        </ManagerWidgetRBAC>
      </li>
    </ManagerWidgetRBAC>
  );
};

export default SupplierSettingMenu;
