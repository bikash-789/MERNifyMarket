//middleware for validating input for signup

exports.userSignUpValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 and 32 characters")
    .matches(/.+\@.+..+/)
    .withMessage("Email must contain '@' ")
    .isLength({
      min: 4,
      max: 32,
    });

  req.check("password", "Password cannot be empty!").notEmpty();
  req
    .check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");

  const errs = req.validationErrors();
  if (errs) {
    const firstError = errs.map((error) => error.msg)[0]; //return the first message of the errors and store it in firstError
    return res.status(400).json({ error: firstError });
  }
  next();
};
