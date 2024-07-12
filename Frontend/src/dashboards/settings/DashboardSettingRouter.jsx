import {useContext, useEffect} from "react";
import {UtilStateContextBase} from "../../utils/states/contexts.jsx";
import useAPI from "../../utils/hooks/useAPI.jsx";
import useAccess from "../../utils/hooks/useAccess.jsx";
import {Route, Routes} from "react-router-dom";
import DashboardPageHome from "../pages/DashboardPageHome.jsx";
import ManagerWidgetLayoutProtected from "../../managers/widgets/ManagerWidgetLayoutProtected.jsx";
import ManagerPage404 from "../../managers/pages/ManagerPage404.jsx";

const DashboardSettingRouter = () => {
  const context = useContext(UtilStateContextBase);
  const api = useAPI();
  const access = useAccess(context, api);

  useEffect(() => {
    console.log('PermissionSettingRouter')
    access.verify()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [context.auth.isAuthenticated]);

  return (
    <Routes>
      <Route index={true} element={
        <ManagerWidgetLayoutProtected>
          <DashboardPageHome />
        </ManagerWidgetLayoutProtected>
      } />

      <Route path="*" element={
        <ManagerWidgetLayoutProtected>
          <ManagerPage404 />
        </ManagerWidgetLayoutProtected>
      } />
    </Routes>
  )
}

export default DashboardSettingRouter;