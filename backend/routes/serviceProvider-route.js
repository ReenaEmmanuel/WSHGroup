const express = require("express");
const ServiceProvider = require("../models/user.js")
  .serviceProviderSchema;
const router = express.Router();

router.post("/registerNew", (req, res) => {
  ServiceProvider.create({
    UserID: req.body.UserID,
    ServiceID: req.body.ServiceID,
    IsActive: req.body.IsActive,
  })
    .then((newpost) => {
      res.status(201).json({
        message: "ServiceProvider registered successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

router.get("/getSpList", function (req, res) {
  //const pageSize = +req.query.pagesize;
  //const currentPage = +req.query.page;
  //console.log(req.query);

  ServiceProvider.findAndCountAll({
    where: { UsrRole: 1 },
    //limit: pageSize,
    //offset: pageSize * (currentPage - 1),
    include : {
      model: serviceProvider,
    }
    // include: [
    //   {
    //     association: "appusers",
    //     attributes: ["FirstName", "LastName", "Age", "Email"],
    //   },
    //   {
    //     association: "serviceproviders",
    //     attributes: ["UserID", "ServiceID"],
    //   },
    //   // {
    //   //   association: "services",
    //   //   attributes: ["id", "ServiceName", "PricePerHour"],
    //   // }
    // ],
  })
    .then((result) => {
      res
        .status(200)
        .json({
          message: "Service Providers extracted successfully",
          users: result.rows,
          count: result.count,
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error: " + error,
      });
    });
});

module.exports = router;
