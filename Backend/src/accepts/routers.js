const express = require("express");
const { jwtAuthMiddleware } = require("../utils/middlewares");
const {
  accControllerList,
  accControllerCreate,
  accControllerDetail,
  accControllerAutoIncrement,
  accControllerDelete
} = require("./controllers");
const { accPermissionRead, accPermissionCreate, accPermissionDelete} = require("./permissions");
const { accValidationCreate } = require("./validations");

const accRouter = express.Router();
const ACCEPT_PATH = "/accepts";

accRouter.get(
  "/",
  [jwtAuthMiddleware, accPermissionRead],
  accControllerList
);

accRouter.get(
  "/autoincrement",
  [jwtAuthMiddleware, accPermissionRead],
  accControllerAutoIncrement
);

accRouter.post(
  "/",
  [jwtAuthMiddleware, accValidationCreate, accPermissionCreate],
  accControllerCreate
);

accRouter.get(
  "/:id",
  [jwtAuthMiddleware, accPermissionRead],
  accControllerDetail
);
accRouter.delete(
  "/:id",
  [jwtAuthMiddleware, accPermissionDelete],
  accControllerDelete
);



module.exports = {
  accRouter,
  ACCEPT_PATH,
};
