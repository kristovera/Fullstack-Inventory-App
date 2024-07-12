const { hasPermissionsMiddleware } = require("../utils/middlewares");

const reqPermissionCreate = hasPermissionsMiddleware(["create-requests"]);
const reqPermissionRead = hasPermissionsMiddleware(["read-requests"]);
const reqPermissionDelete = hasPermissionsMiddleware(["delete-requests"]);
const reqPermissionUpdate = hasPermissionsMiddleware(["update-requests"]);

module.exports = {
  reqPermissionCreate,
  reqPermissionRead,
  reqPermissionDelete,
  reqPermissionUpdate,

};
