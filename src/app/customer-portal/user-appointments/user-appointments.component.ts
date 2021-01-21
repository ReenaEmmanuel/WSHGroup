import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appointments } from 'src/app/models/appointment.model';
import { customerPortalService } from '../customer-portal.service';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit {

  displayedColumns: string[] = ['AppUserID', 'ServiceProviderID', 'AppointmentDate', 'Status', 'PaymentMode', 'TotalCost', 'IsPaid'];
  dataSource!: MatTableDataSource<Appointments>;
  appointment : Appointments[] = [];
  totalAppointments = 10;
  appointmentsPerPage = 5;
  currentPage = 1;
  UserId : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataservice: customerPortalService) { }

  ngOnInit(): void {
    this.UserId = sessionStorage.getItem("UserId");
    this.dataservice.getAppointmentList(this.appointmentsPerPage,this.currentPage,this.UserId)
    .subscribe(res​​​​​ => {
      console.log(res);
      this.appointment = res.appointments;
      this.totalAppointments = res.count;
      this.dataSource = new MatTableDataSource(this.appointment);
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

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex +1;
    this.appointmentsPerPage = pageData.pageSize;
    this.dataservice.getAppointmentList(this.appointmentsPerPage,this.currentPage,this.UserId)
    .subscribe(res​​​​​ => {
      this.appointment = res.appointments;
      this.totalAppointments = res.count;
      this.dataSource = new MatTableDataSource(this.appointment);
    });
  }
}
