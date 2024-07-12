const { hasPermissionsMiddleware } = require("../utils/middlewares");

const accPermissionCreate = hasPermissionsMiddleware(["create-accepts"]);
const accPermissionRead = hasPermissionsMiddleware(["read-accepts"]);
//const accPermissionUpdate = hasPermissionsMiddleware(["update-accepts"]);
const accPermissionDelete = hasPermissionsMiddleware(["delete-accepts"]);

module.exports = {
  accPermissionCreate,
  accPermissionRead,
 // accPermissionUpdate,
  accPermissionDelete,
};
