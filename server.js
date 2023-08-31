const express = require("express");
const app = express();
const PORT = 8000 || process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./router");
const fileUpload = require("express-fileupload");

// Database connection

mongoose
  .connect("mongodb://127.0.0.1:27017/ComplaintDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Databse connected.."))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(bodyParser.json());
app.use(fileUpload());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
