const express = require("express");
const { jwtAuthMiddleware } = require("../utils/middlewares");
const {
  reqControllerList,
  reqControllerCreate,
  reqControllerDetail,
  reqControllerDelete,
  reqControllerUpdate,
  reqControllerAutoIncrement
} = require("./controllers");
const { reqPermissionRead, reqPermissionCreate , reqPermissionDelete, reqPermissionUpdate} = require("./permissions");
const { reqValidationCreate } = require("./validations");

const reqRouter = express.Router();
const REQUEST_PATH = "/requests";

reqRouter.get(
  "/",
  [jwtAuthMiddleware, reqPermissionRead],
  reqControllerList
);

reqRouter.get(
  "/autoincrement",
  [jwtAuthMiddleware, reqPermissionRead],
  reqControllerAutoIncrement
);

reqRouter.post(
  "/",
  [jwtAuthMiddleware, reqValidationCreate, reqPermissionCreate],
  reqControllerCreate
);

reqRouter.get(
  "/:id",
  [jwtAuthMiddleware, reqPermissionRead],
  reqControllerDetail
);
reqRouter.delete(
  "/:id",
  [jwtAuthMiddleware, reqPermissionDelete],
  reqControllerDelete
);

reqRouter.put(
  "/:id",
  [jwtAuthMiddleware, reqPermissionUpdate],
  reqControllerUpdate
);
module.exports = {
  reqRouter,
  REQUEST_PATH,
};
