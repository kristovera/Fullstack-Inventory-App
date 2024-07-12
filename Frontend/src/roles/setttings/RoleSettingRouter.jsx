import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import useAPI from "../../utils/hooks/useAPI.jsx";
import { UtilStateContextBase } from "../../utils/states/contexts.jsx";
import useAccess from "../../utils/hooks/useAccess.jsx";
import RolePageList from "../pages/RolePageList.jsx";
import ManagerPage403 from "../../managers/pages/ManagerPage403.jsx";
import RolePageCreate from "../pages/RolePageCreate.jsx";
import RolePageUpdate from "../pages/RolePageUpdate.jsx";
import RolePageDelete from "../pages/RolePageDelete.jsx";
import ManagerWidgetLayoutProtected from "../../managers/widgets/ManagerWidgetLayoutProtected.jsx";
import ManagerPage404 from "../../managers/pages/ManagerPage404.jsx";

const RoleSettingRouter = () => {
  const context = useContext(UtilStateContextBase);
  const api = useAPI();
  const access = useAccess(context, api);

  useEffect(() => {
    console.log("RoleSettingRouter");
    access.verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.auth.isAuthenticated]);

  return (
    <Routes>
      <Route
        index
        element={
          access.has(
            ["read-roles"],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <RolePageList />
            </ManagerWidgetLayoutProtected>
          ) : (
            <ManagerWidgetLayoutProtected>
              <ManagerPage403 />
            </ManagerWidgetLayoutProtected>
          )
        }
      />
      <Route
        path="new"
        element={
          access.has(
            ["create-roles", "read-permissions"],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <RolePageCreate />
            </ManagerWidgetLayoutProtected>
          ) : (
            <ManagerWidgetLayoutProtected>
              <ManagerPage403 />
            </ManagerWidgetLayoutProtected>
          )
        }
      />
      <Route
        path="update/:id"
        element={
          access.has(
            ["update-roles", "read-permissions"],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <RolePageUpdate />
            </ManagerWidgetLayoutProtected>
          ) : (
            <ManagerWidgetLayoutProtected>
              <ManagerPage403 />
            </ManagerWidgetLayoutProtected>
          )
        }
      />
      <Route
        path="delete/:id"
        element={
          access.has(
            ["delete-roles", "read-permissions"],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <RolePageDelete />
            </ManagerWidgetLayoutProtected>
          ) : (
            <ManagerWidgetLayoutProtected>
              <ManagerPage403 />
            </ManagerWidgetLayoutProtected>
          )
        }
      />

      <Route
        path="*"
        element={
          <ManagerWidgetLayoutProtected>
            <ManagerPage404 />
          </ManagerWidgetLayoutProtected>
        }
      />
    </Routes>
  );
};

export default RoleSettingRouter;
