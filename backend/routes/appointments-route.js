const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointments");

//Get Service Provider list based on Service ID and Appointment Date
router.get("/getSpList/:id", AppointmentController.getSpList);

router.get("/getAppointmentList/:id", AppointmentController.getAppointmentList);

//Close Appointment
router.put("/closeAppointment/:AppointmentId", AppointmentController.closeAppointment);

module.exports = router;
