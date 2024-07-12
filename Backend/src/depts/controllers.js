const { exceptionHandler, Error404, Error403 } = require("../utils/errors");
const { filterSearch } = require("../utils/filters");
const { autoIncrement } = require("../utils/helpers");
const { buildPagination } = require("../utils/paginations");
const { Dept } = require("./models");

const deptControllerList = async (req, res) => {
  try {
    let result = Dept.find({  isDelete: false });
    result = filterSearch(req, result);
    result = await buildPagination(req, result);
    res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const deptControllerAutoIncrement = async (req, res) => {
  try {
    const kodeDept = await autoIncrement(Dept, "Dep")

    return res.status(200).json({kode: kodeDept});
  } catch (error) {
    return exceptionHandler(error, res);
  }
}

const deptControllerCreate = async (req, res) => {
 
  try {
    const kodeDept = await autoIncrement(Dept, "Dep")
    
    const result = await Dept.create({
      ...res.locals.matchedData,
      kode_dept: kodeDept,
      owner: res.locals.user._id,
    });
    return res.status(201).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const deptControllerDetail = async (req, res) => {
  try {
    const result = await Dept.findOne({
      _id: req.params.id,
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

const deptControllerDetailByKode = async (req, res) => {
  try {
    const result = await Dept.findOne({
      kode_dept: req.params.kode_dept,
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

const deptControllerUpdate = async (req, res) => {
  try {
    let result = await Dept.findOne({
      _id: req.params.id,
      isDelete: false,
    });
    if (!result) {
      throw new Error404();
    }

    if (result.owner._id.toString() !== res.locals.user._id.toString()) {
      throw new Error403();
    }

    result = await Dept.findOneAndUpdate(
      { _id: req.params.id },
      res.locals.matchedData,
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const deptControllerDelete = async (req, res) => {
  try {
    const result = await Dept.findOneAndUpdate(
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
  deptControllerList,
  deptControllerCreate,
  deptControllerDetail,
  deptControllerUpdate,
  deptControllerDelete,
  deptControllerAutoIncrement,
  deptControllerDetailByKode,
};
