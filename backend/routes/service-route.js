const express = require("express");

const Service = require("../models/user")
  .serviceSchema;

const router = express.Router();

//Create new Service
router.post("/addNewService", (req, res) => {
  Service.create({
    PricePerHour: req.body.PricePerHour,
    ServiceName: req.body.ServiceName,
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
