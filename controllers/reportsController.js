const fs = require("fs");
const Complaint = require("../models/complaints");

function reportsController() {
  return {
    submitReport(req, res) {
      const {
        ReporterId,
        Category,
        Latitude,
        Longitude,
        Address,
        Description,
      } = req.body;

      // Check if any field is empty
      if (
        !ReporterId ||
        !Category ||
        !Latitude ||
        !Longitude ||
        !Address ||
        !Description
      ) {
        return res
          .status(422)
          .json({ message: "Error1: Fields cannot be empty" });
      }

      // Check if a file is uploaded
      //reportImg for single
      if (!req.files || !req.files.reportImages) {
        return res.status(400).send("Error2: No file uploaded.");
      }
      console.log("passed file check!");
      // // Process the file upload

      //multiple images
      const uploadedImages = Array.isArray(req.files.reportImages)
        ? req.files.reportImages
        : [req.files.reportImages];
      const imageNames = [];
      let completedUploads = 0; // Counter for completed uploads

      uploadedImages.forEach((uploadedImage) => {
        const filePath = __dirname + "/uploads/" + uploadedImage.name;
        const imageName = uploadedImage.name;
        imageNames.push(imageName);

        // Moving file to uploads folder which is under controllers folder
        uploadedImage.mv(filePath, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          completedUploads++;

          if (completedUploads === uploadedImages.length) {
            console.log(imageNames);
            const complaint = new Complaint({
              reporterId: ReporterId,
              Category: Category,
              Latitude: Latitude,
              Longitude: Longitude,
              Address: Address,
              Description: Description,
              Images: imageNames,
            });
            // console.log(complaint);
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
          }
        });
      });
    },
    async getReports(req, res) {
      const { userId } = req.body;
      data = await Complaint.find({ reporterId: userId });
      if (data && data.length > 0) {
        data.reverse();

        res.status(200).json({ reports: data });
      } else {
        console.log("No reports found");
        return res.status(401).json({ message: "No reports found" });
      }
    },
  };
}

module.exports = reportsController;
