const { default: mongoose } = require("mongoose");

const deptObject = {
  name_dept: { type: String, required: true },
  kode_dept: { type: String, required: true , unique:true},
  pimpinan: { type: String, required: true},
  nohp_dept :{ type: String, required: true },
  isDelete: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

const deptSchema = new mongoose.Schema(deptObject, {
  versionKey: false,
  timestamps: true,
});

const Dept = new mongoose.model("Dept", deptSchema);

module.exports = {
  Dept,
  deptObject,
  deptSchema,
};
