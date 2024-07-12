const { exceptionHandler, Error404, Error403 } = require("../utils/errors");
const { filterSearch } = require("../utils/filters");
const { autoIncrement } = require("../utils/helpers");
const { buildPagination } = require("../utils/paginations");
const { Item } = require("./models");

const itemControllerList = async (req, res) => {
  try {
    let result = Item.find({  isDelete: false });
    result = filterSearch(req, result);
    result = await buildPagination(req, result);
    res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};


const itemControllerAutoIncrement = async (req, res) => {
  try {
    const kodeItem = await autoIncrement(Item, "I")

    return res.status(200).json({kode: kodeItem});
  } catch (error) {
    return exceptionHandler(error, res);
  }
}

const itemControllerCreate = async (req, res) => {
 
  try {
    const kodeItem = await autoIncrement(Item, "I")
    
    const result = await Item.create({
      ...res.locals.matchedData,
      kode_item: kodeItem,
      owner: res.locals.user._id,
    });
    return res.status(201).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const itemControllerDetail = async (req, res) => {
  try {
    const result = await Item.findOne({
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

const itemControllerUpdate = async (req, res) => {
  try {
    let result = await Item.findOne({
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

const itemControllerDelete = async (req, res) => {
  try {
    const result = await Item.findOneAndUpdate(
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
  itemControllerList,
  itemControllerCreate,
  itemControllerDetail,
  itemControllerUpdate,
  itemControllerDelete,
  itemControllerAutoIncrement
};
