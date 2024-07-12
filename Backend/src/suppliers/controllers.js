const { exceptionHandler, Error404 } = require("../utils/errors");
const { filterSearch } = require("../utils/filters");
const { autoIncrement } = require("../utils/helpers");
const { buildPagination } = require("../utils/paginations");
const { Supplier } = require("./models");
//const { orderValidationNonFieldOwnership } = require("./validations");

const supplierControllerList = async (req, res) => {
  try {
    let result = Supplier.find({ isDelete: false });
    result = filterSearch(req, result);
    result = await buildPagination(req, result);
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};


const supplierControllerAutoIncrement = async (req, res) => {
  try {
    const kodeSupp = await autoIncrement(Supplier, "S")

    return res.status(200).json({kode: kodeSupp});
  } catch (error) {
    return exceptionHandler(error, res);
  }
}

const suppControllerDetailByKode = async (req, res) => {
  try {
    const result = await Supplier.findOne({
      kode_supp: req.params.kode_supp,
      isDelete: false,
    });

    if (!result) {
      throw new Error404();
    }

    if (result.owner._id.toString() !== res.locals.user._id.toString()) {
      throw new Error403();
    }

    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};
const supplierControllerCreate = async (req, res) => {
 
  try {
    const kodeSupp = await autoIncrement(Supplier, "S")
    
    const result = await Supplier.create({
      ...res.locals.matchedData,
      kode_supp: kodeSupp,
      owner: res.locals.user._id,
    });
    return res.status(201).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const supplierControllerDetail = async (req, res) => {
  try {
    let result = await Supplier.findOne({
      _id: req.params.id,
      owner: res.locals.user._id,
      isDelete: false,
    });
    if (!result) {
      throw new Error404();
    }

    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const supplierControllerUpdate = async (req, res) => {
  try {
    let result = await Supplier.findOne({
      _id: req.params.id,
      isDelete: false,
    });
    if (!result) {
      throw new Error404();
    }

    if (result.owner._id.toString() !== res.locals.user._id.toString()) {
      throw new Error403();
    }

    result = await Supplier.findOneAndUpdate(
      { _id: req.params.id },
      res.locals.matchedData,
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const supplierControllerDelete = async (req, res) => {
  try {
    const result = await Supplier.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: res.locals.user._id,
        isDelete: false,
      },
      { isDelete: true }
    );

    if (!result) {
      throw new Error404();
    }

    return res.status(204).json(null);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

module.exports = {
  supplierControllerList,
  supplierControllerCreate,
  supplierControllerDetail,
  supplierControllerUpdate,
  supplierControllerDelete, 
  supplierControllerAutoIncrement,
  suppControllerDetailByKode
  
};
