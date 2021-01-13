import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Services } from "../models/services.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn : "root" })

export class ServicesListService {

  url = environment.apiUrl + "service/";

  constructor(private http: HttpClient) { }

  getServicesList(servicesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${servicesPerPage}&page=${currentPage}`;
    return this.http.get<{message: string; services:any; count: number}>( this.url + "getServiceList"+ queryParams);
  }

  deactivateService(ServiceId: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>(this.url+"setServiceActiveStatus/"+ServiceId,httpOptions);
  }

  createService( ServiceName: string, PricePerHour: number ) {
    const serviceData: Services = { ServiceName: ServiceName, PricePerHour: PricePerHour, IsActive: true };
    this.http
      .post(this.url+"addNewService", serviceData)
      .subscribe(response => {
        console.log(response);
      });
  }
}
