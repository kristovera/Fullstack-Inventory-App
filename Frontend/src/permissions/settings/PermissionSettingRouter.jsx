
import {Route, Routes} from "react-router-dom";
import {useContext, useEffect} from "react";
import useAPI from "../../utils/hooks/useAPI.jsx";
import {UtilStateContextBase} from "../../utils/states/contexts.jsx";
import useAccess from "../../utils/hooks/useAccess.jsx";
import ManagerPage403 from "../../managers/pages/ManagerPage403.jsx";
import PermissionPageList from "../pages/PermissionPageList.jsx";
import PermissionPageCreate from "../pages/PermissionPageCreate.jsx";
import ManagerWidgetLayoutProtected from "../../managers/widgets/ManagerWidgetLayoutProtected.jsx";
import ManagerPage404 from "../../managers/pages/ManagerPage404.jsx";

const PermissionSettingRouter = () => {
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
      <Route index element={
        access.has(['read-permissions'], context.auth.superuser, context.auth.accessList) ?(
          <ManagerWidgetLayoutProtected>
            <PermissionPageList />
          </ManagerWidgetLayoutProtected>
        ) : (
          <ManagerWidgetLayoutProtected>
            <ManagerPage403 />
          </ManagerWidgetLayoutProtected>
        )
      } />
      <Route path="new" element={
        access.has(['create-permissions'], context.auth.superuser, context.auth.accessList) ? (
          <ManagerWidgetLayoutProtected>
            <PermissionPageCreate />
          </ManagerWidgetLayoutProtected>
        ) : (
          <ManagerWidgetLayoutProtected>
            <ManagerPage403 />
          </ManagerWidgetLayoutProtected>
          )
      } />
      <Route path="*" element={
        <ManagerWidgetLayoutProtected>
          <ManagerPage404 />
        </ManagerWidgetLayoutProtected>
      } />
    </Routes>
  )
}

export default PermissionSettingRouter;