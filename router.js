const express = require("express");
const router = express.Router();

// importing controllers
const authController = require("./controllers/authController");
const reportController = require("./controllers/reportsController");
const admin_reportsController = require("./controllers/admin_controllers/admin_reportsController");
// auth routes
router.post("/register", authController().register);
router.post("/login", authController().login);

//DEMO ROUTE TO DEBUG/TEST
router.get("/", authController().demo);

//report routes
router.post("/submitReport", reportController().submitReport);
router.post("/getReports", reportController().getReports);

// admin routes
router.get("/demo", admin_reportsController().getAllReports);

module.exports = router;
