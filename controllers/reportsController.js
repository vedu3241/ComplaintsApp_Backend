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
      //reportImg for single
      if (!req.files || !req.files.reportImages) {
        return res.status(400).send("No file uploaded.");
      }
      console.log("passed file check!");
      // // Process the file upload
      // const uploadedImage = req.files.reportImg;
      // // console.log(uploadedImage);
      // const imageName = uploadedImage.name;
      // const filePath = __dirname + "/uploads/" + uploadedImage.name;

      //multiple images
      const uploadedImages = req.files.reportImages;
      const imageNames = [];
      let completedUploads = 0; // Counter for completed uploads

      uploadedImages.forEach((uploadedImage) => {
        const filePath = __dirname + "/uploads/" + uploadedImage.name;
        const imageName = uploadedImage.name;
        imageNames.push(imageName);

        // Moving file to uploads
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
              Images: imageNames,
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
          }
        });
      });

      // Moving file to uploades
      // uploadedImage.mv(filePath, (err) => {
      //   if (err) {
      //     res.status(500).send(err);
      //   }
      //   // File upload successful, proceed to save the report

      //   const complaint = new Complaint({
      //     reporterId: ReporterId,
      //     Category: Category,
      //     Latitude: Latitude,
      //     Longitude: Longitude,
      //     Address: Address,
      //     Image: imageName,
      //   });

      //   complaint
      //     .save()
      //     .then(() => {
      //       return res
      //         .status(201)
      //         .json({ message: "Complaint submitted successfully" });
      //     })
      //     .catch((err) => {
      //       console.log(`Error saving complaint: ${err}`);
      //       return res.status(500).json({
      //         message: "An error occurred while saving the complaint",
      //       });
      //     });
      // });
    },
    async getReports(req, res) {
      const { userId } = req.body;
      data = await Complaint.find({ reporterId: userId });
      if (data) {
        // console.log(data[1].Images.length);
        res.status(200).json({ reports: data });
      } else {
        console.log("No reports found");
        return res.status(401).json({ message: "No reports found" });
      }
    },
  };
}

module.exports = reportsController;
