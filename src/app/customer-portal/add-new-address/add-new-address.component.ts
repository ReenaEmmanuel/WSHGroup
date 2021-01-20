import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css']
})
export class AddNewAddressComponent implements OnInit {

  addressForm : FormGroup;
  address : Address ;
  userid : number;

  constructor() { }

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      Door: new FormControl(["", {validators: [Validators.required]}]),
      Street1: new FormControl(["", {validators: [Validators.required]}]),
      Street2: new FormControl(["", {validators: [Validators.required]}]),
      Area: new FormControl(["", {validators: [Validators.required]}]),
      City: new FormControl(["", {validators: [Validators.required]}]),
      State: new FormControl(["", {validators: [Validators.required]}]),
      Pincode: new FormControl(["", {validators: [Validators.pattern('[1-9]\\d{5}')]}]),
      Contact: new FormControl(["", {validators: [Validators.pattern('[6-9]\\d{9}')]}]),
      AlternateContact: new FormControl(["", {validators: [Validators.pattern('[6-9]\\d{9}')]}]),
  });
  }

  onSubmit(){

  }
}
