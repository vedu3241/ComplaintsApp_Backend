const Complaint = require("../../models/complaints");
function admin_reportsController() {
  return {
    async getAllReports(req, res) {
      allReports = await Complaint.find({});
      res.render("home", { allReports: allReports });
    },
  };
}

module.exports = admin_reportsController;
