import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Services } from "../models/services.model";

@Injectable({ providedIn : "root" })

export class ServicesListService {

  constructor(private http: HttpClient) { }

  getServicesList() {
    return this.http.get<Services[]>("http://localhost:3000/user/getuserlist");
  }


}
