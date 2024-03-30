const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000 || process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./router");
const fileUpload = require("express-fileupload");

// Database connection
// "mongodb://127.0.0.1:27017/ComplaintDB" old
let uri =
  "mongodb+srv://ved:test123@cluster0.1goshc7.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Databse connected.."))
  .catch((err) => console.log(err));

//template
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(bodyParser.json());
app.use(fileUpload());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
