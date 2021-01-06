import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import {DataSource} from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServicesListService } from '../servicelist.service';
import { Services } from '../../models/services.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id', 'ServiceName', 'PricePerHour', 'IsActive', 'Deactivate'];
  dataSource!: MatTableDataSource<Services>;
  service : Services[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataservice: ServicesListService, private router: Router) {

   }

   ngAfterViewInit(){
    this.dataservice.getServicesList()
      .subscribe(res => {
        this.service= res;
        // console.log(this.user);
        console.log(this.service);
        this.dataSource = new MatTableDataSource(this.service);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoaddnewservicepage() {
    this.router.navigate(["/addnewservice"]);
  }

  deactivate(id: string) {
        console.log(id);
        this.dataservice.deactivateService(id).
        subscribe(res => {
          console.log(res);
          window.location.reload();
        });
      }

}
