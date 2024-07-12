const express = require("express");
const { jwtAuthMiddleware } = require("../utils/middlewares");
const {
  deptPermissionRead,
  deptPermissionUpdate,
  deptPermissionDelete,
  deptPermissionCreate,
} = require("./permissions");
const {
  deptControllerList,
  deptControllerDetail,
  deptControllerUpdate,
  deptControllerDelete,
  deptControllerCreate,
  deptControllerAutoIncrement,
  deptControllerDetailByKode,
} = require("./controllers");

const {
  deptValidationCreate,
  deptValidationUpdate,
} = require("./validations");

const deptRouter = express.Router();
const DEPT_PATH = "/depts";

deptRouter.get(
  "/",
  [jwtAuthMiddleware, deptPermissionRead],
  deptControllerList
);

deptRouter.get(
  "/autoincrement",
  [jwtAuthMiddleware, deptPermissionRead],
  deptControllerAutoIncrement
);



deptRouter.post(
  "/",
  [jwtAuthMiddleware, deptValidationCreate, deptPermissionCreate],
deptControllerCreate
);

deptRouter.get(
  "/:id",
  [jwtAuthMiddleware, deptPermissionRead],
  deptControllerDetail
);

deptRouter.get(
  "/by-kode/:kode_dept",
  [jwtAuthMiddleware, deptPermissionRead],
  deptControllerDetailByKode
);

deptRouter.put(
  "/:id",
  [jwtAuthMiddleware, deptValidationUpdate, deptPermissionUpdate],
  deptControllerUpdate
);

deptRouter.delete(
  "/:id",
  [jwtAuthMiddleware, deptPermissionDelete],
  deptControllerDelete
);

module.exports = {
  deptRouter,
  DEPT_PATH,
};
