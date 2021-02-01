const User = require("../models/dbSchema").userSchema;
const Appointment = require("../models/dbSchema").appointmentSchema;
const Address = require("../models/dbSchema").addressSchema;
const Service = require("../models/dbSchema").serviceSchema;
const ServiceProvider = require("../models/dbSchema").serviceProviderSchema;
const sequelize = require("sequelize");

exports.getSpList = function (req, res) {
  const serviceId = +req.params.id;
  const appointmentDate = +req.params.date;
  User.findAll({
    attributes: ["id", "FirstName", "LastName"],
    include: [
      {
        model: ServiceProvider,
        required: true,
        attributes: ["id", "ServiceID", "AppUserID"],
        where: {
          ServiceID: serviceId,
        },
        include: {
          model: Service,
          required: true,
          attributes: ["PricePerHour"],
        },
      },
      {
        model: Appointment,
        attributes: ["AppointmentDate", "AddressID"],
        // where: {
        //   AppointmentDate:
        //   {
        //     [sequelize.Op.not]: '2021-01-20'
        //   },
        // $or:
        //   {
        //     AppointmentDate: null
        //     //   {
        //     //       $eq: null
        //     //   }
        //   },
        // }
      },
    ],
  })
    .then((result) => {
      let objJson = JSON.parse(JSON.stringify(result));
      let filteredArray = objJson.filter(
        (item) => item.appointments.length === 0
      );
      // filteredArray = objJson.filter(
      //   (item) => item.appointments.length > 0 &&
      // );

      let objFinal = filteredArray.map((item) => {
        return {
          FirstName: item.FirstName,
          LastName: item.LastName,
          PricePerHour: item.serviceprovider.service.PricePerHour,
        };
      });

      res.status(200).json({
        message: "Service Providers extracted successfully",
        serviceProvider: result,
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
      /*let objFinal = objJson.map((item) => {
        console.log(item.appointments.length);
        return {
          ServiceProviderAppUserID: item.AppUserID,
          ServiceProviderID: item.id,
          ServiceID: item.serviceId,
          ServiceName: item.service.ServiceName,
          Appointments: item.appointments,
          //       AppointmentDate: item.appointments[i].AppointmentDate,
          //       ClientFirstName: item.appointments[i].appuser.FirstName,
          //       ClientLastName: item.appointments[i].appuser.LastName,
          //       ClientAddressDoorNo: item.appointments[i].address.DoorNo,
          //       ClientAddressStreet1: item.appointments[i].address.Street1,
          //       ClientAddressStreet2: item.appointments[i].address.Street2,
          //       ClientAddressArea: item.appointments[i].address.Area,
          //       ClientAddressCity: item.appointments[i].address.City,
          //       ClientAddressState: item.appointments[i].address.State,
          //       ClientAddressCity: item.appointments[i].address.Pincode,
          //       ClientAddressContactNo: item.appointments[i].address.ContactNo,
          //       ClientAddressAltContactNo:
          //         item.appointments[i].address.AltContactNo,
        };
      });*/

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
      Status: 4,
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
