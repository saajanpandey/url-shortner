const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var cors = require("cors");
const routes = require("./src/router/routes");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/test");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
