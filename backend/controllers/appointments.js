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
        }
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
    where: { AppUserID: appUserId },
    include: [
      // {
      //   model : ServiceProvider,
      //   where: { id: serviceProviderId }
      // },
      {
        model: Service,
        required: true,
      },
      {
        model: Appointment,
        required: false,
        include: [
          {
            model: Address,
            required: true,
          },
          {
            model: User,
            required: true,
          },
        ],
      },
    ],
  })
    .then((result) => {
      objJson = JSON.parse(JSON.stringify(result));
      let filteredArray = objJson.filter(
        (item) => item.appointments.length > 0
      );
      // let objFinal = filteredArray.map((item) => {
      //   console.log(item.appointments.length);
      //   for (let i = 0; i < item.appointments.length; i++) {
      //     return {
      //       ServiceProviderAppUserID: item.AppUserID,
      //       ServiceProviderID: item.id,
      //       ServiceID: item.serviceId,
      //       ServiceName: item.service.ServiceName,
      //       //Appointments: item.appointments,
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
      //     };
      //   }
      // });
      let objFinal = filteredArray.map((item) => {
        console.log(item.appointments.length);
        for (let i = 0; i < item.appointments.length; i++) {
            objFinal.ServiceProviderAppUserID= item.AppUserID;
            objFinal.ServiceProviderID= item.id;
            // ServiceID: item.serviceId,
            // ServiceName: item.service.ServiceName,
            //Appointments: item.appointments,
            objFinal.AppointmentDate= item.appointments[i].AppointmentDate;
            objFinal.ClientFirstName= item.appointments[i].appuser.FirstName;
            objFinal.ClientLastName= item.appointments[i].appuser.LastName;
            objFinal.ClientAddressDoorNo= item.appointments[i].address.DoorNo;
            objFinal.ClientAddressStreet1= item.appointments[i].address.Street1;
            // ClientAddressStreet2: item.appointments[i].address.Street2,
            // ClientAddressArea: item.appointments[i].address.Area,
            // ClientAddressCity: item.appointments[i].address.City,
            // ClientAddressState: item.appointments[i].address.State,
            // ClientAddressCity: item.appointments[i].address.Pincode,
            // ClientAddressContactNo: item.appointments[i].address.ContactNo,
            // ClientAddressAltContactNo:
            //   item.appointments[i].address.AltContactNo,
        }

      });
      console.log(objFinal);
      res.status(200).json({
        message: "Appointments extracted successfully",
        Appointments: objFinal,
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
