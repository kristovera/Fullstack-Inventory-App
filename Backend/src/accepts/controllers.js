const { exceptionHandler, Error404, Error403 } = require("../utils/errors");
const { filterSearch } = require("../utils/filters");
const { autoIncrement } = require("../utils/helpers");
const { buildPagination } = require("../utils/paginations");
const { Accept } = require("./models");

const accControllerList = async (req, res) => {
  try {
    let result = Accept.find({    owner: res.locals.user._id, isDelete: false });
    result = filterSearch(req, result);
    result = await buildPagination(req, result);
    res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};


const accControllerAutoIncrement = async (req, res) => {
  try {
    const noAcc = await autoIncrement(Accept, "ACC")

    return res.status(200).json({kode: noAcc});
  } catch (error) {
    return exceptionHandler(error, res);
  }
}

const accControllerCreate = async (req, res) => {
 
  try {
    const noAcc = await autoIncrement(Accept, "ACC")
    
    const result = await Accept.create({
      ...res.locals.matchedData,
      no_acc: noAcc,
      owner: res.locals.user._id,
    });
    return res.status(201).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const accControllerDetail = async (req, res) => {
  try {
    const result = await Accept.findOne({
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


const accControllerDelete = async (req, res) => {
  try {
    const result = await Accept.findOneAndUpdate(
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
  accControllerList,
  accControllerCreate,
  accControllerDetail,
  accControllerDelete,
  accControllerAutoIncrement
};
