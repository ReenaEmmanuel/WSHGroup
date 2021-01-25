import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { Services } from 'src/app/models/services.model';
import { ServicesListService } from 'src/app/service/servicelist.service';
import { customerPortalService } from '../customer-portal.service';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
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
  pricePerHour : number;
  totalPrice :number = 0;
  totalTime : number;
  address : Address[] = [];
  addressId : any;
  addressID : number;
  paymentId :number;

  PaymentMethods : any[] =
  [{"PaymentMode_ID" : 1, "Mode" : "Online"},
  {"PaymentMode_ID" : 2, "Mode" : "Cash"},]

  constructor(private formBuilder: FormBuilder,private dataservice: ServicesListService, private service: customerPortalService, private router: Router) {

  }

  ngOnInit(): void {
    this.userid = sessionStorage.getItem("UserID");

    this.dataservice.getServicesList(100,1)
      .subscribe(res => {
        this.services = res.services;
      });

      this.form = new FormGroup({
        'ServiceID': new FormControl(null, Validators.required),
        'ServiceProviderID': new FormControl(null, Validators.required),
        'AppointmentDate': new FormControl(null, Validators.required),
        'Time' : new FormControl(null, Validators.required),
        'AddressID' : new FormControl(null, Validators.required),
        'PaymentID' : new FormControl(null, Validators.required),
      });

    this.service.getAddresses(this.userid).subscribe(res => {
      this.address= res.addresses;
      console.log(res);
    });

  }

  onServiceSelection(serviceId: any) {
    if(serviceId)
    {
      console.log(serviceId);
      this.selectedServiceID = serviceId;
      this.service.getServicesProviderListForEachService(serviceId)
        .subscribe( res => {
          this.serviceProviders = res.users;
          console.log(this.serviceProviders);
          this.calculatePricePerHour();
        });
    }
  }

  calculatePricePerHour(){
    if(this.serviceProviders){
      this.pricePerHour = this.serviceProviders[0].serviceprovider.service.PricePerHour;
      console.log(this.pricePerHour);
    }
  }

  onServiceProviderSelection(serviceProviderId : any)
  {
    if(this.serviceProviderID){
      console.log(serviceProviderId);
    }
  }

  onSubmit(){
    console.log(this.form);
    this.totalTime = +this.form.value.Time;
    this.totalPrice = this.totalTime * this.pricePerHour;
    this.service.createAppointment(+this.userid,this.form.value.ServiceProviderID, this.form.value.AppointmentDate, this.totalPrice, this.form.value.PaymentID);
    this.router.navigate(['/userhomepage']);
  }

  getAddressid(a: any){
    console.log(a);
  }
}
