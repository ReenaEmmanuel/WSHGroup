const express = require("express");

const ServiceProvider = require("../models/service")
  .serviceProviderSchema;

const router = express.Router();

//Add new Service Provider
router.post("/addNewSP", (req, res) => {
  ServiceProvider.create({
    UserID: req.body.UserID,
    ServiceID: req.body.ServiceID,
    Availability: req.body.Availability,
    AverageRating: 0,
    IsActive: true
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
router.put("/setSpActiveStatus/:SpId", function (req, res) {
  ServiceProvider.update(
    { IsActive: false },
    { where: { id: req.params.SpId, IsActive: true } }
  )
    .then(function (rowsUpdated) {
      if (rowsUpdated == 0) {
        User.update(
          { IsActive: true },
          { where: { id: req.params.SpId, IsActive: false } }
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

//Delete Service Provider
router.put("/deleteSp/:SpId", function (req, res) {
  ServiceProvider.destroy(
    { where: { id: req.params.SpId, IsActive: false } }
  )
    .then(function (rowsDeleted) {
      if (rowsDeleted == 1) {
        console.log('Service Provider deleted successfully');
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
router.get("/getSpList", function (req, res) {
  ServiceProvider.findAll()
    .then((spList) => {
      res.json(spList);
      return spList;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

module.exports = router;

