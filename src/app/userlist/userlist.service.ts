import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({ providedIn : "root" })

export class UserListService {

  constructor(private http: HttpClient) { }

  // public getUsersList() {
  //   console.log(this.http.get("http://localhost:3000/user/getuserlist"));
  //   return this.http.get("http://localhost:3000/user/getuserlist");
  // }

  getUsersList() {
    return this.http.get<User[]>("http://localhost:3000/user/getuserlist");
  }


}
