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
  appointmentDate : any;
  serviceProviderID : any;

  constructor(private formBuilder: FormBuilder,private dataservice: ServicesListService, private service: customerPortalService) {

  }

  ngOnInit(): void {
    this.dataservice.getServicesList(100,1)
      .subscribe(res => {
        this.services = res.services;
      });

      this.form = this.formBuilder.group({
        ServiceName: [null, Validators.required],
        appointmentDate : ["", Validators.required],
        ServiceProvider : ["", Validators.required]
        })
  }

  onServiceSelection(serviceId: any) {
    console.log(serviceId);
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
}
