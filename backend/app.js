const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");

// This enables environment variables to access in our file
require("dotenv").config();

//import routes from routes directory
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintreeRoutes");
const orderRoutes = require("./routes/order");
//app
const app = express();

//connect to database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully!"))
  .catch((err)=>console.log(err));



//Middlewares
// This will console which method is called on which url
app.use(morgan("dev"));

// CORS for enabling Cross Origin Resource Sharing - as our backend is running on different port
// and frontend on different
app.use(cors({ origin: true }));

// this middleware allows our Express application to automatically parse incoming JSON payloads 
// making it easier to handle POST, PUT, or PATCH requests with JSON data
app.use(bodyParser.json());

// this middleware usese cookie parser. Cookie parser helps for authorization
app.use(cookieParser());

// this middleware helps in validation of form data
app.use(expressValidator());

app.use("/api", braintreeRoutes)
app.use("/api", orderRoutes)

// ROUTES
// Authentication routes
app.use("/api", authRoutes);

// User routes
app.use("/api", userRoutes);

// Product category routes
app.use("/api", categoryRoutes);

// Products routes
app.use("/api", productRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log("Server running on " + process.env.PORT + " port!");
});
