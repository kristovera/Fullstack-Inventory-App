const express = require("express");
const { jwtAuthMiddleware } = require("../utils/middlewares");
const {
  itemPermissionRead,
  itemPermissionUpdate,
  itemPermissionDelete,
  itemPermissionCreate,
} = require("./permissions");
const {
  itemControllerList,
  itemControllerDetail,
  itemControllerUpdate,
  itemControllerDelete,
  itemControllerCreate,
  itemControllerAutoIncrement,
  itemControllerDetailByKode
} = require("./controllers");

const {
  itemValidationCreate,
  itemValidationUpdate,
} = require("./validations");

const itemRouter = express.Router();
const ITEM_PATH = "/items";

itemRouter.get(
  "/",
  [jwtAuthMiddleware, itemPermissionRead],
  itemControllerList
);
itemRouter.get(
  "/autoincrement",
  [jwtAuthMiddleware, itemPermissionRead],
  itemControllerAutoIncrement
);

itemRouter.post(
  "/",
  [jwtAuthMiddleware, itemValidationCreate, itemPermissionCreate],
  itemControllerCreate
);

itemRouter.get(
  "/:id",
  [jwtAuthMiddleware, itemPermissionRead],
  itemControllerDetail
);


itemRouter.put(
  "/:id",
  [jwtAuthMiddleware, itemValidationUpdate, itemPermissionUpdate],
  itemControllerUpdate
);

itemRouter.delete(
  "/:id",
  [jwtAuthMiddleware, itemPermissionDelete],
  itemControllerDelete
);

module.exports = {
  itemRouter,
  ITEM_PATH,
};
