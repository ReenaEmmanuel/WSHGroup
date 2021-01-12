import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData, LoginData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment"

@Injectable({ providedIn : "root" })

export class AuthService {

  private token!: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer : any;
  private UserId: any;
  private UsrRole: any;
  apiUrl = environment.apiUrl;

  constructor( private http:HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.UserId;
  }

  getUsrRole() {
    return this.UsrRole;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser( FirstName: string, LastName: string, Age: number, Email: string, UsrPwd: string, UsrRole: number ) {
    const authData: AuthData = { FirstName: FirstName, LastName: LastName, Age: Age, Email: Email, UsrPwd: UsrPwd, UsrRole: UsrRole, IsActive: true };
    this.http
      .post("http://localhost:3000/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(Email: string, UsrPwd: string) {
    const authData: LoginData = { Email: Email, UsrPwd: UsrPwd };
    this.http.post<{ token: string; expiresIn: number, UserId: string, UsrRole: number }>(
        "http://localhost:3000/user/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.UserId = response.UserId;
          this.UsrRole = response.UsrRole;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.UserId, this.UsrRole);
          this.router.navigate(["/"]);
        }
      });
  }

  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.UserId = null;
    this.UsrRole = null;
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.UserId = authInformation.UserId;
      this.UsrRole = authInformation.UsrRole;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, UserId: string, UsrRole: number) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("expiration", expirationDate.toISOString());
    sessionStorage.setItem("UserID",UserId);
    sessionStorage.setItem("UsrRole", JSON.stringify(UsrRole));
  }

  private clearAuthData() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expiration");
    sessionStorage.removeItem("UserID");
    sessionStorage.removeItem("UsrRole");
  }

  private getAuthData() {
    const token = sessionStorage.getItem("token");
    const expirationDate = sessionStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      UserId: this.UserId,
      UsrRole: this.UsrRole
    }
  }
}




