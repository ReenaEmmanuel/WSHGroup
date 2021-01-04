const sequelize = require("sequelize");

const con = require("../app").con;

const serviceProviderSchema = con.define("serviceProvider", {
  UserID: { type: sequelize.INTEGER, required: true },
  ServiceID: { type: sequelize.INTEGER, required: true },
  PricePerHour: { type: sequelize.DECIMAL(10, 2), required: true },
  Availability: { type: sequelize.STRING, required: true },
  AverageRating: { type: sequelize.INTEGER, required: true },
  IsActive: { type: sequelize.BOOLEAN, defaultValue: false },
});
serviceProviderSchema.sync();

const serviceSchema = con.define("service", {
  ServiceID: { type: sequelize.INTEGER, required: true },
  //PricePerHour : { type: sequelize.DECIMAL(10,2), required : true},
  ServiceName: { type: sequelize.STRING, required: true },
  IsActive: { type: sequelize.BOOLEAN, defaultValue: true },
});
serviceSchema.sync();

module.exports = {
  serviceProviderSchema: serviceProviderSchema,
  serviceSchema: serviceSchema,
};
