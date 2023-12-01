const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require("http-errors");

//! Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// const isLoggedIn = (req, res, next) => {
//   const login = true;
//   if (login) {
//     next();
//   } else {
//     return res.status(401).json({ message: "unauthorized" });
//   }
//   console.log("isLoggedIn middleware");
// };
// const isLoggedOut = (req, res, next) => {
//   console.log("isLoggedOut middleware");
//   next();
// };

//! Testing for API health

app.get("/test", (req, res) => {
  res.status(200).send({ message: "working fine" });
});

app.get("/user/v1", (req, res) => {
  console.log("user v1 called");
  res.status(200).send({ message: "user profile is returned" });
});
app.get("/", (req, res) => {
  res.status(200).send({ message: "Server running..." });
});
//! Error handling
// Client
app.use((req, res, next) => {
  //   res.status(404).send({message: 'not found'});
 
  next(createError(404, "not found"));
});
// Server error handling -> all the errors in server will come here
app.use((err, req, res, next) => {
  //   console.error(err.stack);
  //   res.status(500).send({ message: "something went wrong!!!" });
  return res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});

module.exports = app;
