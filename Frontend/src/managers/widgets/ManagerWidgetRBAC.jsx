import PropTypes from "prop-types";
import useAccess from "../../utils/hooks/useAccess.jsx";

export const ManagerWidgetRBAC = ({
  children,
  permissions,
  patch,
  context,
  or=false
}) => {
  const access = useAccess();
  if (access.has(permissions, context.auth.superuser, context.auth.accessList, or)) {
    return children;
  }
  return patch ? patch : null;
};

ManagerWidgetRBAC.propTypes = {
  children: PropTypes.any,
  permissions: PropTypes.array,
  patch: PropTypes.any,
  context: PropTypes.any,
  or: PropTypes.bool
};

export default ManagerWidgetRBAC;
