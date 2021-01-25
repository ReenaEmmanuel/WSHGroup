const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

//Get User List for Admin
router.get("/getUserList", UserController.getUserList);

router.get("/getSpListForAdmin", UserController.getSpListForAdmin);

//Update the IsActive state of User
router.put("/setUserActiveStatus/:UserId", UserController.setUserActiveStatus);

//Create appointment
router.post("/createAppointment", UserController.createAppointment);

//Get Appointment list for a User
router.get("/getAppointmentList/:AppUserID", UserController.getAppointmentList);

//Update Appointment
router.put("/updateAppointment/:AppointmentId", UserController.updateAppointment);

//Create Address
router.post("/createAddress", UserController.createAddress);

//Update Address
router.put("/updateAddress/:AddressId", UserController.updateAddress);

//Get Service Provider list based on Service ID and Appointment Date
router.get("/getSpList/:id", UserController.getSpList);

//Get address
router.get("/getAddressList/:id", UserController.getAddressList);
module.exports = router;
