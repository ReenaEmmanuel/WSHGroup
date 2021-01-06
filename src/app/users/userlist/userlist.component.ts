import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserListService } from '../userlist.service';
import { MatTableDataSource } from '@angular/material/table';
import {DataSource} from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})

export class UserlistComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'Email', 'Age', 'IsActive', 'Deactivate'];
  dataSource!: MatTableDataSource<User>;
  user : User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataservice: UserListService) {

   }

   ngAfterViewInit(){
    this.dataservice.getUsersList()
      .subscribe(res => {
        this.user= res;
        // console.log(this.user);
        console.log(this.user);
        this.dataSource = new MatTableDataSource(this.user);
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

  deactivate(id: string) {
        console.log(id);
        this.dataservice.deactivateUser(id).
        subscribe(res => {
          console.log(res);
          window.location.reload();
        });
      }

}
