const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const config = require("./config");

// db Connect
config.__db_conect();
// middleware
app.set("view engine", "ejs");
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handle Route
app.use("/", require("./routes"));
app.use("/auth", require("./routes/auth"));
app.use("/sms", require("./routes/sms"));
app.use("/contractor", require("./routes/contractor"));
app.use("/util", require("./routes/util"));

// error Handle

// Error Handle under the Route

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server Running on port ${PORT}`));
