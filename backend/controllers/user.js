// import database model
const { Order } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");
const User = require("../models/user");

// READ
exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.status(200).json(req.profile);
};

// UPDATE
// exports.update = (req, res) => {
//   // $set : will set the fields provided in req.body with new values
//   // new: true; will provide the user with updated data
//   User.findOneAndUpdate(
//     { _id: req.profile._id },
//     { $set: req.body },
//     { new: true },
//     (err, user) => {
//       if (err) {
//         res.status(400).json({
//           error: "User not authorized",
//         });
//       }
//       user.hashed_password = undefined;
//       user.salt = undefined;
//       res.status(200).json(user);
//     }
//   );
// };

exports.update = (req, res) => {
  const { newPassword } = req.body;

  // If newPassword is provided, update the password
  if (newPassword) {
    // Step 1: Find the user based on the provided email
    User.findOne({ _id: req.profile._id }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      // Step 2: Set the new password using the virtual field
      user.password = newPassword;

      // Update the hashed_password field with the new hashed value
      user.hashed_password = user.encryptPassword(newPassword);

      // Save the user object to update the password
      user.save((err, updatedUser) => {
        if (err) {
          return res.status(500).json({
            error: "Error updating password",
          });
        }
        // Clear sensitive information before sending the response
        updatedUser.hashed_password = undefined;
        updatedUser.salt = undefined;
        res.status(200).json(updatedUser);
      });
    });
  } else {
    // If newPassword is not provided, update other details using findOneAndUpdate
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          return res.status(400).json({
            error: "User not authorized",
          });
        }
        // Clear sensitive information before sending the response
        updatedUser.hashed_password = undefined;
        updatedUser.salt = undefined;
        res.status(200).json(updatedUser);
      }
    );
  }
};

// READ by id
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found!",
      });
    }
    req.profile = user;
    next();
  });
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];
  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Could not update user purchase history",
        });
      }
      next();
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};
