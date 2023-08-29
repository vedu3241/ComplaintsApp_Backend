const fs = require("fs");

const Complaint = require("../models/complaints");
function reportsController() {
  return {
    submitReport(req, res) {
      console.log(req);
      const { ReporterId, Category, Latitude, Longitude, Address } = req.body;
      console.log(req.body);
      if (!req.body) {
        return res.status(422).json({ message: "Field's can not be empty" });
      } else {
        if (!req.files.image) {
          return res.status(400).send("No file uploaded.");
        } else {
          const uploadedImage = req.files.image;
          const filePath = __dirname + "/uploads/" + uploadedImage.name;
          uploadedImage.mv(filePath, (err) => {
            if (err) {
              return res.status(500).send(err);
            }

            res.send("File uploaded!");
          });
        }

        const complaint = new Complaint({
          reporterId: ReporterId,
          Category: Category,
          Latitude: Latitude,
          Longitude: Longitude,
          Address: Address,
        });

        complaint
          .save()
          .then((data) => {
            return res
              .status(201)
              .json({ message: "Complaint submitted successfully" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              message: "An error occurred while saving the complaint",
            });
          });
      }
    },
  };
}

module.exports = reportsController;
