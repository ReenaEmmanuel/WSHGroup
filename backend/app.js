const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/user-route");

/*mongoose.connect("mongodb://localhost:27017/demoDb")
.then(() => {
  console.log("Connection Established!!");
})
.catch(() => {
  console.log("Connection failed!!");
});

const Post = require('./models/post').Post;*/

const AppUser = require('./models/user').userSchema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

// app.get("/api/sqlConnect", (req, res, next) => {
//   AppUser.find( {
//     Email: req.body.Email
//   }).then(() => {
//     res.status(300).json({
//       message: 'Email ID already available in DB!'
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//     res.status(500).json({
//     message: "Error"
//   });
//   })
// });



app.use("/user",userRoutes);

module.exports = app;
