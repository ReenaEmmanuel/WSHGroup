import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SpPortalService } from '../serviceprovider-portal.service';

@Component({
  selector: 'app-sp-appointment-list',
  templateUrl: './sp-appointment-list.component.html',
  styleUrls: ['./sp-appointment-list.component.css']
})
export class SpAppointmentListComponent implements OnInit {

  displayedColumns: string[] = ['Date','ServiceName', 'ClientName', 'Address', 'TotalCost', 'Status', 'Close'];
  userid: any;
  dataSource: MatTableDataSource<any>;

  constructor(private dataservice : SpPortalService) { }

  ngOnInit(): void {
    this.userid = sessionStorage.getItem("UserID");
    this.dataservice.getAppointmentList(this.userid)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res.Appointments);
      console.log(res);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  close(id: any){
    this.dataservice.closeAppointment(id).
        subscribe(res => {
          console.log(res);
          window.location.reload();
        });
  }
}
