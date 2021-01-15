const ServiceProvider = require("../models/dbSchema").serviceProviderSchema;
const Service = require("../models/dbSchema").serviceSchema;
const Rating = require("../models/dbSchema").ratingSchema;
const User = require("../models/dbSchema").userSchema;
const Invoice = require("../models/dbSchema").invoiceSchema;

exports.registerNew = (req, res) => {
  ServiceProvider.create({
    AppUserID: req.body.UserID,
    ServiceID: req.body.ServiceID,
    IsActive: req.body.IsActive,
  })
    .then((newpost) => {
      /* Rating.create({
        ServiceProviderID: req.body.UserID
      })
        .then(() => {
          // res.status(201).json({
          //   message: "ServiceProvider registered successfully",
          // });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: "Error",
          });
        });*/
      res.status(201).json({
        message: "ServiceProvider registered successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.getList = function (req, res) {
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
        attributes: [
          "ServiceProviderID",
          [
            Rating.sequelize.fn("AVG", Rating.sequelize.col("ratings.Rating")),
            "ratingAvg",
          ],
        ],
        group: ["ServiceProviderID", "ServiceID"],
        order: [
          [Rating.sequelize.fn("AVG", Rating.sequelize.col("Rating")), "DESC"],
        ],
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
};

exports.createInvoice = (req, res) => {
  Invoice.create({
    InvoiceDate: req.body.InvoiceDate,
    AppointmentID: req.body.AppointmentID,
  })
    .then((newpost) => {
      res.status(201).json({
        message: "Invoice created successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};
