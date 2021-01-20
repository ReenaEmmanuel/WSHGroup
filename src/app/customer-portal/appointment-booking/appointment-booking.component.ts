import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Services } from 'src/app/models/services.model';
import { ServicesListService } from 'src/app/service/servicelist.service';
import { customerPortalService } from '../customer-portal.service';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {

  services : Services[] = [];
  serviceProviders : any[] = [];
  // isLoading = false;
  form: any;
  serviceID : any;
  date : any;
  appointmentDate : any;
  serviceProviderID : any;
  selectedDate : Date;
  selectedServiceID : number;
  userid : any;
  constructor(private formBuilder: FormBuilder,private dataservice: ServicesListService, private service: customerPortalService) {

  }

  ngOnInit(): void {
    this.dataservice.getServicesList(100,1)
      .subscribe(res => {
        this.services = res.services;
      });

      this.form = new FormGroup({
        'ServiceID': new FormControl(null, Validators.required),
        'ServiceProviderID': new FormControl(null, Validators.required),
        'AppointmentDate': new FormControl(null, Validators.required),
      });

      this.userid = sessionStorage.getItem("UserID");
  }

  onServiceSelection(serviceId: any) {
    console.log(serviceId);
    this.selectedServiceID = serviceId;
    this.service.getServicesProviderListForEachService(serviceId)
      .subscribe( res => {
        this.serviceProviders = res.users;
        console.log(this.serviceProviders);
      });
  }

  onServiceProviderSelection(serviceProviderId : any)
  {
    console.log(serviceProviderId);
  }

  inputEvent(event : any){
    console.log(event.value);
  }

  onSubmit(){
    console.log(this.form);
    this.service.createAppointment(+this.userid,this.form.value.ServiceProviderID, this.form.value.AppointmentDate);
  }
}
