import PropTypes from "prop-types";
import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts.jsx";
import UserPageSignIn from "../../users/pages/UserPageSignIn.jsx";
import ManagerNavigationSidebar from "../navigations/ManagerNavigationSidebar.jsx";
import ManagerNavigationHeader from "../navigations/ManagerNavigationHeader.jsx";

const ManagerWidgetLayoutProtected = ({ children }) => {
  const context = useContext(UtilStateContextBase);

  return (
    <>
      {context.auth.isAuthenticated ? (
        <>
          <ManagerNavigationHeader />
          <div className="container-fluid">
            <div className="row">
              <ManagerNavigationSidebar />
              <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {children}
              </main>
            </div>
          </div>
        </>
      ) : (
        <UserPageSignIn />
      )}
    </>
  );
};

ManagerWidgetLayoutProtected.propTypes = {
  children: PropTypes.element,
};

export default ManagerWidgetLayoutProtected;
