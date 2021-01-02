const sequelize = require('sequelize');
const con = require("./user").con;

const demoSchema = con.define(
  "demo",
  {
    FirstName : { type: sequelize.STRING, required : true},
    LastName :  { type: sequelize.STRING},
    Age : { type: sequelize.INTEGER, required : true},
    Email : { type: sequelize.STRING, required : true},
    UsrPwd : { type: sequelize.STRING, required : true},
    UsrRole : { type: sequelize.INTEGER, required : true},
});
demoSchema.sync();

module.exports = { demoSchema: demoSchema};
