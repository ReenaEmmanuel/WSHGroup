import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";


@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})

export class SignupComponent {
  isLoading = false;
  UsrRole = 0;
  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;

    // if(form.value.UsrRole == "Service Provider"){
    //   this.UsrRole = 1;
    // }
    // else{
    //   this.UsrRole = 2;
    // }


    this.authService.createUser(form.value.FirstName, form.value.LastName, form.value.Age, form.value.Email, form.value.UsrPwd, form.value.UsrRole);
}
}
