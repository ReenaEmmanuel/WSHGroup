import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { customerPortalService } from '../customer-portal.service';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css']
})
export class AddNewAddressComponent implements OnInit {

  addressForm : FormGroup;

  userid : string;

  constructor(public dataService: customerPortalService, private router:Router ) { }

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      'Door': new FormControl(null, Validators.required),
      'Street1': new FormControl(null, Validators.required),
      'Street2': new FormControl(null, ),
      'Area': new FormControl(null, Validators.required),
      'City': new FormControl(null, Validators.required),
      'State': new FormControl(null, Validators.required),
      'Pincode': new FormControl(null, [Validators.required, Validators.pattern('[1-9]\\d{5}')]),
      'Contact': new FormControl(null, [Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      'AlternateContact': new FormControl(null, [ Validators.pattern('[6-9]\\d{9}')]),
  });
  }
  onSubmit(){
    this.dataService.postAddress(+this.userid,
      this.addressForm.value.Door,
      this.addressForm.value.Street1,
      this.addressForm.value.Street2,
      this.addressForm.value.Area,
      this.addressForm.value.City,
      this.addressForm.value.State,
      this.addressForm.value.Pincode,
      this.addressForm.value.Contact,
      this.addressForm.value.AlternateContact);

  this.router.navigate(["/userhomepage"])
}

}
