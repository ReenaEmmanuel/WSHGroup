import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({ providedIn : "root" })

export class SpPortalService {

  url = environment.apiUrl + "serviceProvider/";

  constructor(private http: HttpClient) { }

  getServiceList(serviceId: number) {
    return this.http.get<{result: any}>(this.url+"getRegServiceList/" + serviceId);
  }

  unregister(id: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>(this.url+"setSpsActiveStatus/"+id,httpOptions);
  }

}
