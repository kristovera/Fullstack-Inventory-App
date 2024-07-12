const { default: mongoose } = require("mongoose");

const itemObject = {
  kode_item: { type: String, required: true, unique: true},
  name_item: { type: String, required: true,   },
  stock_item: { type: Number, required: true, min: 1 },
  isDelete: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

const itemSchema = new mongoose.Schema(itemObject, {
  versionKey: false,
  timestamps: true,
});

const Item = new mongoose.model("Item", itemSchema);

module.exports = {
  Item,
  itemObject,
  itemSchema,
};
