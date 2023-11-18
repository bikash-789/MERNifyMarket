const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  getPhoto,
  listSearch
} = require("../controllers/product");
const { userById } = require("../controllers/user");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");

// GET - all products / product by ID / product categories / related products / product photo
router.get("/products", list);
router.get("/product/:productId", read);
router.get("/products/categories", listCategories);
router.get("/products/related/:productId", listRelated);
router.get("/product/photo/:productId", getPhoto);


// POST - new product / search by query
router.post("/product/create/:userId", requireSignIn, isAuth, isAdmin, create);
router.post("/products/by/search", listBySearch);
router.post("/products/search", listSearch);

// DELETE - product by ID
router.delete(
  "/product/:productId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  remove
);

// UPDATE - product by ID
router.put(
  "/product/:productId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  update
);


// params
router.param("productId", productById);
router.param("userId", userById);
module.exports = router;
