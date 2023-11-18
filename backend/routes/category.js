const express = require("express");
const router = express.Router();

const {
  create,
  categoryById,
  read,
  list,
  remove,
  update,
} = require("../controllers/category");
const { userById } = require("../controllers/user");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");

// GET - list all the category
router.get("/category", list);
router.get("/category/:categoryId", read);

// POST - create new category
router.post(
  "/category/create/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  create,
  (req, res) => {
    res
      .json({
        result: req.body,
      })
      .status(200);
  }
);

// DELETE - category
router.delete(
  "/category/:categoryId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  remove
);

// UPDATE - an existing category
router.put(
  "/category/:categoryId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  update
);

// Params
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
