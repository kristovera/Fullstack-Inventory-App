const { textField, numberField } = require("../utils/fields");
const { validationMiddleware } = require("../utils/middlewares");

const supplierValidationCreate = validationMiddleware([
  textField("name_supp"),
  textField("kode_supp"),
  textField("alamat_supp"),
  numberField("nohp_supp"),
  
]);

const supplierValidationUpdate = validationMiddleware([
  textField("name_supp"),
  textField("kode_supp"),
  textField("alamat_supp"),
  numberField("nohp_supp"),
 
]);

const supplierValidationDelete = validationMiddleware([
  textField("kode_supp"),

]);
module.exports = {
  supplierValidationCreate,
  supplierValidationUpdate,
  supplierValidationDelete,
};
