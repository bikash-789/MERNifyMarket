const User = require("../models/user");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

// CREATE - new user
exports.signUp = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    // we don't need to send the salt and hashed_password to frontend
    // so we set it to undefined
    user.salt = undefined;
    user.hashed_password = undefined;
    res.status(200).json({
      user,
    });
  });
};

// READ - fetch user from database and check for authentication
exports.signIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .json({
          error: "User with this email doesnot exist, please sign up!",
        })
        .status(400);
    }

    //if user is found, make sure the email and password match

    //make use of authenticate method in user model to authenticate
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password doesnot match!",
      });
    }
    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as 't' in cookie with expiry date

    // set the expiry of cookie for next 15 mins - key, value, expiry date
    res.cookie("t", token, { maxAge: 30 * 60 * 1000 });

    //return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({
      token, // this token is use to make request for accessing private routes
      user: {
        _id,
        email,
        name,
        role,
      },
    });
  });
};

// READ - clear the cookie to sign out
exports.signOut = (req, res) => {
  let user = req.user;
  console.log(user);
  res.clearCookie("t");
  res.json({ message: "Signed out successfully!!" });
};

// READ - will check if the current user is signed in or not
exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// This will check if the current logged in have permission to access
// private routes. For ex: If I'm a logged in user and I want to access
// information of other users, it should not provide permission to access
// So, we can achieve this by checking if logged in user credential matches
// to user which he/she has requested for. If Yes allow, else deny.
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied!",
    });
  }
  next();
};

//function to check if the user is admin or normal user
exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "User is not admin!",
    });
  }
  next();
};
