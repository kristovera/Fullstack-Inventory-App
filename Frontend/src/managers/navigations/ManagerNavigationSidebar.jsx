
import PermissionSettingMenu from "../../permissions/settings/PermissionSettingMenu";
import RoleSettingMenu from "../../roles/setttings/RoleSettingMenu";
import UserSettingMenu from "../../users/settings/UserSettingMenu";
import DeptSettingMenu from "../../depts/settings/DeptSettingMenu";
import ItemSettingMenu from "../../items/settings/ItemSettingMenu";
import SupplierSettingMenu from "../../suppliers/settings/SupplierSettingMenu";

import { NavLink } from "react-bootstrap";
import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import MintaSettingMenu from "../../requests/settings/MintaSettingMenu";
import AccSettingMenu from "../../accepts/settings/AccSettingMenu";




const ManagerNavigationSidebar = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Master Data</span>
          </h6>
          <ul className="nav flex-column mb-auto">
          <ItemSettingMenu/>
            <DeptSettingMenu />
            <SupplierSettingMenu />
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Transaksi</span>
          </h6>
          <ul className="nav flex-column mb-auto">
          <MintaSettingMenu />
          <AccSettingMenu/>
          
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>User Management</span>
          </h6>
        
          <ul className="nav flex-column mb-auto">
            <PermissionSettingMenu />
            <RoleSettingMenu />
          
            <UserSettingMenu />
          </ul>

    

          <ul className="nav flex-column mb-auto">
          
            <li className="nav-item">
              <NavLink
                className="nav-link d-flex align-items-center gap-2"
                onClick={() => {
                  context.auth.signOut();
                }}
              >
              
                Sign out
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagerNavigationSidebar;
