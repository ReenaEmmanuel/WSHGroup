const express = require("express");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const Service = require("../models/dbSchema").serviceSchema;

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

//Create new Service
router.post("/addNewService",multer({ storage: storage }).single("image"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  Service.create({
    PricePerHour: req.body.PricePerHour,
    ServiceName: req.body.ServiceName,
    image: url + "/images/" + req.file.filename,
    IsActive: true
  })
    .then((newpost) => {
      res.status(201).json({
        message: "Service added successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

//Update the IsActive state of Service
router.put("/setServiceActiveStatus/:ServiceId", function (req, res) {
  Service.update(
    { IsActive: false },
    { where: { id: req.params.ServiceId, IsActive: true } }
  )
    .then(function (rowsUpdated) {
      if (rowsUpdated == 0) {
        Service.update(
          { IsActive: true },
          { where: { id: req.params.ServiceId, IsActive: false } }
        );
      }
      res.json(rowsUpdated);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

//Delete Service
router.put("/deleteService/:ServiceId", function (req, res) {
  Service.destroy(
    { where: { id: req.params.ServiceId, IsActive: false } }
  )
    .then(function (rowsDeleted) {
      if (rowsDeleted == 1) {
        console.log('Deleted successfully');
      }
      res.json(rowsDeleted);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

//Get Services List for Admin
// router.get("/getServiceList", function (req, res) {
//   Service.findAll()
//     .then((servicesList) => {
//       res.json(servicesList);
//       return servicesList;
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: "Error",
//       });
//     });
// });

//Get Services List for Admin
router.get("/getServiceList", function (req, res) {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  console.log(req.query);

  Service.findAndCountAll({
     limit: pageSize,
     offset: pageSize * (currentPage-1),
  })
    .then((result) => {
      res.status(200).json({ message: "Services extracted successfully",
      services : result.rows,
      count : result.count });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
});

module.exports = router;
