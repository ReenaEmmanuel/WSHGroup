const sequelize = require('sequelize');
//test comment
const con = new sequelize("wshgroup","root","Psiog@123",{host:"127.0.0.1", dialect: "mysql"});

const userSchema = con.define(
  "AppUsers",
  {
    FirstName : { type: sequelize.STRING, required : true},
    LastName : { type: sequelize.STRING},
    Age : { type: sequelize.INTEGER, required : true},
    Email : { type: sequelize.STRING, required : true},
    UsrPwd : { type: sequelize.STRING, required : true},
    UsrRole : { type: sequelize.INTEGER, required : true},
    IsActive : { type: sequelize.BOOLEAN, defaultValue: true},
});
userSchema.sync();

module.exports = {userSchema: userSchema, con: con};
