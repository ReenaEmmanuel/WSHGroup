import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Appointments } from 'src/app/models/appointment.model';
import { customerPortalService } from '../customer-portal.service';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'ServiceName', 'ServiceProviderName', 'TotalCost', 'Status', 'Cancel',];
  dataSource!: MatTableDataSource<any>;
  appointment : Appointments[] = [];
  totalAppointments = 10;
  appointmentsPerPage = 5;
  currentPage = 1;
  UserId : any;

  constructor(private dataservice: customerPortalService) { }

  ngOnInit(): void {
    this.UserId = sessionStorage.getItem("UserID");
    this.dataservice.getUserAppointmentList(this.UserId)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res.Appointments[0].appointments);
      console.log(this.dataSource);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cancel(id: any){
    this.dataservice.cancelAppointment(id).
        subscribe(res => {
          console.log(res);
          window.location.reload();
        });
  }
}
