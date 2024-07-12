import useAuth from "./utils/hooks/useAuth.jsx";
import { UtilStateContextBase } from "./utils/states/contexts";
import { HashRouter, Route, Routes } from "react-router-dom";
import PermissionSettingRouter from "./permissions/settings/PermissionSettingRouter.jsx";
import RoleSettingRouter from "./roles/setttings/RoleSettingRouter.jsx";
import UserSettingRouter from "./users/settings/UserSettingRouter.jsx";
import DashboardSettingRouter from "./dashboards/settings/DashboardSettingRouter.jsx";
import ItemSettingRouter from "./items/settings/ItemSettingRouter.jsx";
import DeptSettingRouter from "./depts/settings/DeptSettingRouter.jsx";
import SupplierSettingRouter from "./suppliers/settings/SupplierSettingRouter.jsx";
import MintaSettingRouter from "./requests/settings/MintaSettingRouter.jsx";
import AccSettingRouter from "./accepts/settings/AccSettingRouter.jsx";


function App() {
  const auth = useAuth();

  return (
    <UtilStateContextBase.Provider value={{ auth }}>
      <HashRouter>
        <Routes>
          <Route path={"/*"} element={<DashboardSettingRouter />} />
          <Route
            path={"/permissions/*"}
            element={<PermissionSettingRouter />}
          />
          <Route path={"/roles/*"} element={<RoleSettingRouter />} />
          <Route path={"/users/*"} element={<UserSettingRouter />} />
          <Route path={"/items/*"} element={<ItemSettingRouter/>} />
          <Route path={"/depts/*"} element={<DeptSettingRouter/>} />
          <Route path={"/suppliers/*"} element={<SupplierSettingRouter/>} />
          <Route path={"/requests/*"} element={<MintaSettingRouter/>} />
          <Route path={"/accepts/*"} element={<AccSettingRouter/>} />
         
        </Routes>
      </HashRouter>
    </UtilStateContextBase.Provider>
  );
}

export default App;
