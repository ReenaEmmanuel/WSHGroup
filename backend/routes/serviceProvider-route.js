const express = require("express");
const router = express.Router();
const ServiceProvider = require("../models/dbSchema").serviceProviderSchema;
const Service = require("../models/dbSchema").serviceSchema;
const Rating = require("../models/dbSchema").ratingSchema;
const User = require("../models/dbSchema").userSchema;

router.post("/registerNew", (req, res) => {
  ServiceProvider.create({
    AppUserID: req.body.UserID,
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

router.get("/getServiceProviderList", function (req, res) {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  console.log(req.query);

  ServiceProvider.findAndCountAll({
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
    attributes: ["id", "ServiceID"],
    include: [
      {
        model: User,
        required: true,
        attributes: ["FirstName", "LastName", "Age", "Email"],
      },
      {
        model: Service,
        required: true,
        attributes: ["id", "ServiceName", "PricePerHour"],
      },
      {
        model: Rating,
        required: true,
        attributes: [
          "ServiceProviderID",
          "Rating",
          // [
          //   Rating.sequelize.fn("AVG", models.sequelize.col("ratings.Rating")),
          //   "ratingAvg",
          // ],
        ],
        group: ["ServiceProviderID"],
        // order: [
        //   [models.sequelize.fn("AVG", models.sequelize.col("Rating")), "DESC"],
        //],
      },
    ],
  })
    .then((result) => {
      res.status(200).json({
        message: "Service Providers extracted successfully",
        users: result.rows,
        count: result.count,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
});

module.exports = router;
