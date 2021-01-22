import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { registeredServices } from 'src/app/models/registeredServices.model';
import { Services } from 'src/app/models/services.model';
import { SpPortalService } from '../serviceprovider-portal.service';

@Component({
  selector: 'app-registered-services',
  templateUrl: './registered-services.component.html',
  styleUrls: ['./registered-services.component.css']
})
export class RegisteredServicesComponent implements OnInit {

  displayedColumns: string[] = ['ServiceName', 'PricePerHour', 'IsActive', 'Deactivate'];
  dataSource!: MatTableDataSource<any>;
  userid : any;
  services : registeredServices[] =[] ;

  constructor(private dataservice : SpPortalService) { }

  ngOnInit(): void {
    this.userid = sessionStorage.getItem("UserID");
    this.dataservice.getServiceList(this.userid)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res.result);
      console.log(res);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  unregister(id: any){
    this.dataservice.unregister(id).
        subscribe(res => {
          console.log(res);
          window.location.reload();
        });
  }
}
