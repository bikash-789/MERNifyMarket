// for dealing with images in form we use formidable
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product.js");
const { errorHandler } = require("../helpers/dbErrorHandler");

// CREATE
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  // keep the extensions of image/photo as it is
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded!",
      });
    }
    // here, fields will contain product details so destructure it
    let { name, description, price, category, quantity, shipping } = fields;

    // check for empty fields
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required!",
      });
    }

    // create a product object
    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB",
        });
      }
      // read the image file from the form by adding a path
      product.photo.data = fs.readFileSync(files.photo.path);

      // set the photo's type
      product.photo.contentType = files.photo.type;
    }

    // Finally, save the product into database
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.status(200).json(result);
    });
  });
};

// READ
exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product).status(200);
};

// UPDATE
exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded!",
      });
    }
    let { name, description, price, category, quantity, shipping } = fields;
    // if (
    //   !name ||
    //   !description ||
    //   !price ||
    //   !category ||
    //   !quantity ||
    //   !shipping
    // ) {
    //   return res.status(400).json({
    //     error: "All fields are required!",
    //   });
    // }
    let product = req.product;
    // _.extend(initial_data, updated_data)
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.status(200).json(result);
    });
  });
};

// DELETE
exports.remove = (req, res) => {
  let product = req.product;
  // product.remove is a method provided by mongoose to delete the instance of product
  product.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successfully!",
    });
  });
};

// READ BY ID
exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, result) => {
      if (err || !result) {
        return res.status(400).json({
          error: "Product not found!",
        });
      }
      req.product = result;
      next();
    });
};

/*
 -> sell / arrival
 by sell = /products?sortBy=sold&order=desc&limit=5
 by arrival = /products?sortBy=createdAt&order=desc&limiit=5

 However, if no params are sent, then all the products will be returned
*/

// READ based on filters
exports.list = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;

  //fetching all the products from database based on the query
  await Product.find()
    .populate("category") //keywords in schema of product
    .select("-photo")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res
          .json({
            error: "Products not found!",
          })
          .status(400);
      }
      res.json(products);
    });
};

// READ based on related category
exports.listRelated = async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;
  await Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
  })
    .limit(limit)
    .select("-photo")
    .populate("category", "name _id")
    .exec((err, products) => {
      if (err) {
        return res
          .json({
            error: "Products not found!",
          })
          .status(400);
      }
      res.json(products);
    });
};

// READ the product categories
exports.listCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res
        .json({
          error: "No categories found!",
        })
        .status(400);
    }
    res.json(categories);
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he/she wants
 */

exports.listBySearch = async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  await Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

// READ based on keyword search
exports.listSearch = async (req, res) => {
  // Create query object to hold search value and category value
  let query = {};

  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };

    // assigns category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }

    console.log(query);
    // find the product based on query object with 2 properties
    // search and category
    try {
      const products = await Product.find(query).select("-photo");
      res.json(products);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
  }
};

// READ photo from database
exports.getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// On buy decrease the quantity
exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "Could not update product",
      });
    }
    next();
  });
};
