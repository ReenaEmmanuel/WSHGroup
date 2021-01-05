const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user").userSchema;

// const User = require("../models/demo").demoSchema;

const router = express.Router();


router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.UsrPwd, 10)
  .then(hash => User.create( {
    FirstName : req.body.FirstName,
    LastName : req.body.LastName,
    Age : req.body.Age,
    Email: req.body.Email,
    UsrPwd: hash,
    UsrRole: req.body.UsrRole,
    IsActive: req.body.IsActive
  }).then((newpost) => {
    res.status(201).json({
      message: 'User added successfully'
    });
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({
    message: "Error"
  });
  }))
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ where: { Email: req.body.Email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.UsrPwd, user.UsrPwd);
    })
    .then(result => {
      if (!result) {
        console.log("error")
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { Email: fetchedUser.Email, userId: fetchedUser.id, usrrole: fetchedUser.UsrRole },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      console.log(token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        UserId : fetchedUser.id,
        UsrRole : fetchedUser.UsrRole
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

//Get User List for Admin
router.get("/getuserlist", function (req, res) {
  User.findAll()
    .then((userList) => {
      res.json(userList);
      return userList;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    });
});

//Update the IsActive state of User
router.put("/setUserActiveStatus/:UserId", function (req, res) {
  User.update(
    { IsActive: false },
    { where: { id: req.params.UserId, IsActive: true } }
  )
    .then((rowsUpdated) => {
      if (rowsUpdated == 0) {
        User.update(
          { IsActive: true },
          { where: { id: req.params.UserId, IsActive: false } }
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


module.exports = router;
