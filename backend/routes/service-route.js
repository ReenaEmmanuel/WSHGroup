const express = require("express");

const ServiceProvider = require("../models/service")
  .serviceProviderSchema;

  const Service = require("../models/service")
  .serviceSchema;

const router = express.Router();

router.post("", (req, res, next) => {
  ServiceProvider.create({
    UserID: req.body.UserID,
    ServiceID: req.body.ServiceID,
    PricePerHour: req.body.PricePerHour,
    Availability: req.body.Availability
    //IsActive: req.body.IsActive
  })
    .then((newpost) => {
      res.status(201).json({
        message: "Service Provider added successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

//Update the IsActive state of Service Provider
router.put("", function (req, res, next) {
  ServiceProvider.update(
    { IsActive: req.body.IsActive },
    { where: req.params.ServiceProviderID }
  )
    .then(function (rowsUpdated) {
      res.json(rowsUpdated);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

//Create new Service
router.post("", (req, res, next) => {
  Service.create({
    //PricePerHour: req.body.PricePerHour,
    ServiceName: req.body.ServiceName
    //IsActive: req.body.IsActive
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
router.put("", function (req, res, next) {
  Service.update(
    { IsActive: req.body.IsActive },
    { where: req.params.ServiceID }
  )
    .then(function (rowsUpdated) {
      res.json(rowsUpdated);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

module.exports = router;

