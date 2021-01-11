import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({ providedIn : "root" })

export class UserListService {

  constructor(private http: HttpClient) { }

  getUsersList(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    return this.http.get<{message: string; users:any; count: number}>("http://localhost:3000/user/getUserList"+ queryParams);
  }

  getServiceProviderList() {
    return this.http.get<User[]>("http://localhost:3000/user/getServiceProviderList");
  }

  deactivateUser(UserId: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>("http://localhost:3000/user/setUserActiveStatus/"+UserId,httpOptions);
  }

}
