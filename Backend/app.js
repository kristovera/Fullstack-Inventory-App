const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/utils/databases");
const {
  permissionRouter,
  PERMISSION_PATH,
} = require("./src/permissions/routers");
const { ROLE_PATH, roleRouter } = require("./src/roles/routers");
const { USER_PATH, userRouter } = require("./src/users/routers");
const { ME_PATH, meRouter } = require("./src/me/routers");
const { ITEM_PATH, itemRouter } = require("./src/items/routers");
const { DEPT_PATH, deptRouter } = require("./src/depts/routers");
const { SUPPLIER_PATH, supplierRouter } = require("./src/suppliers/routers");
const { REQUEST_PATH, reqRouter } = require("./src/requests/routers");
const { ACCEPT_PATH, accRouter } = require("./src/accepts/routers");


connectDB();
const app = express();

app.use(express.json());

app.use(cors({ origin: process.env.API_ORIGIN }));

app.use(PERMISSION_PATH, permissionRouter);
app.use(ROLE_PATH, roleRouter);
app.use(USER_PATH, userRouter);
app.use(ME_PATH, meRouter);
app.use(ITEM_PATH, itemRouter);
app.use(DEPT_PATH, deptRouter);
app.use(SUPPLIER_PATH, supplierRouter);
app.use(REQUEST_PATH, reqRouter);
app.use(ACCEPT_PATH, accRouter);


module.exports = {
  app,
};
