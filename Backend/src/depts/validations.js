const { textField, numberField } = require("../utils/fields");
const { validationMiddleware } = require("../utils/middlewares");

const deptValidationCreate = validationMiddleware([
  textField("name_dept"),
  textField("kode_dept"),
  textField("pimpinan"),
  numberField("nohp_dept"),
  
]);

const deptValidationUpdate = validationMiddleware([
  textField("name_dept"),
  textField("kode_dept"),
  textField("pimpinan"),
  numberField("nohp_dept", true),
 
]);

const deptValidationDelete = validationMiddleware([
  textField("kode_dept"),

]);
module.exports = {
  deptValidationCreate,
  deptValidationUpdate,
  deptValidationDelete,
};
