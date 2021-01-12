import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";


@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})

export class SignupComponent {
  isLoading = false;
  UsrRole = 0;
  constructor(public authService: AuthService, private router: Router) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;

    this.authService.createUser(form.value.FirstName, form.value.LastName, form.value.Age, form.value.Email, form.value.UsrPwd, form.value.UsrRole);

    this.router.navigate(["/login"]);
}
}
