const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const {
  create,
  orderById,
  listOrders,
  getStatusValues,
  updateOrderStatus,
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post(
  "/order/create/:userId",
  requireSignIn,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);
router.get("/order/list/:userId", requireSignIn, isAuth, isAdmin, listOrders);

router.get(
  "/order/status-values/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  getStatusValues
);
router.put(
  "/order/:orderId/status/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  updateOrderStatus
);

router.param("orderId", orderById);
router.param("userId", userById);

module.exports = router;
