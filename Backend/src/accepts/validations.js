const { Item } = require("../items/models");
const { Error403 } = require("../utils/errors");
const { textField, itemsField, numberField, objectField } = require("../utils/fields");
const { validationMiddleware } = require("../utils/middlewares");

const accValidationNonFieldOwnership = async (res) => {
  for (let product of res.locals.matchedData.products) {
    const item = await Item.findOne({
      _id: product._id,
      owner: res.locals.user._id,
    });
    if (!item) {
      throw new Error403();
    }
  }
};

const accValidationCreate = validationMiddleware([
  textField("no_acc"),
  itemsField("products"),
  objectField("suppliers"),
  textField("products.*._id").custom(async (_id) => {
    const item = await Item.findOne({ _id, isDelete: false });
    if (!item) {
      throw new Error("Items does not exists.");
    }
  }),
  textField("products.*.name_item").custom(async (name_item, { req, path }) => {
    const index = Number(path.replace(/\D/g, ""));
    const _id = req.body.products[index]._id;
    const item = await Item.findOne({ _id });
    if (item && item.name_item !== name_item) {
      throw new Error("Invalid product name.");
    }
  }),

  numberField("products.*.stock_item").custom(async (stock_item, { req, path }) => {
    const index = Number(path.replace(/\D/g, ""));
    const _id = req.body.products[index]._id;
    const item = await Item.findOne({ _id });
    if (item && item.stock_item !== stock_item) {
      throw new Error("Invalid product stock.");
    }
  }),
  numberField("suppliers.*.qty").custom(async (qty, { req, path }) => {
    const index = Number(path.replace(/\D/g, ""));
    const _id = req.body.products[index]._id;
    const item = await Item.findOne({ _id });
    if (item && qty > item.stock_item) {
      throw new Error("Stock not enought.");
    }
  })

 
]);

module.exports = {
  accValidationCreate,
  accValidationNonFieldOwnership,
};
