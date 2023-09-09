const express = require("express");
const router = express.Router();

// importing controllers
const authController = require("./controllers/authController");
const reportController = require("./controllers/reportsController");

// auth routes
router.post("/register", authController().register);
router.post("/login", authController().login);

//report routes
router.post("/submitReport", reportController().submitReport);
router.post("/getReports", reportController().getReports);

module.exports = router;
