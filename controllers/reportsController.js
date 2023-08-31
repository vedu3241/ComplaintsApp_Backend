const fs = require("fs");
const Complaint = require("../models/complaints");
function reportsController() {
  return {
    submitReport(req, res) {
      const { ReporterId, Category, Latitude, Longitude, Address } = req.body;

      // Check if any field is empty
      if (!ReporterId || !Category || !Latitude || !Longitude || !Address) {
        return res.status(422).json({ message: "Fields cannot be empty" });
      }

      // Check if a file is uploaded
      if (!req.files || !req.files.reportImg) {
        return res.status(400).send("No file uploaded.");
      }

      // Process the file upload
      const uploadedImage = req.files.reportImg;
      // console.log(uploadedImage);
      // console.log(__dirname);
      const filePath = __dirname + "/uploads/" + uploadedImage.name;
      const imageName = uploadedImage.name;

      // Moving file to uploades
      uploadedImage.mv(filePath, (err) => {
        if (err) {
          res.status(500).send(err);
        }
        // File upload successful, proceed to save the report
        const complaint = new Complaint({
          reporterId: ReporterId,
          Category: Category,
          Latitude: Latitude,
          Longitude: Longitude,
          Address: Address,
          Image: imageName,
        });

        complaint
          .save()
          .then(() => {
            return res
              .status(201)
              .json({ message: "Complaint submitted successfully" });
          })
          .catch((err) => {
            console.log(`Error saving complaint: ${err}`);
            return res.status(500).json({
              message: "An error occurred while saving the complaint",
            });
          });
      });
    },
    async getReports(req, res) {
      const { userId } = req.body;
      data = await Complaint.find({ reporterId: userId });
      if (data) {
        res.status(200).json({ reports: data });
      } else {
        console.log("No reports found");
        return res.status(401).json({ message: "No reports found" });
      }
    },
  };
}

module.exports = reportsController;
