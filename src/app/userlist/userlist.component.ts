import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserListService } from './userlist.service';
import { MatTableDataSource } from '@angular/material/table';
import {DataSource} from '@angular/cdk/table';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {


  user : User[] = [];
  dataSource = this.user;
  displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'Email', 'Age', 'Remove'];

  constructor(private dataservice: UserListService) { }

  ngOnInit(): void {

    this.dataservice.getUsersList()
      .subscribe(res => {

        this.dataSource= res;
        // console.log(this.user);
        console.log(this.dataSource);
      });




  }



}
