const express = require("express");
const router = express.Router();

const { signUp, signIn, signOut } = require("../controllers/auth");
const { userSignUpValidator } = require("../validator/index");

// POST
router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", signIn);

// GET
router.get("/signout", signOut);

module.exports = router;
