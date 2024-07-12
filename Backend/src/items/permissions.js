const { hasPermissionsMiddleware } = require("../utils/middlewares");

const itemPermissionCreate = hasPermissionsMiddleware(["create-items"]);
const itemPermissionRead = hasPermissionsMiddleware(["read-items"]);
const itemPermissionUpdate = hasPermissionsMiddleware(["update-items"]);
const itemPermissionDelete = hasPermissionsMiddleware(["delete-items"]);

module.exports = {
  itemPermissionCreate,
  itemPermissionRead,
  itemPermissionUpdate,
  itemPermissionDelete,
};
