const { textField, numberField } = require("../utils/fields");
const { validationMiddleware } = require("../utils/middlewares");

const itemValidationCreate = validationMiddleware([
  textField("name_item"),
  textField("kode_item"),
  numberField("stock_item"),
]);

const itemValidationUpdate = validationMiddleware([
  textField("name_item"),
  textField("kode_item"),
  numberField("stock_item"),
]);

const itemValidationDelete = validationMiddleware([
  textField("kode_item"),

]);


module.exports = {
  itemValidationCreate,
  itemValidationUpdate,
  itemValidationDelete,
};
