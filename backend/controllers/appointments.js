const User = require("../models/dbSchema").userSchema;
const Appointment = require("../models/dbSchema").appointmentSchema;
const Address = require("../models/dbSchema").addressSchema;
const Service = require("../models/dbSchema").serviceSchema;
const ServiceProvider = require("../models/dbSchema").serviceProviderSchema;

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
      },
    ],
  })
    .then((result) => {
      // let objJson = JSON.parse(JSON.stringify(result));
      // let objFinal = objJson.map((item) => {
      //   console.log(item.serviceprovider.id);
      //   return {
      //     ServiceProviderID: item.serviceprovider.id,
      //   };
      // });
      // let filteredObj = objFinal.filter(
      //         (item) => item.appointments.AppointmentDate === "2021-01-20"
      //       );
      // var objFinal = {ServiceProviderID:"",ServicePricePerHour:""};
      objFinal = JSON.parse(JSON.stringify(result));
      // let obj = result.map((item)=>{})
      for (let i = 0; i < result.length; i++) {
        objFinal[i].ServiceProviderID = result[i].serviceprovider.id;
        objFinal[i].ServicePricePerHour =
          result[i].serviceprovider.service.PricePerHour;
        delete objFinal[i].serviceprovider;
        for (let j = 0; j < result[i].appointments.length; j++) {
          if (result[i].appointments[j].AppointmentDate == appointmentDate) {
            delete objFinal[i];
            break;
          }
        }
      }

      res.status(200).json({
        message: "Service Providers extracted successfully",
        users: objFinal,
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
  const serviceProviderId = +req.params.id;
  Appointment.findAll({
    where: { ServiceProviderID: serviceProviderId },
    include: [
      {
        model: Address,
        required: true,
        attributes: [
          "DoorNo",
          "Street1",
          "Street2",
          "Area",
          "City",
          "State",
          "Pincode",
          "ContactNo",
          "AltContactNo",
        ],
      },
      {
        model: User,
        required: true,
      },
    ],
  })
    .then((result) => {
      objFinal = JSON.parse(JSON.stringify(result));
      for (let i = 0; i < objFinal.length; i++) {
        objFinal[i].DoorNo = objFinal[i].address.DoorNo;
        objFinal[i].Street1 = objFinal[i].address.Street1;
        objFinal[i].Street2 = objFinal[i].address.Street2;
        objFinal[i].Area = objFinal[i].address.Area;
        objFinal[i].City = objFinal[i].address.City;
        objFinal[i].State = objFinal[i].address.State;
        objFinal[i].Pincode = objFinal[i].address.Pincode;
        objFinal[i].ContactNo = objFinal[i].address.ContactNo;
        objFinal[i].AltContactNo = objFinal[i].address.AltContactNo;
        delete objFinal[i].address;

        objFinal[i].FirstName = objFinal[i].appuser.FirstName;
        objFinal[i].LastName = objFinal[i].appuser.LastName;
        objFinal[i].Age = objFinal[i].appuser.Age;
        objFinal[i].Email = objFinal[i].appuser.Email;
        delete objFinal[i].appuser;
      }
      res.status(200).json({
        message: "Appointments extracted successfully",
        addresses: objFinal,
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
