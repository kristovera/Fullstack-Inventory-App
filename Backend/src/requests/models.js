const { default: mongoose } = require("mongoose");
const { itemObject } = require("../items/models");
const { deptObject } = require("../depts/models");

const reqObject = {
  no_req: { type: String, required: true, unique: true },
  tgl_req: { type: Date, default: new Date(), required: true },
  isDelete: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      ...itemObject,
      kode_item: { type: String, required: true, unique: false},
      qty: { type: Number,  required: true },
    },
  ],
  depts: {
      ...deptObject,
      kode_dept: { type: String, required: true , unique:false},
      pimpinan: { type: String,  required: true },
    }

};

const reqSchema = new mongoose.Schema(reqObject, {
  versionKey: false,
  timestamps: true,
});

const Request = new mongoose.model("Request", reqSchema);

module.exports = {
  Request,
  reqSchema,
  reqObject,
};
