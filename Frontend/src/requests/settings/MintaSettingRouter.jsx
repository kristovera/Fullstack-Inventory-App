import { useContext, useEffect } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import useAPI from "../../utils/hooks/useAPI";
import useAccess from "../../utils/hooks/useAccess";
import { Route, Routes } from "react-router-dom";
import { CREATE_REQUESTS, READ_REQUESTS, UPDATE_REQUESTS } from "../states/constants";
import ManagerWidgetLayoutProtected from "../../managers/widgets/ManagerWidgetLayoutProtected";
import MintaPageList from "../pages/MintaPageList";
import ManagerPage403 from "../../managers/pages/ManagerPage403";
import ManagerPage404 from "../../managers/pages/ManagerPage404";
import { READ_ITEMS } from "../../items/states/constants";
import MintaPageCreate from "../pages/MintaPageCreate";


const MintaSettingRouter = () => {
  const context = useContext(UtilStateContextBase);
  const api = useAPI();
  const access = useAccess(context, api);

  useEffect(() => {
    access.verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.auth.isAuthenticated]);

  return (
    <Routes>
      <Route
        index
        element={
          access.has(
            [READ_REQUESTS],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <MintaPageList />
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
            [CREATE_REQUESTS, READ_ITEMS],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <MintaPageCreate />
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

export default MintaSettingRouter;
