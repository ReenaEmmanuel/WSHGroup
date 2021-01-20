import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Services } from "../models/services.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn : "root" })

export class customerPortalService {

  url = environment.apiUrl + "serviceProvider/";

  constructor(private http: HttpClient) { }

  getServicesProviderListForEachService(id: number) {
    return this.http.get<{message: string; users:any}>( this.url + "/getServiceProviderListForEachService/"+ id);
  }
}
