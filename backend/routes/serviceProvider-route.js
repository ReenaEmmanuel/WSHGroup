const express = require("express");
const router = express.Router();
const SpController = require("../controllers/serviceProvider");

router.post("/registerNew", SpController.registerNew);

router.get("/getServiceProviderList", SpController.getList);

router.get("/createInvoice", SpController.createInvoice);

// router.get("/getServiceProviderListForEachService/:id", function (req, res) {
//   ServiceProvider.findAll({
//     where : { ServiceID : req.params.id },
//     attributes: ["id", "ServiceID"],
//     include: [
//       {
//         model: User,
//         required: true,
//         attributes: ["FirstName" , "LastName"],
//       }]
//   })
//     .then((result) => {
//       res.status(200).json({
//         message: "Service Providers extracted successfully",
//         users: result,
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: error,
//       });
//     });
// });
module.exports = router;
