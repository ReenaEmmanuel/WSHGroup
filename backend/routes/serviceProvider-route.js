const express = require("express");
const router = express.Router();
const SpController = require("../controllers/serviceProvider");

router.post("/registerNew", SpController.registerNew);

router.get("/getServiceProviderList", SpController.getList);

router.get("/createInvoice", SpController.createInvoice);

module.exports = router;
