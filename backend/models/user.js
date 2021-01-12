const sequelize = require("sequelize");
//test comment
const con = new sequelize("wshgroup", "root", "Psiog@123", {
  host: "127.0.0.1",
  dialect: "mysql",
});

const userSchema = con.define("appusers", {
  FirstName: { type: sequelize.STRING, required: true },
  LastName: { type: sequelize.STRING },
  Age: { type: sequelize.INTEGER, required: true },
  Email: { type: sequelize.STRING, required: true },
  UsrPwd: { type: sequelize.STRING, required: true },
  UsrRole: { type: sequelize.INTEGER, required: true },
  IsActive: { type: sequelize.BOOLEAN, defaultValue: true },
});
userSchema.sync();

const serviceSchema = con.define("services", {
  ServiceName: { type: sequelize.STRING, required: true },
  PricePerHour: { type: sequelize.DECIMAL(10, 2), required: true },
  IsActive: { type: sequelize.BOOLEAN, defaultValue: true },
});
serviceSchema.sync();

const serviceProviderSchema = con.define("serviceproviders", {
  UserID: { type: sequelize.INTEGER },
  ServiceID: { type: sequelize.INTEGER },
  // PricePerHour: { type: sequelize.DECIMAL(10, 2), required: true },
  Availability: { type: sequelize.STRING, defaultValue: true },
  AverageRating: { type: sequelize.INTEGER },
  IsActive: { type: sequelize.BOOLEAN, defaultValue: true },
});
serviceProviderSchema.sync();

userSchema.hasMany(serviceProviderSchema,{
  foriegnKey: 'UserID'
});
serviceProviderSchema.belongsTo(userSchema);
// serviceProviderSchema.hasMany(serviceSchema);
// serviceSchema.belongsToMany(userSchema,{through: 'serviceProviderSchema'});

module.exports = {
  userSchema: userSchema,
  con: con,
  serviceProviderSchema: serviceProviderSchema,
  serviceSchema: serviceSchema,
};
