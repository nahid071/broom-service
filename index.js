const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

// middleware
app.set("view engine", "ejs");
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("public"));

// Handle Route
app.use("/", require("./routes"));
app.use("/sms", require("./routes/sms"));

app.get("/", (req, res) => {
  //
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server Running on port ${PORT}`));
