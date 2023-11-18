const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

// CREATE
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      data,
    });
  });
};

// READ
exports.read = (req, res) => {
  res.json(req.category).status(200);
};

// UPDATE
exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Couldnot delete the category!",
      });
    }
    res.status(200).json(data);
  });
};

// DELETE
exports.remove = (req, res) => {
  let category = req.category;
  category.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Category deleted successfully!",
    });
  });
};

// READ BY ID
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, result) => {
    if (err || !result) {
      return res
        .json({
          error: "Category doesnot exist!",
        })
        .status(400);
    }
    req.category = result;
    next();
  });
};


// READ ALL
exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.json({
        error: "Couldnot fetch categories!",
      });
    }
    res.json(data).status(200);
  });
};




