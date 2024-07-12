const { exceptionHandler, Error404 } = require("../utils/errors");
const { filterSearch } = require("../utils/filters");
const { buildPagination } = require("../utils/paginations");
const { autoIncrement } = require("../utils/helpers");
const { Request } = require("./models");
const { reqValidationNonFieldOwnership } = require("./validations");

const reqControllerList = async (req, res) => {
  try {
    let result = Request.find({ isDelete: false });
    result = filterSearch(req, result);
    result = await buildPagination(req, result);
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};


const reqControllerAutoIncrement = async (req, res) => {
  try {
    const noReq = await autoIncrement(Request, "REQ")

    return res.status(200).json({kode: noReq});
  } catch (error) {
    return exceptionHandler(error, res);
  }
}
const reqControllerCreate = async (req, res) => {
  try {
    await reqValidationNonFieldOwnership(res);
    const result = await Request.create({
      ...res.locals.matchedData,
     // owner: res.locals.user._id,
    });
    return res.status(201).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const reqControllerDetail = async (req, res) => {
  try {
    let result = await Request.findOne({
      _id: req.params.id,
      //owner: res.locals.user._id,
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

const reqControllerDelete = async (req, res) => {
  try {
    const result = await Request.findOneAndUpdate(
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



const reqControllerUpdate = async (req, res) => {
  try {
    let result = await Request.findOne({
      _id: req.params.id,
      isDelete: false,
    });
    if (!result) {
      throw new Error404();
    }

    if (result.owner._id.toString() !== res.locals.user._id.toString()) {
      throw new Error403();
    }

    result = await Item.findOneAndUpdate(
      { _id: req.params.id },
      res.locals.matchedData,
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

module.exports = {
  reqControllerList,
  reqControllerCreate,
  reqControllerDetail,
  reqControllerDelete,
  reqControllerUpdate,
  reqControllerAutoIncrement
};
