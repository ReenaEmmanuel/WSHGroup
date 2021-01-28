import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Services } from "../models/services.model";
import { environment } from "../../environments/environment";
import { Address } from "../models/address.model";
import { Appointments } from "../models/appointment.model";

@Injectable({ providedIn : "root" })

export class customerPortalService {

  url = environment.apiUrl + "serviceProvider/";
  userurl = environment.apiUrl + "user/";
  serviceurl = environment.apiUrl + "service/";
  appointmenturl = environment.apiUrl + "appointment/";

  constructor(private http: HttpClient) { }

  getServicesProviderListForEachService(id: number) {
    // const dateString = date.toISOString();
    return this.http.get<{message: string; users:any}>( this.appointmenturl + "getSpList/"+ id);
  }

  getPrice(id: number) {
    return this.http.get<{message: string; PricePerHour:any}>( this.serviceurl + "getPrice/"+ id);
  }

  getAddresses(id: number) {
    return this.http.get<{message: string; addresses:Address[]}>( this.userurl + "getAddressList/"+ id);
  }


  postAddress(userid: number, Door: number,Street1: string,Street2: string,Area: string,City: string, State: string,Pincode: number,Contact: number,AlternateContact:number) {
    const address: any = { AppUserID:userid, DoorNo:Door, Street1:Street1, Street2:Street2, Area: Area, City: City, State:State, Pincode:Pincode, ContactNo:Contact, AltContactNo:AlternateContact };
    this.http
      .post(this.userurl+"createAddress", address)
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  createAppointment(AppUserID: number, ServiceProviderID: number, AppointmentDate: any, totalCost : number, paymentId : number){
    const appointment: Appointments = { AppUserID: AppUserID, ServiceProviderID: ServiceProviderID, AppointmentDate: AppointmentDate, StartTime: null, EndTime: null, Status: 1, PaymentMode: paymentId, TotalCost: totalCost, IsPaid: 1 };
    this.http
    .post(this.userurl+"createAppointment", appointment)
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  getAppointmentList(appointmentsPerPage: number, currentPage: number, AppUserID: number) {
    const queryParams = `?pagesize=${appointmentsPerPage}&page=${currentPage}`;
    return this.http.get<{message: string; appointments:any; count: number}>(this.userurl+"getAppointmentList/" + AppUserID + queryParams);
  }

}
