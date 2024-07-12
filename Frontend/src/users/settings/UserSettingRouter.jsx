import {useContext, useEffect} from "react";
import {UtilStateContextBase} from "../../utils/states/contexts.jsx";
import useAPI from "../../utils/hooks/useAPI.jsx";
import useAccess from "../../utils/hooks/useAccess.jsx";
import {Route, Routes} from "react-router-dom";
import UserPageList from "../pages/UserPageList.jsx";
import UserPageCreate from "../pages/UserPageCreate.jsx";
import UserPageUpdate from "../pages/UserPageUpdate.jsx";
import UserPageDelete from "../pages/UserPageDelete.jsx";
import ManagerPage403 from "../../managers/pages/ManagerPage403.jsx";
import ManagerWidgetLayoutProtected from "../../managers/widgets/ManagerWidgetLayoutProtected.jsx";
import ManagerPage404 from "../../managers/pages/ManagerPage404.jsx";

const UserSettingRouter = () => {
  const context = useContext(UtilStateContextBase);
  const api = useAPI();
  const access = useAccess(context, api);

  useEffect(() => {
    console.log('UserSettingRouter')
    access.verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.auth.isAuthenticated]);

  return (
    <Routes>
      <Route index element={
        access.has(['read-users'], context.auth.superuser, context.auth.accessList) ?(
          <ManagerWidgetLayoutProtected>
            <UserPageList />
          </ManagerWidgetLayoutProtected>
        ) : (
          <ManagerWidgetLayoutProtected>
            <ManagerPage403 />
          </ManagerWidgetLayoutProtected>
        )
      } />
      <Route path="new" element={
        access.has(['create-users', 'read-roles'], context.auth.superuser, context.auth.accessList) ? (
          <ManagerWidgetLayoutProtected>
            <UserPageCreate />
          </ManagerWidgetLayoutProtected>
        ) : (
          <ManagerWidgetLayoutProtected>
            <ManagerPage403 />
          </ManagerWidgetLayoutProtected>
        )
      } />
      <Route path="update/:email" element={
        access.has(['update-users', 'read-roles'], context.auth.superuser, context.auth.accessList) ? (
          <ManagerWidgetLayoutProtected>
            <UserPageUpdate />
          </ManagerWidgetLayoutProtected>
        ): (
          <ManagerWidgetLayoutProtected>
            <ManagerPage403 />
          </ManagerWidgetLayoutProtected>
        )
      } />
      <Route path="delete/:email" element={
        access.has(['delete-users', 'read-roles'], context.auth.superuser, context.auth.accessList) ? (
          <ManagerWidgetLayoutProtected>
            <UserPageDelete />
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

export default UserSettingRouter;