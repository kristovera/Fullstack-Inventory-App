const express = require("express");
const { jwtAuthMiddleware } = require("../utils/middlewares");
const {
  supplierPermissionRead,
  supplierPermissionUpdate,
  supplierPermissionDelete,
  supplierPermissionCreate,
} = require("./permissions");
const {
  supplierControllerList,
  supplierControllerDetail,
  supplierControllerUpdate,
  supplierControllerDelete,
  supplierControllerCreate,
  supplierControllerAutoIncrement,
  suppControllerDetailByKode
} = require("./controllers");

const {
  supplierValidationCreate,
  supplierValidationUpdate,
} = require("./validations");

const supplierRouter = express.Router();
const SUPPLIER_PATH = "/suppliers";

supplierRouter.get(
  "/",
  [jwtAuthMiddleware, supplierPermissionRead],
  supplierControllerList
);
supplierRouter.get(
  "/by-kode/:kode_supp",
  [jwtAuthMiddleware, supplierPermissionRead],
  suppControllerDetailByKode
);

supplierRouter.post(
  "/",
  [jwtAuthMiddleware, supplierValidationCreate, supplierPermissionCreate],
  supplierControllerCreate
);
supplierRouter.get(
  "/autoincrement",
  [jwtAuthMiddleware, supplierPermissionRead],
  supplierControllerAutoIncrement
);


supplierRouter.get(
  "/:id",
  [jwtAuthMiddleware, supplierPermissionRead],
  supplierControllerDetail
);

supplierRouter.put(
  "/:id",
  [jwtAuthMiddleware, supplierValidationUpdate, supplierPermissionUpdate],
   supplierControllerUpdate
);

supplierRouter.delete(
  "/:id",
  [jwtAuthMiddleware, supplierPermissionDelete],
  supplierControllerDelete
);

module.exports = {
  supplierRouter,
  SUPPLIER_PATH,
};
