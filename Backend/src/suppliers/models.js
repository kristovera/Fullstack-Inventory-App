const { default: mongoose } = require("mongoose");


const supplierObject = {
  kode_supp: { type: String, required: true },
  name_supp: {  type: String, required: true },
  alamat_supp : { type: String, required: true},
  nohp_supp : { type: String, required: true},

  isDelete: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
};

const supplierSchema = new mongoose.Schema(supplierObject, {
  versionKey: false,
  timestamps: true,
});

const Supplier = new mongoose.model("Supplier", supplierSchema);

module.exports = {
  Supplier,
  supplierSchema,
  supplierObject,
};
