const { hasPermissionsMiddleware } = require("../utils/middlewares");


const supplierPermissionCreate = hasPermissionsMiddleware(["create-suppliers"]);
const supplierPermissionRead = hasPermissionsMiddleware(["read-suppliers"]);
const supplierPermissionUpdate = hasPermissionsMiddleware(["update-suppliers"]);
const supplierPermissionDelete = hasPermissionsMiddleware(["delete-suppliers"]);

module.exports = {
  supplierPermissionCreate,
  supplierPermissionRead,
  supplierPermissionUpdate,
  supplierPermissionDelete,
};
