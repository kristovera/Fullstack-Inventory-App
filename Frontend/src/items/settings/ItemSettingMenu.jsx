import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import { CREATE_ITEMS,  READ_ITEMS} from "../states/constants";
import { NavLink } from "react-bootstrap";

const ItemSettingMenu = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <ManagerWidgetRBAC
      context={context}
      permissions={[READ_ITEMS, CREATE_ITEMS]}
      or={true}
    >
      <li className="nav-item">
        <ManagerWidgetRBAC context={context} permissions={[READ_ITEMS]}>
          <NavLink className="d-flex align-items-center" href="#items">
            Item
          </NavLink>
        </ManagerWidgetRBAC>
      </li>
    </ManagerWidgetRBAC>
  );
};

export default ItemSettingMenu;
