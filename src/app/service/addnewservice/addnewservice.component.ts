import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesListService } from '../servicelist.service';

@Component({
  selector: 'app-addnewservice',
  templateUrl: './addnewservice.component.html',
  styleUrls: ['./addnewservice.component.css']
})
export class AddnewserviceComponent{
  isLoading = false;

  constructor(public dataService: ServicesListService, private router: Router) {}


  add(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.dataService.createService(form.value.ServiceName, form.value.PricePerHour);

    this.router.navigate(["/"]);
  }
}
