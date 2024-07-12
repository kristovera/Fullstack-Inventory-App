const { default: mongoose } = require("mongoose");
const { supplierObject } = require("../suppliers/models");
const { itemObject } = require("../items/models");


const accObject = {
  no_acc: { type: String, required: true, unique: true },
  //stock_acc:{ type: Number, default: 0, required: true },
  //total_acc: { type: Number, default: 0, required: true },
  tgl_acc: { type: Date, default: new Date(), required: true },
  isDelete: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      ...itemObject,
      kode_item: { type: String, required: true , unique:false},
      name_item: { type: String,  required: true },
      qty: { type: Number,  required: true },
    },
   
  ],
  suppliers: 
  {
      ...supplierObject,
      kode_supp: { type: String, required: true , unique:false},
      name_supp: { type: String,  required: true },
     
  }

};

const accSchema = new mongoose.Schema(accObject, {
  versionKey: false,
  timestamps: true,
});

const Accept = new mongoose.model("Accept", accSchema);

module.exports = {
  Accept,
  accSchema,
  accObject,
};
