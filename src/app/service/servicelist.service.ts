import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Services } from "../models/services.model";

@Injectable({ providedIn : "root" })

export class ServicesListService {

  constructor(private http: HttpClient) { }

  getServicesList(servicesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${servicesPerPage}&page=${currentPage}`;
    return this.http.get<{message: string; services:any; count: number}>("http://localhost:3000/service/getServiceList"+ queryParams);
  }

  deactivateService(ServiceId: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>("http://localhost:3000/service/setServiceActiveStatus/"+ServiceId,httpOptions);
  }

  createService( ServiceName: string, PricePerHour: number ) {
    const serviceData: Services = { ServiceName: ServiceName, PricePerHour: PricePerHour, IsActive: true };
    this.http
      .post("http://localhost:3000/service/addNewService", serviceData)
      .subscribe(response => {
        console.log(response);
      });
  }
}
