const express = require("express");
const router = express.Router();

const {
  userById,
  read,
  update,
  purchaseHistory,
} = require("../controllers/user");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");

// GET - user by ID
router.get("/user/:userId", requireSignIn, isAuth, read);

// UPDATE - update user by ID
router.put("/user/:userId/", requireSignIn, isAuth, update);
router.get("/orders/by/user/:userId", requireSignIn, isAuth, purchaseHistory);
// params
router.param("userId", userById);

module.exports = router;
