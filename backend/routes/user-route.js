const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

//Get User List for Admin
router.get("/getUserList", UserController.getUserList);

//Update the IsActive state of User
router.put("/setUserActiveStatus/:UserId", UserController.setUserActiveStatus);

//Create appointment
router.post("/createAppointment", UserController.createAppointment);

//Update Appointment
router.put("/updateAppointment/:AppointmentId", UserController.updateAppointment);

//Create Address
router.post("/createAddress", UserController.createAddress);

//Update Address
router.put("/updateAddress/:AddressId", UserController.updateAddress);

module.exports = router;
