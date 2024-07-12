const { hasPermissionsMiddleware } = require("../utils/middlewares");

const deptPermissionCreate = hasPermissionsMiddleware(["create-depts"]);
const deptPermissionRead = hasPermissionsMiddleware(["read-depts"]);
const deptPermissionUpdate = hasPermissionsMiddleware(["update-depts"]);
const deptPermissionDelete = hasPermissionsMiddleware(["delete-depts"]);

module.exports = {
  deptPermissionCreate,
  deptPermissionRead,
  deptPermissionUpdate,
  deptPermissionDelete,
};
