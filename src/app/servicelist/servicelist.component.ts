import { Component, OnInit } from '@angular/core';
import { Services } from '../models/services.model';
import { ServicesListService } from './servicelist.service';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements OnInit {

  services : Services[] = [];
  dataSource = this.services;
  displayedColumns: string[] = ['ServiceID', 'ServiceName', 'Remove'];

  constructor(private dataservice: ServicesListService) { }

  ngOnInit(): void {

    this.dataservice.getServicesList()
      .subscribe(res => {

        this.dataSource= res;
        // console.log(this.user);
        console.log(this.dataSource);
      });



  }

}
