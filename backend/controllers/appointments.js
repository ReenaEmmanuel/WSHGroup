const User = require("../models/dbSchema").userSchema;
const Appointment = require("../models/dbSchema").appointmentSchema;
const Address = require("../models/dbSchema").addressSchema;
const Service = require("../models/dbSchema").serviceSchema;
const ServiceProvider = require("../models/dbSchema").serviceProviderSchema;
const sequelize = require("sequelize");

exports.getSpList = function (req, res) {
  const serviceId = +req.params.id;
  // const appointmentDate = +req.params.date;
  User.findAll({
    attributes: ["id", "FirstName", "LastName"],
    where: { IsActive: true },
    include: [
      {
        model: ServiceProvider,
        required: true,
        attributes: ["id", "ServiceID", "AppUserID"],
        where: {
          ServiceID: serviceId,
          IsActive: true
        },
        include: {
          model: Service,
          required: true,
          attributes: ["PricePerHour"],
        },
      },
      // {
      //   model: Appointment,
      //   attributes: ["AppointmentDate", "AddressID"],
      //   // where: {
      //   //   AppointmentDate: '2021-01-20',
      //   // },
      //   // $and:[{
      //   //   AppointmentDate: '2021-01-19',
      //   //   where: sequelize.where(
      //   //       sequelize.col("appointments.AppointmentDate"),
      //   //       "IS",
      //   //       null // working code
      //   //     ),
      //   // },
      //   // ]
      //   //   where: {
      //   //     $or: [
      //   //       {
      //   //         AppointmentDate: '2021-01-20',
      //   //       },
      //   //       {
      //   //         AppointmentDate: null,

      //   //       },
      //   //     ],
      //   //   },  -- not working
      // },
    ],
    // where:{where: sequelize.where(
    //   sequelize.col("appointments.AppointmentDate"),
    //   "IS",
    //   null // working code
    // ),
    // $or: {AppointmentDate: '2021-01-22'}
    // },
  })
    .then((result) => {
      let objJson = JSON.parse(JSON.stringify(result));
      let objFinal = objJson.map((item) => {
        return {
          FirstName: item.FirstName,
          LastName: item.LastName,
          AppUserID: item.serviceprovider.AppUserID,
          ServiceProviderID: item.serviceprovider.id,
          ServiceID: item.serviceprovider.ServiceID,
          PricePerHour: item.serviceprovider.service.PricePerHour,
        };
      });
      // let filteredArray = objJson.filter(
      //   (item) => item.appointments.length === 0
      // );
      // // filteredArray = objJson.filter(
      // //   (item) => item.appointments.length > 0 &&
      // // );

      // let objFinal = filteredArray.map((item) => {
      //   return {
      //     FirstName: item.FirstName,
      //     LastName: item.LastName,
      //     PricePerHour: item.serviceprovider.service.PricePerHour,
      //   };
      // });

      res.status(200).json({
        message: "Service Providers extracted successfully",
        serviceProvider: objFinal,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.getAppointmentList = function (req, res) {
  const appUserId = +req.params.id;
  ServiceProvider.findAll({
    attributes: ["AppUserID", "ServiceID"],
    where: { AppUserID: appUserId },
    include: [
      {
        model: Service,
        required: true,
        attributes: ["ServiceName", "PricePerHour"],
      },
      {
        model: Appointment,
        required: true,
        attributes: [
          "id",
          "AppUserID",
          "AppointmentDate",
          "Status",
          "PaymentMode",
          "TotalCost",
          "IsPaid",
        ],
        include: [
          {
            model: Address,
            required: true,
          },
          {
            model: User,
            required: true,
            attributes: ["FirstName", "LastName"],
          },
        ],
      },
    ],
  })
    .then((result) => {
      objJson = JSON.parse(JSON.stringify(result));
      for (let i = 0; i < objJson.length; i++) {
        objJson[i].ServiceName = objJson[i].service.ServiceName;
        objJson[i].PricePerHour = objJson[i].service.PricePerHour;
        delete objJson[i].service;
        console.log(objJson[i].appointments.length);
        for (let j = 0; j < objJson[i].appointments.length; j++) {
          objJson[i].appointments[j].id = objJson[i].appointments[j].id;
          objJson[i].appointments[j].ClientFirstName = objJson[i].appointments[j].appuser.FirstName;
          objJson[i].appointments[j].ClientLastName = objJson[i].appointments[j].appuser.LastName;
          objJson[i].appointments[j].ClientAddressDoorNo = objJson[i].appointments[j].address.DoorNo;
          objJson[i].appointments[j].ClientAddressStreet1 = objJson[i].appointments[j].address.Street1;
          objJson[i].appointments[j].ClientAddressStreet2 = objJson[i].appointments[j].address.Street2;
          objJson[i].appointments[j].ClientAddressArea = objJson[i].appointments[j].address.Area;
          objJson[i].appointments[j].ClientAddressCity = objJson[i].appointments[j].address.City;
          objJson[i].appointments[j].ClientAddressState = objJson[i].appointments[j].address.State;
          objJson[i].appointments[j].ClientAddressCity = objJson[i].appointments[j].address.Pincode;
          objJson[i].appointments[j].ClientAddressContactNo = objJson[i].appointments[j].address.ContactNo;
          objJson[i].appointments[j].ClientAddressAltContactNo = objJson[i].appointments[j].address.AltContactNo;
          delete objJson[i].appointments[j].address;
          delete objJson[i].appointments[j].appuser;
        }
      }
      // let filteredArray = objJson.filter(
      //   (item) => item.appointments.length > 0
      // );
      res.status(200).json({
        message: "Appointments extracted successfully",
        Appointments: objJson,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

//Close Appointment
exports.closeAppointment = (req, res) => {
  Appointment.update(
    {
      Status: 2,
    },
    { where: { id: req.params.AppointmentId } }
  )
    .then((newpost) => {
      res.status(201).json({
        message: "Appointment updated successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

//Cancel Appointment
exports.cancelAppointment = (req, res) => {
  Appointment.update(
    {
      Status: 3,
    },
    { where: { id: req.params.AppointmentId } }
  )
    .then((newpost) => {
      res.status(201).json({
        message: "Appointment updated successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};

exports.getUserAppointmentList = function (req, res) {
  const appUserId = +req.params.id;
  User.findAll({
    attributes: ["id", "FirstName", "LastName"],
    where: { id: appUserId },
    include: [
      {
        model: Appointment,
        required: true,
        attributes: [
          "id",
          "AppUserID",
          "AppointmentDate",
          "Status",
          "PaymentMode",
          "TotalCost",
          "IsPaid",
        ],
        include: [
          {
            model: Address,
            required: true,
          },
          {
            model: ServiceProvider,
            required: true,
            //attributes: ["FirstName", "LastName"],
            include: [
              {
                model: User,
                required: true,
                attributes: ["FirstName", "LastName"],
              },
              {
                model: Service,
                required: true,
                attributes: ["id", "ServiceName", "PricePerHour"],
              },
            ],
          },
        ],
      },
    ],
  })
    .then((result) => {
      objJson = JSON.parse(JSON.stringify(result));
      for (let i = 0; i < objJson.length; i++) {
        for (let j = 0; j < objJson[i].appointments.length; j++) {
          objJson[i].appointments[j].SpFirstName =
            objJson[i].appointments[j].serviceprovider.appuser.FirstName;
          objJson[i].appointments[j].SpLastName =
            objJson[i].appointments[j].serviceprovider.appuser.LastName;
          objJson[i].appointments[j].ServiceName =
            objJson[i].appointments[j].serviceprovider.service.ServiceName;
          objJson[i].appointments[j].PricePerHour =
            objJson[i].appointments[j].serviceprovider.service.PricePerHour;
          delete objJson[i].appointments[j].serviceprovider;

          objJson[i].appointments[j].ClientAddressDoorNo =
            objJson[i].appointments[j].address.DoorNo;
          objJson[i].appointments[j].ClientAddressStreet1 =
            objJson[i].appointments[j].address.Street1;
          objJson[i].appointments[j].ClientAddressStreet2 =
            objJson[i].appointments[j].address.Street2;
          objJson[i].appointments[j].ClientAddressArea =
            objJson[i].appointments[j].address.Area;
          objJson[i].appointments[j].ClientAddressCity =
            objJson[i].appointments[j].address.City;
          objJson[i].appointments[j].ClientAddressState =
            objJson[i].appointments[j].address.State;
          objJson[i].appointments[j].ClientAddressCity =
            objJson[i].appointments[j].address.Pincode;
          objJson[i].appointments[j].ClientAddressContactNo =
            objJson[i].appointments[j].address.ContactNo;
          objJson[i].appointments[j].ClientAddressAltContactNo =
            objJson[i].appointments[j].address.AltContactNo;
          delete objJson[i].appointments[j].address;
        }
      }

      res.status(200).json({
        message: "Appointments extracted successfully",
        Appointments: objJson,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    });
};
